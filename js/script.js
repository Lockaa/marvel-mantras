const publicKey = 'fac6d7c1ee74188e67b2d1496798be03';
const privateKey = 'ce26b3bbf1d31409a66690dc30f25651cd37ad9e';
const timestamp = new Date().getTime();
const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString(); // Using CryptoJS for MD5 hashing

// Base URL for Marvel API
const baseURL = 'https://gateway.marvel.com:443/v1/public/characters';

// Function to get characters
async function getMarvelCharacters() {
    // Check if data is already in local storage
    const storedData = localStorage.getItem('marvelCharacters');
    if (storedData) {
        console.log('Data retrieved from local storage');
        return JSON.parse(storedData);
    }

    const url = `${baseURL}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
    const response = await fetch(url);
    const data = await response.json();
    
    // Store data in local storage
    localStorage.setItem('marvelCharacters', JSON.stringify(data.data.results));
    return data.data.results; // Array of characters
}

// Usage
getMarvelCharacters()
.then(characters => {
  // Display characters in console
    console.log('Marvel Characters:', characters);
});
