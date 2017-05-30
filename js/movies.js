// Partner 2 will add comments to each line of code explaining in human words what it is doing
function movies() { // declaring a function
  //prepare get request;
  $('.progress').show() // so display is set to none.. when function is fired it will show via jQuery
  $('.app').hide(); //once you show, you are wanting to hide this element.

  //declaring variables
  let movieID = currentMediaID; //setting a global value reflected by user input.
  let query = 'movies/' + movieID + '?'; // setting the query string.
  let fullURL = createRequestURL(query); // passing just the query string to the function.
  //request movie data
  callAPIwithURL(fullURL).then(storeMovieData); // the function concats the query string to the
  //ultimate URL
}// end movies function

function storeMovieData(response) { // parameter is the output from the get request.
  let movie={};

  /* below accessign the object values from what the what the response is */
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
  movie.media = 'movie';
  addDatatoPage(movie);
  $('.progress').hide();// once the asynchronous get request has loaded the progress bar will hide.
  $('.app').show(); // then show results
}


registerPage('movies', movies); // unknown by me.
