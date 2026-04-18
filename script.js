// script.js
// Pontos de edição rápidos:
// - validPasswords: senhas aceitas
// - romanticPhrases: frases românticas aleatórias
// - secretLetterText: texto da carta secreta
// - spotifyLink: URL da playlist
// - targetSundayHour: horário alvo do contador

const validPasswords = ['amor','fernando','luis', 'luis fernando','nando', 'carinho', 'oração', 'Deus', 'sorriso', 'saber te amar'];
const romanticPhrases = [
  'cada batida do meu coração lembra você.',
  'você é meu sorriso preferido em qualquer dia.',
  'quando penso em nós, sinto que tudo fica mais leve.',
  'com você, cada momento vira poesia.',
  'te amar é a melhor parte dos meus dias.',
  'ninguém se compara ao brilho que você traz.',
  'você é a resposta mais doce que eu poderia querer.',
  'você é meu pensamento feliz em dias difíceis.',
  '“eu achei que ia me perder… mas encontrei você no caminho” — Eu e Esse Meu Coração',
  '“o para sempre é composto de agoras” — Quem é Você, Alasca?',
  '“alguns infinitos são maiores que outros” — A Culpa é das Estrelas',
  '“o amor é o único caminho que nos leva à felicidade” — O Amor é um Lugar',
  '“você é a melhor parte de mim” — The 1975',
  '“você é o meu lugar seguro” — O Amor é um Lugar',
  '“você é a minha resposta de oração mais sincera” — O Amor é um Lugar',
  '“eu te amo mais do que ontem, mas menos do que amanhã” — Rosemonde Gérard',
  '“você me deu uma eternidade dentro de dias contados” — A Culpa é das Estrelas',
  '“às vezes continuar já é coragem suficiente” — Eu e Esse Meu Coração',
  '“o mundo pode ser quebrado, mas ainda assim vale a pena sentir” — Cidades de Papel',
  'eu não tava procurando… mas você aconteceu, e agora não quero mais nada além de você.',
  'em algum lugar entre o acaso e a escolha… tem você',
  'caso você esqueça: eu tô pensando em você agora, e tô sorrindo.',
  'você é a minha definição de felicidade.',
  'caso você esqueça: eu tô pensando em você agora',
  'no meio de tudo, eu ainda penso em você',
  'é estranho o quanto você virou parte do meu dia a dia, do meu pensamento, do meu coração.',
  'você é a minha pessoa favorita pra tudo.',
  'mesmo sem você aqui, você tá',
  'eu sempre vou voltar pra você',
  'saiba que a mesma saudades que você sente de mim, eu sinto de você',
  'eu simplesmente te amo, e isso é tudo que eu sei dizer sobre isso.',
  'você é a minha melhor parte, mesmo quando a gente tá longe.',

];
const secretLetterText = `Meu Bem,
eu queria te deixar algo mais profundo do que só uma frase solta…
algo que você pudesse ler com calma, sentir, e talvez até voltar aqui outras vezes.

às vezes eu paro e penso no quanto esse momento da minha vida tem sido diferente…
Deus tem me moldado de um jeito que eu nunca imaginei, tem mexido em partes minhas que eu nem sabia que precisavam ser cuidadas.
e, no meio de tudo isso, você apareceu.

e eu sei que isso não é por acaso.

é estranho e bonito ao mesmo tempo perceber como você entrou nesse processo,
porque não foi só um “gostar” normal…
eu sinto propósito nisso.

eu tenho orado muito…
por mim, pelo meu futuro, pelas coisas que eu quero viver…
e por nós.

colocar um “nós” nas minhas orações já não parece estranho,
parece certo.

eu não sei todos os detalhes do que Deus está preparando,
mas eu sei que sinto paz quando penso em você —
mesmo em meio à distância,
mesmo com a ansiedade de tudo.

e isso, pra mim, é o suficiente.

o seu cuidado, o seu jeito, o apoio que você me dá,
mesmo nas coisas simples, mesmo sem perceber, você me alcança.

tudo isso tem um peso que talvez você nem imagine,
mas pra mim faz diferença todos os dias.

e eu penso em como vai ser quando a gente estiver junto de verdade…
não só conversando, mas vivendo momentos, orando juntos, dividindo a vida.

porque eu quero segurar sua mão
e falar com Deus ao seu lado.

eu quero construir algo que não seja só sentimento,
mas também fé.
algo firme, leve e verdadeiro.

eu não tenho todas as respostas,
mas eu tenho certeza do que eu sinto
e do que eu quero viver com você.

 eu gosto de saber que, de alguma forma, a gente tá se encontrando no meio do processo
não prontos, não perfeitos, mas dispostos.  

eu já estou prestes a sair desse retiro.
e eu não consigo prever o futuro,
mas eu confio no que Deus está fazendo em mim — e em nós.

eu sei que Ele vai me transformar nesses dias, pra melhor.
e eu escolho me preparar pra ser uma mulher sábia,
pra dividir a vida com você.

eu quero que Deus nos molde todos os dias,
pra sermos exatamente aquilo que Ele sonhou pra gente.

e eu acredito que a gente pode viver esse propósito juntos,
vivendo a boa, perfeita e agradável vontade dEle.

se tudo isso começou de um jeito simples,
eu sei que pode se tornar algo muito maior.

enfim…
isso aqui é só um pedacinho do que eu carrego,
e que agora de alguma forma também envolve você.


com todo carinho,
quem sempre sonha com você.`;
const spotifyLink = 'https://open.spotify.com/playlist/37i9dQZF1DX3PIPIT6lEg5';
const localStorageKey = 'loveLoginAccepted';
const localStorageCountKey = 'loveVisitCount';
const targetSundayHour = 21; // domingo às 21h para contador
const secretReleaseOffsetMinutes = 60; // carta libera 1 hora antes do horário final
const previewMode = new URLSearchParams(window.location.search).get('preview') === 'yes'; // use ?preview=yes para ver a carta agora

