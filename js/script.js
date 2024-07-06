async function fetchRandomMarvelCharacter() {
  const publicKey = 'fac6d7c1ee74188e67b2d1496798be03';
  const privateKey = 'ce26b3bbf1d31409a66690dc30f25651cd37ad9e';
  const baseUrl = 'https://gateway.marvel.com/v1/public/characters';
  const ts = new Date().getTime();
  const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

  // Get the total number of characters first
  let response = await fetch(`${baseUrl}?apikey=${publicKey}&ts=${ts}&hash=${hash}&limit=1`);
  let data = await response.json();
  const totalCharacters = data.data.total;

  // Generate a random index within the total number of characters
  const randomIndex = Math.floor(Math.random() * totalCharacters);

  // Fetch the character at the random index
  let url = `${baseUrl}?apikey=${publicKey}&ts=${ts}&hash=${hash}&limit=1&offset=${randomIndex}`;
  response = await fetch(url);
  data = await response.json();
  const randomCharacter = data.data.results[0];

  console.log(randomCharacter);
}

// Call the function to fetch a random character
fetchRandomMarvelCharacter();
