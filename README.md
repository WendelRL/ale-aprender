# ALE Aprender

Organizador de entregas acadêmicas acessível, feito na atividade prática de Scrum - Gestão Ágil (4 sprints).

**Site:** https://wendelrl.github.io/ale-aprender/

## O problema

As informações sobre trabalhos, provas e entregas ficam espalhadas em mensagens, avisos em sala e plataformas diferentes. O resultado são esquecimentos, atrasos e dúvidas. O ALE reúne as atividades em um só lugar para o aluno saber o que entregar primeiro.

## Funcionalidades

- **Anos iniciais (1º ao 6º ano):** layout lúdico, com jogos educativos, atividades da turma, leitura com narração e estrelas.
- **Anos finais (7º ao 9º ano):** layout objetivo, com próximas entregas e provas, XP, média e disciplinas.
- **Professor:** cria turmas com código de acesso e cadastra atividades, provas e jogos.
- **Acessibilidade:** tema claro e escuro, alto contraste, tamanho do texto (A+, A−, A), leitor de voz e VLibras.

## Tecnologias

HTML, CSS e JavaScript, sem servidor nem banco de dados. Leitor de voz com a Web Speech API do navegador, tradução para Libras com o VLibras e publicação pelo GitHub Pages.

## Estrutura

| Arquivo | Para que serve |
| --- | --- |
| `index.html` | As telas do site |
| `style.css` | Cores, temas e layouts |
| `script.js` | Navegação, cadastros, jogos e acessibilidade |
| `site.test.js` | 5 testes automáticos |
| `.github/workflows/ci-cd.yml` | A esteira: test → build → deploy |
| `docs/Documentacao_ALE_Scrum.pdf` | Documentação completa do projeto |

## Como testar

Com o Node 20 ou mais novo: `npm test`.

A cada push na `main`, o GitHub Actions roda os testes e publica o site. Em um pull request, só os testes rodam.

## Time Scrum

- **Product Owner:** Henrique Novais de Oliveira
- **Scrum Master:** Mateus Alves dos Santos
- **Developers:** Wendel Andrioli de Melo, Luiz Felipe, Nathan Vieira, Washington de Souza Silva, Mateus Moreira, Diego Pignatari e Kauã Justino da Silva
- **Stakeholder:** o professor