const loginPanel = document.getElementById('loginPanel');
const contentPanel = document.getElementById('contentPanel');
const loginButton = document.getElementById('loginButton');
const passwordInput = document.getElementById('passwordInput');
const loginMessage = document.getElementById('loginMessage');
const timeGreeting = document.getElementById('timeGreeting');
const randomPhrase = document.getElementById('randomPhrase');
const visitCount = document.getElementById('visitCount');
const countdownText = document.getElementById('countdownText');
const secretHint = document.getElementById('secretHint');
const openLetterButton = document.getElementById('openLetterButton');
const letterContent = document.getElementById('letterContent');
const spotifyButton = document.getElementById('spotifyButton');
const logoutButton = document.getElementById('logoutButton');
const secretSection = document.getElementById('secretSection');

function normalize(value) {
  return value.trim().toLowerCase();
}

function isValidPassword(input) {
  const normalized = normalize(input);
  return validPasswords.some((password) => normalize(password) === normalized);
}

function updateVisitCount() {
  let visits = Number(localStorage.getItem(localStorageCountKey) || '0');
  visits += 1;
  localStorage.setItem(localStorageCountKey, String(visits));
  visitCount.textContent = `essa é a ${visits}ª vez que você entra aqui - espero que cada vez seja tão especial quanto a primeira.`;
}

function showMainContent(message = 'olha quem voltou…') {
  loginPanel.classList.add('hidden');
  contentPanel.classList.remove('hidden');
  loginMessage.textContent = '';
  updateVisitCount();
}

function openSecretLetter() {
  letterContent.textContent = secretLetterText;
  letterContent.classList.remove('hidden');
  openLetterButton.classList.add('hidden');
  secretHint.textContent = 'a carta foi aberta… ❤️';
}

