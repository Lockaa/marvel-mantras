const MARVEL_API_KEY = 'ce26b3bbf1d31409a66690dc30f25651cd37ad9e';
const MARVEL_API_HASH = '9f1125689ab84def1b3598021fd55e39';
const QUOTE_API_URL = 'https://api.quotable.io/random';

const characterContainer = document.getElementById('character-container');
const quoteContainer = document.getElementById('quote-container');
const generateButton = document.getElementById('generate-button');

// Fetch random Marvel character
async function fetchMarvelCharacter() {
    let test = (new Date()).getMilliseconds();
    let timestamp = Number(new Date());
    console.log(test, timestamp);
    const response = await fetch(`http://gateway.marvel.com/v1/public/comics?ts=${timestamp}&apikey=${MARVEL_API_KEY}&hash=${MARVEL_API_HASH}`);
    const data = await response.json();
    const character = data.data.results[Math.floor(Math.random() * data.data.results.length)];
    return character;
}
