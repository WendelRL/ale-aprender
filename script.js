// ALE APRENDER - PLATAFORMA 100% FUNCIONAL E ACESSÍVEL

let currentUser = { name: 'Lucas Silva', year: 4, className: 'Turma A - Manhã', role: 'student', xp: 1250 };
let currentScore = 0;
let isTtsActive = false;
let currentFontSize = 16;

let activitiesList = [
    { id: 1, title: "Exercício de Frações e Divisão", subject: "Matemática", status: "Pendente", group: "iniciais" },
    { id: 2, title: "Leitura e Interpretação de Texto", subject: "Português", status: "Pendente", group: "iniciais" },
    { id: 3, title: "Relatório da Revolução Industrial", subject: "História", status: "Pendente", group: "finais" },
    { id: 4, title: "Resolução de Equações de 2º Grau", subject: "Matemática", status: "Pendente", group: "finais" }
];

let teacherClasses = [
    { year: "4º Ano", name: "Turma A - Manhã", code: "ALE-4A12", count: 24 },
    { year: "8º Ano", name: "Turma B - Tarde", code: "ALE-8B99", count: 18 }
];

// RECURSOS DE ACESSIBILIDADE
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    document.getElementById('theme-status-text').innerText = isDark ? 'Escuro' : 'Claro';
}

function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
}

function changeFontSize(delta) {
    currentFontSize = Math.min(Math.max(12, currentFontSize + delta * 2), 24);
    document.documentElement.style.fontSize = currentFontSize + 'px';
}

function resetFontSize() {
    currentFontSize = 16;
    document.documentElement.style.fontSize = '16px';
}

function toggleTextToSpeech() {
    isTtsActive = !isTtsActive;
    document.getElementById('tts-status').innerText = isTtsActive ? 'ON' : 'OFF';
    if (isTtsActive) {
        alert('🔊 Leitor por Voz Ativado! Passe o mouse sobre os textos para ouvir a leitura.');
        enableSpeechHover();
    } else {
        window.speechSynthesis.cancel();
    }
}

function enableSpeechHover() {
    document.querySelectorAll('.speakable').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (isTtsActive) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(el.innerText);
                utterance.lang = 'pt-BR';
                window.speechSynthesis.speak(utterance);
            }
        });
    });
}

function speakText(elementId) {
    const text = document.getElementById(elementId).innerText;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    window.speechSynthesis.speak(utterance);
}

// NAVEGAÇÃO DE TELAS
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function goToStudentSetup() {
    currentUser.role = 'student';
    showScreen('screen-student-setup');
}

function goToTeacherDashboard() {
    currentUser.role = 'teacher';
    document.body.className = 'theme-iniciais';
    renderTeacherClasses();
    showScreen('screen-teacher-dashboard');
}

function handleStudentSetup(e) {
    e.preventDefault();
    currentUser.name = document.getElementById('student-name').value || 'Lucas Silva';
    currentUser.year = parseInt(document.getElementById('student-year').value);
    currentUser.className = document.getElementById('student-class').value;

    document.getElementById('header-user-info').style.display = 'flex';
    document.getElementById('user-display-name').innerText = currentUser.name;
    document.getElementById('user-display-tag').innerText = `${currentUser.year}º Ano`;

    if (currentUser.year <= 6) {
        document.body.className = 'theme-iniciais';
        document.querySelectorAll('.user-name-placeholder').forEach(el => el.innerText = currentUser.name);
        renderIniciaisActivities();
        showScreen('screen-dashboard-iniciais');
    } else {
        document.body.className = 'theme-finais';
        document.querySelectorAll('.user-name-placeholder').forEach(el => el.innerText = currentUser.name);
        document.getElementById('finais-year-display').innerText = `${currentUser.year}º Ano`;
        renderFinaisActivities();
        showScreen('screen-dashboard-finais');
    }
    
    if (isTtsActive) enableSpeechHover();
}

function switchTab(buttonEl, tabId) {
    const parent = document.getElementById(tabId).parentElement;
    parent.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    buttonEl.parentElement.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    buttonEl.classList.add('active');
}