function getTimeGreeting() {
  const now = new Date();
  const hour = now.getHours();
  if (hour >= 5 && hour <= 12) {
    return 'Bom dia, meu amor. que a nossa manhã seja abençoada por Deus. Descanse depois desse madrugada de trabalho, viu? TE AMO';
  }
  if (hour > 12 && hour < 18) {
    return 'Oie meu bem. estou orando por você daqui contando os segundos para ouvir sua voz.';
  }
  return 'Boa noite, meu lindo. bom trabalho hoje (sábado), que Deus te abençoe e te proteja. vou sonhar com você. te amo. - se já for domingo saiba que estou quase saindo, só mais um pouco para nos falarmos de novo. te amo muito, meu futuro marido.';
}

function pickRandomPhrase() {
  const index = Math.floor(Math.random() * romanticPhrases.length);
  return romanticPhrases[index];
}

function nextSundayAt(hour) {
  const now = new Date();
  const target = new Date(now);
  const diff = (7 + 0 - now.getDay()) % 7;
  target.setDate(now.getDate() + diff);
  target.setHours(hour, 0, 0, 0);
  if (target <= now) {
    target.setDate(target.getDate() + 7);
  }
  return target;
}

function formatCountdown(durationMs) {
  const totalSeconds = Math.floor(durationMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `faltam ${hours} horas, ${minutes} minutos e ${seconds} segundos pra gente se falar de novo`;
}

function updateCountdown() {
  const target = nextSundayAt(targetSundayHour);
  const now = new Date();
  const remaining = target - now;
  if (remaining <= 0) {
    countdownText.textContent = 'já é hora de se falar de novo, amor.';
    return;
  }
  countdownText.textContent = formatCountdown(remaining);
}

function updateSecretSection() {
  const now = new Date();
  const nextSunday = nextSundayAt(targetSundayHour);
  const remaining = nextSunday - now;
  const releaseThreshold = secretReleaseOffsetMinutes * 60 * 1000;

  if (previewMode || remaining <= 0 || remaining <= releaseThreshold) {
    secretSection.classList.remove('hidden');
    secretHint.textContent = previewMode
      ? 'modo preview ativado: carta liberada antes do horário para você conferir.'
      : remaining <= 0
        ? 'a carta pode ser aberta. clique no botão.'
        : `a carta foi liberada! ainda faltam ${Math.ceil(remaining / 60000)} minutos para a contagem acabar.`;
    openLetterButton.classList.remove('hidden');
  } else {
    secretSection.classList.add('hidden');
    openLetterButton.classList.add('hidden');
    letterContent.classList.add('hidden');
  }
}

function initPage() {
  timeGreeting.textContent = getTimeGreeting();
  randomPhrase.textContent = pickRandomPhrase();
  spotifyButton.href = spotifyLink;

  const accepted = localStorage.getItem(localStorageKey) === 'true';
  if (accepted) {
    showMainContent();
  }

  updateCountdown();
  updateSecretSection();
  setInterval(() => {
    updateCountdown();
    updateSecretSection();
  }, 1000);
}

function handleLoginAttempt(inputValue, messageElement) {
  const value = inputValue.trim();
  if (!value) {
    messageElement.textContent = 'digita algo com carinho 💌';
    return;
  }
  if (isValidPassword(value)) {
    localStorage.setItem(localStorageKey, 'true');
    showMainContent('entrou com chave de amor ♥');
  } else {
    messageElement.textContent = 'Você não é meu futuro marido SAIIII';
  }
}

loginButton.addEventListener('click', () => {
  handleLoginAttempt(passwordInput.value, loginMessage);
});

passwordInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    loginButton.click();
  }
});

openLetterButton.addEventListener('click', openSecretLetter);

logoutButton.addEventListener('click', () => {
  localStorage.removeItem(localStorageKey);
  contentPanel.classList.add('hidden');
  loginPanel.classList.remove('hidden');
  loginMessage.textContent = '';
  passwordInput.value = '';
});

initPage();
