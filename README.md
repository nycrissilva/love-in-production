# Para o Nando ❤️

Um site estático romântico personalizado, feito com HTML5, CSS3 e JavaScript puro.

## 🎯 Como Usar

1. Abra o arquivo `index.html` em um navegador
2. Digite uma das senhas válidas no campo de login
3. Explore as funcionalidades do site

## 🔐 Senhas Válidas

- `amor`
- `carinho`
- `oração`
- `Deus`, 
- `sorriso`
- `saber te amar` 


A validação ignora maiúsculas e minúsculas.

## ✨ Funcionalidades

- **Login Simbólico**: Tela inicial protegida por senha
- **Frases Aleatórias**: Mensagens românticas diferentes a cada acesso
- **Mensagens por Horário**: Saudações adaptadas (manhã, tarde, noite)
- **Contador Regressivo**: Tempo até domingo às 18h
- **Carta Secreta**: Liberada apenas após o horário configurado
- **Link Spotify**: Botão para acessar uma playlist
- **Contador de Visitas**: Rastreia quantas vezes você entrou
- **Responsivo**: Funciona em desktop e mobile

## 📝 Onde Editar

### `script.js`
- **Senhas válidas**: Array `validPasswords` (linha 9)
- **Frases românticas**: Array `romanticPhrases` (linha 10)
- **Texto da carta**: Variável `secretLetterText` (linha 22)
- **Link do Spotify**: Variável `spotifyLink` (linha 31)
- **Horário do contador**: `targetSundayHour` (linha 34)

### `style.css`
- **Cores**: Variáveis CSS no `:root` (linhas 9-16)
- **Fontes**: Google Fonts importadas no `index.html`
- **Layout**: Classes e media queries responsivas

### `index.html`
- **Textos fixos**: Títulos, subtítulos e labels
- **Estrutura**: Seções de login e conteúdo principal




## 💾 LocalStorage

O site usa `localStorage` para:
- Lembrar se você já fez login
- Contar o número de visitas

Os dados ficam armazenados no navegador e podem ser limpos pelo histórico.

## 📱 Compatibilidade

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

Sem necessidade de backend ou servidor.

---

Feito com amor e JavaScript puro.
