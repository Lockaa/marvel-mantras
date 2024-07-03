const $searchBtn = $('#search-btn');
const $charSelect = $('#char-select');

function getCharacters() {
  const $charSelect = document.querySelector('#char-select');
  const apiKey = 'b32943396b0e19ebdc4710f3fe2bfc10';

  const url = `https://gateway.marvel.com/v1/public/characters?apikey=${apiKey}`;

  $.get(url)
    .then(function(data) {
      console.log(data);


    })
}

getCharacters()

