function clearPage() {
  console.log('clear page was called');
  $('.title-holder').empty();
  $('.about-holder').empty();
  $('.sources-container').empty();
  $('.poster-holder').empty();
  $('.poster-img').remove();
}

function createRequestURL(query){
  const PROXY_URL= 'https://galvanize-cors-proxy.herokuapp.com/';
  const startURL = 'http://api-public.guidebox.com/v2/';
  const endURL = 'api_key=d2fead1aac007a038005db2c914cb11006a472a4';
  return PROXY_URL + startURL + query + endURL;
}

function callAPIwithURL(fullURL) {
  return $.get(fullURL);
}
