const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const vm = require("node:vm");

const html = fs.readFileSync("index.html", "utf8");
const js = fs.readFileSync("script.js", "utf8");

test("a página carrega o CSS e o JavaScript do projeto", () => {
  assert.match(html, /href="style\.css"/);
  assert.match(html, /src="script\.js"/);
  assert.ok(fs.existsSync("style.css") && fs.existsSync("script.js"));
});

test("a página está em português e tem título", () => {
  assert.match(html, /<html lang="pt-BR"/);
  assert.match(html, /<title>[^<]*ALE Aprender[^<]*<\/title>/);
});

test("o script.js não tem erro de sintaxe", () => {
  assert.doesNotThrow(() => new vm.Script(js, { filename: "script.js" }));
});

test("todo botão da página chama uma função que existe no script.js", () => {
  const chamadas = [...html.matchAll(/on(?:click|submit|change)="\s*([A-Za-z_]\w*)\(/g)].map((m) => m[1]);
  const nativas = new Set(["alert", "event"]);
  const faltando = [...new Set(chamadas)].filter(
    (nome) => !nativas.has(nome) && !new RegExp(`function\\s+${nome}\\s*\\(`).test(js)
  );
  assert.deepStrictEqual(faltando, []);
});

test("os recursos de acessibilidade estão na página", () => {
  for (const funcao of ["toggleTheme", "toggleHighContrast", "changeFontSize", "toggleTextToSpeech"]) {
    assert.match(html, new RegExp(funcao), `faltou ${funcao}`);
  }
  assert.match(html, /vlibras-plugin\.js/);
});
