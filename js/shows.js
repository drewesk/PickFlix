function shows() {
    //$('.card-movie').remove()
    //prepare get request;
    $('.progress').show()
    $('.app').hide();
    let showID = currentMediaID;
    let query = 'shows/' + showID + '?';
    let fullURL = createRequestURL(query);
    //request movie data
    callAPIwithURL(fullURL).then(function(response){
      storeShowData(response, showID)
    }); //end then
  }

function storeShowData(response, showID) {
  let show={};
  show.imageURL = response.artwork_304x171;
  show.overview = response.overview;
  show.title = response.title;
  show.cast = response.cast;
  show.extra = response.network;
  let date = response.first_aired;
  show.year = date.substring(0,4);
  show.media = 'show';

  //request episode data;
  requestEpisodeData(showID).then(function(episodes){
    storeEpisodeData(show, episodes);
    $('.progress').hide()
    $('.app').show();
  }); //end then function
} //end store Data;

function requestEpisodeData(showID){
  let query = 'shows/' + showID + '/episodes?include_links=true&';
  let fullURL = createRequestURL(query);
  return callAPIwithURL(fullURL);
}

function storeEpisodeData(show, episodeData) {
  show.free_web_sources = episodeData.results[0].free_web_sources;
  show.subscription_web_sources = episodeData.results[0].subscription_web_sources;
  show.purchase_web_sources = episodeData.results[0].purchase_web_sources;
  addDatatoPage(show);
}

registerPage('shows', shows);
