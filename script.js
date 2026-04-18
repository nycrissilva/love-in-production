// script.js
// Pontos de edição rápidos:
// - validPasswords: senhas aceitas
// - romanticPhrases: frases românticas aleatórias
// - secretLetterText: texto da carta secreta
// - spotifyLink: URL da playlist
// - targetSundayHour: horário alvo do contador

const validPasswords = ['amor', 'carinho', 'oração', 'Deus', 'sorriso', 'saber te amar'];
const romanticPhrases = [
  'cada batida do meu coração lembra você.',
  'você é meu sorriso preferido em qualquer dia.',
  'quando penso em nós, sinto que tudo fica mais leve.',
  'o nosso amor é meu lugar seguro.',
  'com você, cada momento vira poesia.',
  'te amar é a melhor parte dos meus dias.',
  'ninguém se compara ao brilho que você traz.',
  'você é a resposta mais doce que eu poderia querer.',
  'você é meu pensamento feliz em dias difíceis.',
  'você é a minha resposta de oração mais sincera.',
];
const secretLetterText = `Meu Nando,

quando o domingo cair e as luzes apagarem, saiba que ainda estou aqui pensando no seu sorriso.
O nosso encontro vale cada segundo de espera. Você me faz querer escrever cartas mesmo sabendo que o beijo fala por mim.

vamos construir um milhão de domingos juntos, começando por este.

com todo carinho,
quem sempre sonha com você.`;
const spotifyLink = 'https://open.spotify.com/playlist/37i9dQZF1DX3PIPIT6lEg5';
const localStorageKey = 'loveLoginAccepted';
const localStorageCountKey = 'loveVisitCount';
const targetSundayHour = 21; // domingo às 21h para contador e carta

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
  visitCount.textContent = `essa é a ${visits}ª vez que você entra aqui`;
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
  if (hour >= 5 && hour < 12) {
    return 'Bom dia, meu amor. que a nossa manhã seja abençoada por Deus. Descanse depois desse madrugada de trabalho, viu? TE AMO';
  }
  if (hour >= 12 && hour < 18) {
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
  if (now >= nextSunday) {
    secretSection.classList.remove('hidden');
    secretHint.textContent = 'a carta pode ser aberta. clique no botão.';
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
