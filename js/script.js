const publicKey = 'fac6d7c1ee74188e67b2d1496798be03';
const privateKey = 'ce26b3bbf1d31409a66690dc30f25651cd37ad9e';
const baseUrl = 'https://gateway.marvel.com/v1/public/characters';
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
    displayCharacter(character);
  } else {
    console.log('No character found with that name.');
  }
}

// Function to fetch characters by series
async function fetchCharactersBySeries(seriesId) {
  const url = `${baseUrl}?apikey=${publicKey}&ts=${ts}&hash=${hash}&series=${seriesId}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.data.results.length > 0) {
    const characters = data.data.results;
    characters.forEach(character => {
      saveCharacter(character, hasPicture(character));
    });
    displayCharacters(characters);
  } else {
    console.log('No characters found for that series.');
  }
}

async function fetchMultipleCharacters(limit, offset) {
  const url = `${baseUrl}?apikey=${publicKey}&ts=${ts}&hash=${hash}&limit=${limit}&offset=${offset}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.data.results.length > 0) {
    const characters = data.data.results;
    characters.forEach(character => {
      saveCharacter(character, hasPicture(character));
    });
    displayCharacters(characters);
  } else {
    console.log('No characters found.');
  }
}


// Function to check if a character has a valid picture
function hasPicture(character) {
  const thumbnailUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;
  return !thumbnailUrl.includes('image_not_available');
}

// Function to fetch a random character with a valid picture
async function fetchRandomWithPicture() {
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

  displayCharacter(characterWithPic);
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
function displayCharacter(character) {
  const characterContainer = document.getElementById('character-container');
  characterContainer.innerHTML = `
        <h2 class="title">${character.name}</h2>
        <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
        <p>${character.description}</p>
    `;
}

// Function to get saved character from local storage
function getSavedCharacter() {
  const retrievedCharacters = JSON.parse(localStorage.getItem('retrievedCharacters')) || [];
  if (retrievedCharacters.length > 0) {
    const character = retrievedCharacters[retrievedCharacters.length - 1];
    displayCharacter(character);
  } else {
    console.log('No character found in local storage.');
  }
}

// Event listeners
const generateBtn = document.getElementById('generate-character');
generateBtn.addEventListener('click', fetchRandomWithPicture);

const getSavedBtn = document.getElementById('get-saved-character');
getSavedBtn.addEventListener('click', getSavedCharacter);

const searchBtn = document.getElementById('search-character');
searchBtn.addEventListener('click', () => {
  const characterName = document.getElementById('character-name').value;
  if (characterName) {
    fetchCharacterByName(characterName);
  } else {
    console.log('Please enter a character name.');
  }
});

const seriesBtn = document.getElementById('fetch-by-series');
seriesBtn.addEventListener('click', () => {
  const seriesId = document.getElementById('series-id').value;
  if (seriesId) {
    fetchCharactersBySeries(seriesId);
  } else {
    console.log('Please enter a series ID.');
  }
});

const multipleBtn = document.getElementById('fetch-multiple');
multipleBtn.addEventListener('click', () => {
  const limit = document.getElementById('fetch-limit').value;
  const offset = document.getElementById('fetch-offset').value;
  if (limit && offset) {
    fetchMultipleCharacters(limit, offset);
  } else {
    console.log('Please enter both limit and offset.');
  }
});

