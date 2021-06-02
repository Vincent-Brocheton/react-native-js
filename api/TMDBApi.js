const API_TOKEN = "934ad5847c8d0e0d8ffe6b536e692ec6";

export function getFilmsFromApiWithText(text, page) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text+'&page='+page;
  return fetch( url )
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

export function getImageFromApi(name) {
  return "https://image.tmdb.org/t/p/w500"+name;
}

export function getFilmDetailFromApi(id){
  return fetch('https://api.themoviedb.org/3/movie/'+id+'?api_key=' + API_TOKEN + '&language=fr')
      .then((response) => response.json())
      .catch((error) => console.log(error));
}
