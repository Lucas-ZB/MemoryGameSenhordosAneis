// Seleciona o elemento de input do formulário com a classe 'login__input'
const input = document.querySelector('.login__input');

// Seleciona o botão do formulário com a classe 'login__button'
const button = document.querySelector('.login__button');

// Seleciona o formulário com a classe 'login-form'
const form = document.querySelector('.login-form');

// Cria um elemento de áudio e configura para reprodução automática e em loop
const audio = document.createElement('audio');
audio.autoplay = true;
audio.loop = true;

// Cria um elemento de origem para o arquivo de áudio 'Lord of the Rings Sound of The Shire.mp3'
const source = document.createElement('source');
source.src = 'musica/Lord of the Rings Sound of The Shire.mp3'; 
source.type = 'audio/mp3';

// Adiciona a origem ao elemento de áudio
audio.appendChild(source);

// Adiciona o elemento de áudio ao corpo do documento HTML
document.body.appendChild(audio);

// Função para validar a entrada de texto no campo de input
const validateInput = ({ target }) => {
  // Verifica se o comprimento do texto no campo de input é maior que 3
  if (target.value.length > 3) {
    // Remove o atributo 'disabled' do botão
    button.removeAttribute('disabled');
    return;
  }

  // Adiciona o atributo 'disabled' ao botão
  button.setAttribute('disabled', '');
}

// Função para lidar com o envio do formulário
const handleSubmit = (event) => {
  // Impede o comportamento padrão de envio do formulário
  event.preventDefault();

  // Armazena o nome do jogador no armazenamento local
  localStorage.setItem('player', input.value);

  // Redireciona para a página 'game.html'
  window.location = 'pages/game.html';
}

// Adiciona um ouvinte de evento para a entrada de texto no campo de input
input.addEventListener('input', validateInput);

// Adiciona um ouvinte de evento para o envio do formulário
form.addEventListener('submit', handleSubmit);
