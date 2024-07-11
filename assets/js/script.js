const publicKey = 'b32943396b0e19ebdc4710f3fe2bfc10';
const privateKey = 'ac3a1cce8976b74359bd98d8f98ed70b507f1fe4';
const baseUrl = 'https://gateway.marvel.com/v1/public/characters';
const quoteUrl = 'https://api.api-ninjas.com/v1/quotes?category=movies';
const ts = new Date().getTime();
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

// Function to get the total number of characters
async function getTotalCharacters() {
  const response = await fetch(`${baseUrl}?apikey=${publicKey}&ts=${ts}&hash=${hash}&limit=1`);
  const data = await response.json();
  return data.data.total;
}

// Function to fetch a character by index
async function fetchCharacterByIndex(index) {
  const url = `${baseUrl}?apikey=${publicKey}&ts=${ts}&hash=${hash}&limit=1&offset=${index}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.data.results[0];
}

// Function to fetch a random character
async function fetchRandom() {
  const totalCharacters = await getTotalCharacters();
  const randomIndex = Math.floor(Math.random() * totalCharacters);
  return await fetchCharacterByIndex(randomIndex);
}

// Function to fetch a character by name
async function fetchCharacterByName(name) {
  const url = `${baseUrl}?apikey=${publicKey}&ts=${ts}&hash=${hash}&nameStartsWith=${name}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.data.results.length > 0) {
    const character = data.data.results[0];
    saveCharacter(character, hasPicture(character));
    displayCharacter(character, true);
  } else {
    console.log('No character found with that name.');
  }
} 

// Function to check if a character has a valid picture
function hasPicture(character) {
  const thumbnailUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;
  return !thumbnailUrl.includes('image_not_available');
}

// Function to fetch a random character with a valid picture
async function fetchRandomWithPicture(isOptions = false) {
  let characterWithPic = null;
  while (!characterWithPic) {
    const character = await fetchRandom();
    if (hasPicture(character)) {
      characterWithPic = character;
      saveCharacter(character, true);
    } else {
      saveCharacter(character, false);
    }
  }

  displayCharacter(characterWithPic, isOptions);
}

// Function to save character to local storage
function saveCharacter(character, hasPicture) {
  const retrievedCharacters = JSON.parse(localStorage.getItem('retrievedCharacters')) || [];
  retrievedCharacters.push(character);
  localStorage.setItem('retrievedCharacters', JSON.stringify(retrievedCharacters));

  if (hasPicture) {
    const withPictures = JSON.parse(localStorage.getItem('withPictures')) || [];
    withPictures.push(character);
    localStorage.setItem('withPictures', JSON.stringify(withPictures));
  }
}

// Function to display character on the page
async function displayCharacter(character, isOptions = false) {
  const characterContainer = document.getElementById(isOptions ? 'character-container-options' : 'character-container');
  const modalContent = document.getElementById(isOptions ? 'modal-options-content' : 'modal-content');
  characterContainer.style.backgroundColor = 'black';
  characterContainer.style.color = 'white';
  const quote = await fetchRandomQuote();
  characterContainer.innerHTML = `
    <h2 class="title">${character.name}</h2>
    <p>${character.description}</p>
    <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
    <h2 class="title">Quote</h2>
    <p>${quote}</p>
  `;
  // Make the modal content visible
  modalContent.style.opacity = 1;
}

// Function to get saved character from local storage
function getSavedCharacter(isOptions = false) {
  const retrievedCharacters = JSON.parse(localStorage.getItem('retrievedCharacters')) || [];
  if (retrievedCharacters.length > 0) {
    const character = retrievedCharacters[retrievedCharacters.length - 1];
    displayCharacter(character, isOptions);
  } else {
    console.log('No character found in local storage.');
  }
}

// Function to fetch random quote
async function fetchRandomQuote() {
  try {
    const apiKey = 'Onueu8eASpDhYi6WAqoGcA==X7Ri0HjreTAdUiRe';
    const response = await fetch(`${quoteUrl}` ,{
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    return data[0].quote;
  } catch (error) {
    console.error('Error fetching quote:', error);
    return null;
  }
}

// Animation JS

var color=document.getElementById('colored');
var x;
window.addEventListener('load',function(){setTimeout(function(){doFirst(0);},500)},false);
function doFirst(x){
  if(x==0) {
    color.style.clipPath="polygon(0 0,100% 0,100% 100%,0 100%)";
    color.style.transition="clip-path .8s";
    setTimeout(function(){
      color.style.clipPath="polygon(99.99% 0,100% 0,100% 100%,99.99% 100%)";
      color.style.transition="clip-path .8s";
    },900);
    x=99.99;
  } else {
    color.style.clipPath="polygon(0 0,100% 0,100% 100%,0 100%)";
    color.style.transition="clip-path .8s";
    setTimeout(function(){
      color.style.clipPath="polygon(0 0,0.01% 0,0.01% 100%,0 100%)";
      color.style.transition="clip-path .8s";
    },900);
    x=0;
  }

  setTimeout(function(){doFirst(x);},1900);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generate-character');
  generateBtn.addEventListener('click', () => fetchRandomWithPicture(true));

  const getSavedBtn = document.getElementById('get-saved-character');
  getSavedBtn.addEventListener('click', () => getSavedCharacter(true));

  const searchBtn = document.getElementById('search-character');
  searchBtn.addEventListener('click', () => {
    const characterName = document.getElementById('character-name').value;
    if (characterName) {
      fetchCharacterByName(characterName);
    } else {
      console.log('Please enter a character name.');
    }
  });

  const modal = document.getElementById('modal');
  const modalOptions = document.getElementById('modalOptions');
  const excelsiorButton = document.getElementById('excelsior-button');
  const optionsButton = document.getElementById('options-button')
  const modalExcelsiorButton = document.getElementById('modal-excelsior-button');
  const modalCloseButton = document.querySelectorAll('.modal-close');

  excelsiorButton.addEventListener('click', () => {
    modal.classList.add('is-active');
    fetchRandomWithPicture();
  });

  optionsButton.addEventListener('click', () => {
    modalOptions.classList.add('is-active');
    fetchRandomWithPicture(true);
  });

  modalExcelsiorButton.addEventListener('click', () => {
    fetchRandomWithPicture();
  });

  modalCloseButton.forEach(button => button.addEventListener('click', () => {
    modal.classList.remove('is-active');
    modalOptions.classList.remove('is-active');
  }));
});
