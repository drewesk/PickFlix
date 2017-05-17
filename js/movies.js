function movies() {
  $('.card-movie').remove()
  //prepare get request;
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
  addDatatoPage(movie);
}

function addDatatoPage(movie) {
    addTitle(movie);
    addPoster(movie);
    addDescription(movie);
  //  addSources(movie);

}

function addTitle(movie){
  let title = movie.title;
  let titleTemplate = `
    <div class="col s12 m6 l4">
      <h1>${title}</h1>
    </div>
    `;
  $('.title-holder').append(titleTemplate);
}

function addPoster(movie){
  let imageURL = movie.imageURL;
  let imageTemplate = `
    <div class="col s12 m6 l4">
      <img src="${imageURL}">
    </div>
    `;
  $('.card-holder-title').before(imageTemplate);
}

function addDescription(movie){
  let description = movie.overview;
  let pTemplate = `
    <div class='row'>
      <div class="col s12">
        <p>${description}</p>
      </div>
    </div>
    `;
  $('.about-holder').append(description);
}


function addSources(movie){
  let free = movie.free_web_sources;
  let subscription = movie.subscription_web_sources;
  let purchase = movie.purchase_web_sources;
  let countainerTemplate = `
    <div class='row icon-holder'>
    </div>
    `;
  $('.single-movie-holder').append(countainerTemplate);

  for (var i = 0; i < free.length; i++) {
    findStreamingIcon(free[i].display_name, free[i].link, 'free');
  }

  for (var ii = 0; ii < subscription.length; ii++) {
    findStreamingIcon(subscription[ii].display_name, subscription[ii].link, 'subscription');
  }

  for (var iii = 0; iii < purchase.length; iii++) {
    findStreamingIcon(purchase[iii].display_name, purchase[iii].link, 'purchase');
  }
}


registerPage('movies', movies);
