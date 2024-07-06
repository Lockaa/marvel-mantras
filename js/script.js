
const searchBtn = document.querySelector('#search-btn');
const charInput = document.querySelector('#char-input');

function outputSearch() {
  const charInput = document.querySelector('#char-input');
  const apiKey = 'b32943396b0e19ebdc4710f3fe2bfc10';
  const quotesapiKey = '4777e1cf53msh57faac29ab5b6c9p179fa4jsn8940b5e2cc2c'
  const charactersUrl = `https://gateway.marvel.com/v1/public/characters?apikey=${apiKey}`;
  const quotesUrl = `https://marvel-quote-api.p.rapidapi.com/`


  $.get(charactersUrl)
    .then(function (charactersData) {
      console.log('Characters Date:', charactersData);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
// fetch(quotesUrl)
//   .then(function (quotes))




outputSearch();
