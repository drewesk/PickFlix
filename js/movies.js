function movies() {
  //prepare get request;
  $('.progress').show()
  $('.app').hide();
  let movieID = currentMediaID;
  let query = 'movies/' + movieID + '?';
  let fullURL = createRequestURL(query);
  //request movie data
  callAPIwithURL(fullURL).then(storeMovieData);
}//end movies function

function storeMovieData(response) {
  let movie={};
  movie.imageURL = response.poster_240x342;
  movie.overview = response.overview;
  movie.title = response.title;
  movie.year = response.release_year;
  movie.free_web_sources = response.free_web_sources;
  movie.subscription_web_sources = response.subscription_web_sources;
  movie.purchase_web_sources = response.purchase_web_sources;
  movie.year = response.release_year;
  movie.cast = response.cast;
  movie.extra  =response.directors[0].name;
  show.media = 'movie';
  addDatatoPage(movie);
  $('.progress').hide()
  $('.app').show();
}


registerPage('movies', movies);