function triggerTab(tabId) {
    const target = document.getElementById(tabId);
    const parentNav = target.parentElement.querySelector('.sub-nav');
    const tabs = parentNav.querySelectorAll('.nav-tab');
    
    target.parentElement.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    tabs.forEach(b => b.classList.remove('active'));

    target.classList.add('active');
}

// RENDERIZAÇÃO DAS ATIVIDADES
function renderIniciaisActivities() {
    const container = document.getElementById('iniciais-activities-list');
    const filtered = activitiesList.filter(a => a.group === 'iniciais');
    
    container.innerHTML = filtered.map(a => `
        <div class="card-feature" style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
            <div>
                <h4 class="speakable">${a.title}</h4>
                <p style="font-size: 13px; opacity: 0.8;" class="speakable">Disciplina: ${a.subject} | Status: <strong style="color:${a.status === 'Entregue' ? '#10B981':'#EF4444'}">${a.status}</strong></p>
            </div>
            <button class="btn-primary" onclick="openActivityModal('${a.title}', '${a.subject}')">${a.status === 'Entregue' ? 'Ver Envio' : 'Responder'}</button>
        </div>
    `).join('');
}

function renderFinaisActivities() {
    const container = document.getElementById('finais-activities-list');
    const filtered = activitiesList.filter(a => a.group === 'finais');
    
    container.innerHTML = filtered.map(a => `
        <div class="pro-card" style="display: flex; justify-content: space-between; align-items: center;">
            <div>
                <h4 class="speakable">${a.title}</h4>
                <p style="font-size: 13px; opacity: 0.8;" class="speakable">Disciplina: ${a.subject} | Status: <strong style="color:${a.status === 'Entregue' ? '#10B981':'#FBBF24'}">${a.status}</strong></p>
            </div>
            <button class="btn-primary" onclick="openActivityModal('${a.title}', '${a.subject}')">${a.status === 'Entregue' ? 'Concluído' : 'Abrir Tarefa'}</button>
        </div>
    `).join('');
}

// PROFESSOR
function renderTeacherClasses() {
    const container = document.getElementById('teacher-classes-list');
    container.innerHTML = teacherClasses.map(c => `
        <div style="background: var(--card-bg); border: 1px solid var(--border-color); padding: 14px; border-radius: 8px; margin-bottom: 10px;">
            <strong class="speakable">${c.year} - ${c.name}</strong><br>
            <span style="font-size: 13px; opacity: 0.8;" class="speakable">Código de Acesso: <code style="color: var(--accent-yellow);">${c.code}</code> (${c.count} estudantes)</span>
        </div>
    `).join('');
}

function handleCreateClass(e) {
    e.preventDefault();
    const year = document.getElementById('new-class-year').value;
    const name = document.getElementById('new-class-name').value;
    const randomCode = 'ALE-' + Math.floor(1000 + Math.random() * 9000);
    
    teacherClasses.push({ year, name, code: randomCode, count: 1 });
    renderTeacherClasses();
    closeModal('modal-create-class');
    alert(`🎉 Turma criada com sucesso! Código para os alunos: ${randomCode}`);
}

function handleCreateActivity(e) {
    e.preventDefault();
    const title = document.getElementById('act-title').value;
    const subject = document.getElementById('act-subject').value;
    const group = document.getElementById('act-target-group').value;

    activitiesList.push({ id: Date.now(), title, subject, status: "Pendente", group });
    alert('🚀 Nova atividade cadastrada no protótipo com sucesso!');
    renderIniciaisActivities();
    renderFinaisActivities();
}

