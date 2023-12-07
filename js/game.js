// elementos DOM 
const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const main = document.querySelector('main');
const backgroundImagePath = '../images/wallpaperflare.com_wallpaper (2).jpg';
let score = 0;
const scoreElement = document.querySelector('.score');

// Personagens e caminhos das imagens
const character = [
  { name: 'The Lord of the Rings Tree', imagePath: '../images/The Lord of the Rings Tree.jpg' },
  { name: 'lord-of-the-rings-icon-16', imagePath: '../images/lord-of-the-rings-icon-16.jpg' },
  { name: 'Lord Of The Rings Stickers for Sale (1)', imagePath: '../images/Lord Of The Rings Stickers for Sale (1).jpg' },
  { name: 'Lord Of The Ring Stickers for Sale', imagePath: '../images/Lord Of The Ring Stickers for Sale.jpg' },
  { name: '3xhumed-Mega-Games-Pack-28-The-Lord-of-the-Rings-The-Battle-for-Middle-Earth-II-addon-1.256', imagePath: '../images/3xhumed-Mega-Games-Pack-28-The-Lord-of-the-Rings-The-Battle-for-Middle-Earth-II-addon-1.256.jpg' },
  { name: 'Tolkien Stickers for Sale', imagePath: '../images/Tolkien Stickers for Sale.jpg' },
  { name: 'THE-DARK-LORD-OF-MIDDLE-EARTH-1', imagePath: '../images/THE-DARK-LORD-OF-MIDDLE-EARTH-1.jpg' },
  { name: 'Wizard Portrait 2 Sticker _ Wizard', imagePath: '../images/Wizard Portrait 2 Sticker _ Wizard.jpg' },
  { name: 'Lord Of The Rings Stickers for Sale', imagePath: '../images/Lord Of The Rings Stickers for Sale.jpg' },
  { name: '2625498_gandalf_lord', imagePath: '../images/2625498_gandalf_lord.jpg' },
]; 

const findCharacterImagePath = (name) => {
  const foundCharacter = character.find(char => char.name === name);

  if (foundCharacter) {
    const element = document.createElement('img');
    element.src = foundCharacter.imagePath;
    return element;
  } else {
    return null;
  }
};

// Define o plano de fundo
const setMainBackground = () => {
  main.style.backgroundImage = `url('${backgroundImagePath}')`;
  main.style.backgroundSize = 'cover';
  main.style.minHeight = '100vh';
  main.style.display = 'flex';
  main.style.alignItems = 'center';
  main.style.justifyContent = 'center';
  main.style.padding = '20px 20px 50px';
};
// Array nomes dos personagens
const characters = [
  'The Lord of the Rings Tree',
  'lord-of-the-rings-icon-16',
  'Lord Of The Rings Stickers for Sale (1)',
  'Lord Of The Ring Stickers for Sale',
  '3xhumed-Mega-Games-Pack-28-The-Lord-of-the-Rings-The-Battle-for-Middle-Earth-II-addon-1.256',
  'Tolkien Stickers for Sale',
  'THE-DARK-LORD-OF-MIDDLE-EARTH-1',
  'Wizard Portrait 2 Sticker _ Wizard',
  'Lord Of The Rings Stickers for Sale',
  '2625498_gandalf_lord of the rings_old man_wizard_icon',
];

// Dicionarios das imagens com caminhos
const imagePaths = {
  'ring.jpg': '../images/ring.jpg',
  'Lord Of The Rings Stickers for Sale (1)': '../images/Lord Of The Rings Stickers for Sale (1).jpg',
  'Tolkien Stickers for Sale': '../images/Tolkien Stickers for Sale.jpg',
  'The Lord of the Rings Tree': '../images/The Lord of the Rings Tree.jpg',
  'lord-of-the-rings-icon-16': '../images/lord-of-the-rings-icon-16.jpg',
  '3xhumed-Mega-Games-Pack-28-The-Lord-of-the-Rings-The-Battle-for-Middle-Earth-II-addon-1.256': '../images/3xhumed-Mega-Games-Pack-28-The-Lord-of-the-Rings-The-Battle-for-Middle-Earth-II-addon-1.256.jpg',
  'THE-DARK-LORD-OF-MIDDLE-EARTH-1': '../images/THE-DARK-LORD-OF-MIDDLE-EARTH-1.jpg',
  'Wizard Portrait 2 Sticker _ Wizard': '../images/Wizard Portrait 2 Sticker _ Wizard.jpg',
  '2625498_gandalf_lord': '../images/2625498_gandalf_lord.jpg',
  'Lord Of The Ring Stickers for Sale': '../images/Lord Of The Ring Stickers for Sale.jpg',

};

// HTML elementos
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

// Variaveis para armazenar as cartas abertas
let firstCard = null;
let secondCard = null;

// Verifica fim do jogo
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    const finalScore = calculateScore(+timer.innerHTML);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Sua Pontuação: ${finalScore}`);
  }
};

// Calcula a pontuação baseado no tempo
const calculateScore = (currentTime) => {
  const incrementFactor = 0.1;
  const finalScore = Math.floor(currentTime * incrementFactor);
  return finalScore;
};

//Função para criar cartas

const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.png')`;
  back.style.backgroundImage = `url('../images/ring.jpg')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}


// Verifica se a carta é igual
const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {
    firstCard.classList.add('disabled-card');
    secondCard.classList.add('disabled-card');

    firstCard = null;
    secondCard = null;

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = null;
      secondCard = null;
    }, 500);
  }
};

// Funcão para revelar a carta
const revealCard = (event) => {
  const target = event.currentTarget;

  if (target.classList.contains('reveal-card')) {
    return;
  }

  if (firstCard === null) {
    target.classList.add('reveal-card');
    firstCard = target;
  } else if (secondCard === null) {
    target.classList.add('reveal-card');
    secondCard = target;

    checkCards();
  }
};

// Inicia o jogo e carrega as cartas
const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
};

// Inicia o contador de tempo
const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;

    // Atualiza a pontuação em tempo real
    score = calculateScore(currentTime);
    scoreElement.innerHTML = score;
  }, 1000);
};



// Evento para carregar o jogo quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
  setMainBackground();
});
