const MARVEL_API_KEY = 'fac6d7c1ee74188e67b2d1496798be03';
const MARVEL_PRIVATE_API_KEY = 'ce26b3bbf1d31409a66690dc30f25651cd37ad9e';
const MARVEL_API_HASH = '9f1125689ab84def1b3598021fd55e39';
const QUOTE_API_URL = 'https://api.quotable.io/random';

const characterContainer = document.getElementById('character-container');
const quoteContainer = document.getElementById('quote-container');
const generateButton = document.getElementById('generate-button');

// Fetch random Marvel character
async function fetchMarvelCharacter() {
    let test = new Date().getTime();
    console.log(test);
    // fetch with timestamp, key, and md5 key hash (timestamp|public key|private key)
    // const response = await fetch(`http://gateway.marvel.com/v1/public/comics?ts=${timestamp}&apikey=${MARVEL_API_KEY}&hash=${MARVEL_API_HASH}`);
    // fetch with key
    requestURL = `http://gateway.marvel.com/v1/public/comics?apikey=${MARVEL_API_KEY}`;
    const response = await fetch(requestURL);
    const data = await response.json();
    // generate a random index within the bounds of the array length
    const charIndex = Math.floor(Math.random() * data.data.results.length);
    // retrieve the character stored at that random index
    const character = data.data.results[charIndex];
    return character;
}

generateButton.addEventListener('click', fetchMarvelCharacter);
