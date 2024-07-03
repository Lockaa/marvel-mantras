const searchBtn = document.querySelector('#search-btn');
const charInput = document.querySelector('#char-input');

function outputSearch() {
  const charInput = document.querySelector('#char-input');
  const apiKey = 'b32943396b0e19ebdc4710f3fe2bfc10';

  const url = `https://gateway.marvel.com/v1/public/characters?apikey=${apiKey}`;

  $.get(url)
    .then(function(data) {
      console.log(data);


    })
}

outputSearch()