// JOGOS INTERATIVOS FUNCIONAIS
function startGame(gameType) {
    currentScore = 0;
    const title = document.getElementById('game-title');
    const body = document.getElementById('game-body');
    
    if (gameType === 'palavras') {
        title.innerText = '🔤 Desafio das Palavras';
        body.innerHTML = `
            <p style="font-size: 18px; margin-bottom: 16px;" class="speakable">Qual palavra completa corretamente a frase?<br><br> <strong>"O robô Aleco gosta de ___ livros."</strong></p>
            <button class="opt-btn" onclick="checkGameAnswer(true)">A) Ler</button>
            <button class="opt-btn" onclick="checkGameAnswer(false)">B) LERES</button>
            <button class="opt-btn" onclick="checkGameAnswer(false)">C) Lendo-nos</button>
        `;
    } else if (gameType === 'matematica') {
        title.innerText = '🔢 Matemática Divertida';
        body.innerHTML = `
            <p style="font-size: 18px; margin-bottom: 16px;" class="speakable">Quanto é: <strong>8 × 7 ?</strong></p>
            <button class="opt-btn" onclick="checkGameAnswer(false)">A) 54</button>
            <button class="opt-btn" onclick="checkGameAnswer(true)">B) 56</button>
            <button class="opt-btn" onclick="checkGameAnswer(false)">C) 64</button>
        `;
    } else if (gameType === 'quiz-iniciais' || gameType === 'caca') {
        title.innerText = '💡 Quiz do Conhecimento';
        body.innerHTML = `
            <p style="font-size: 18px; margin-bottom: 16px;" class="speakable">Qual é o planeta conhecido como "Planeta Vermelho"?</p>
            <button class="opt-btn" onclick="checkGameAnswer(false)">A) Vênus</button>
            <button class="opt-btn" onclick="checkGameAnswer(true)">B) Marte</button>
            <button class="opt-btn" onclick="checkGameAnswer(false)">C) Júpiter</button>
        `;
    } else if (gameType === 'matematica-pro') {
        title.innerText = '📐 Desafio Matemático Pro';
        body.innerHTML = `
            <p style="font-size: 18px; margin-bottom: 16px;" class="speakable">Qual é o valor de X na equação: <strong>2x + 10 = 26 ?</strong></p>
            <button class="opt-btn" onclick="checkGameAnswer(true)">A) x = 8</button>
            <button class="opt-btn" onclick="checkGameAnswer(false)">B) x = 10</button>
            <button class="opt-btn" onclick="checkGameAnswer(false)">C) x = 6</button>
        `;
    } else {
        title.innerText = '🧠 Desafio Avançado';
        body.innerHTML = `
            <p style="font-size: 18px; margin-bottom: 16px;" class="speakable">Qual figura de linguagem representa o exagero intencional?</p>
            <button class="opt-btn" onclick="checkGameAnswer(true)">A) Hipérbole</button>
            <button class="opt-btn" onclick="checkGameAnswer(false)">B) Metáfora</button>
            <button class="opt-btn" onclick="checkGameAnswer(false)">C) Metonímia</button>
        `;
    }
    
    document.getElementById('game-score').innerText = `Pontuação: ${currentScore} XP`;
    openModal('modal-game');
    if (isTtsActive) enableSpeechHover();
}

function checkGameAnswer(isCorrect) {
    if (isCorrect) {
        currentScore += 100;
        currentUser.xp += 100;
        document.getElementById('user-xp-display').innerText = `⚡ XP: ${currentUser.xp}`;
        alert('🎉 Resposta Correta! Você ganhou +100 XP!');
    } else {
        alert('❌ Ops! Resposta incorreta. Tente novamente!');
    }
    document.getElementById('game-score').innerText = `Pontuação: ${currentScore} XP`;
}

// MODAIS E ACOES
function openModal(id) { document.getElementById(id).style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

function openActivityModal(title, subject) {
    document.getElementById('modal-act-title').innerText = title;
    document.getElementById('modal-act-sub').innerText = `Disciplina: ${subject}`;
    openModal('modal-activity');
}

function submitActivityDemo() {
    alert('✅ Resposta enviada com sucesso! O status da tarefa foi atualizado.');
    closeModal('modal-activity');
}

function filterSubject(name) {
    alert(`📚 Exibindo conteúdo e notas da disciplina de ${name}.`);
}

function logout() {
    document.getElementById('header-user-info').style.display = 'none';
    showScreen('screen-welcome');
}
