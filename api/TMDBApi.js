const API_TOKEN = "934ad5847c8d0e0d8ffe6b536e692ec6";

export function getFilmsFromApiWithText(text) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text;
  return fetch( url )
    .then((response) => response.json())
    .catch((error) => console.log(error))
}
