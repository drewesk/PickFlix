function movies() {
  $('.card-movie').remove()
  let movieID = currentMediaID;
  let query = 'movies/' + movieID + '?';
  let fullURL = createRequestURL(query);
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
    createPoster(movie);
    addDescription(movie);
    addSources(movie);
}

function createPoster(movie){
  let imageURL = movie.imageURL;
  console.log(imageURL);
  let imageTemplate = `
    <div class='row'>
      <img src="${imageURL}">
    </div>
    `;
  $('.single-movie-holder').append(imageTemplate);
}

function addDescription(movie){
  let description = movie.overview;
  let pTemplate = `
    <div class='row'>
      <p>${description}</p>
    </div>
    `;
  $('.single-movie-holder').append(description);
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
    generateIcon(free[i].display_name, free[i].link);
    console.log(i);
  }

  for (var ii = 0; ii < subscription.length; ii++) {
    generateIcon(subscription[ii].display_name, subscription[ii].link);
    console.log(ii);
  }

  for (var iii = 0; iii < purchase.length; iii++) {
    generateIcon(purchase[iii].display_name, purchase[iii].link);
    console.log(iii);
  }
}

function generateIcon(source, link){
  let iconTemplate = `
  <div class="col s1">
  <a href="${link}" class="source-link">
    <img src="./images/placeholder.jpeg" alt="source" style="width:42px;height:42px;border:0;">
  </a>
  </div>
  `;
  $('.icon-holder').append(iconTemplate);
}



registerPage('movies', movies);
