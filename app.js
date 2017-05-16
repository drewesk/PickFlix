// api key = d2fead1aac007a038005db2c914cb11006a472a4

//Starting variable values
let mediaType = 'show';


$(document).ready(function(){
  //on submit, store all information
  $('#mediasubmit').on('submit', storeMediaInfo);
  //on user toggling between media type, reset var
  $('.tab').on('click', function(){
      mediaType = $(this).attr('id');
  });
});//end document ready

function storeMediaInfo(event) {
  event.preventDefault();
  let title = $('input').val();
  let query = 'search?type=' + mediaType + '&field=title&query=' + title;
  createRequestURL(query);
}

function createRequestURL(query){
  $('.media-container').remove();
  const PROXY_URL= 'https://galvanize-cors-proxy.herokuapp.com/';
  const startURL = 'http://api-public.guidebox.com/v2/';
  const endURL = '&api_key=d2fead1aac007a038005db2c914cb11006a472a4';
  let fullURL = PROXY_URL + startURL + query + endURL;
  $.get(fullURL).then(function(response){
    let requests = [];
    for (var i = 0; i < response.results.length; i++) {
      //requests.push($.get('http://api-public.guidebox.com/v2/' + mediaType + '/' + response.results[i].id+'?api_key=d2fead1aac007a038005db2c914cb11006a472a4'));
      requests.push($.get(PROXY_URL+startURL+ mediaType + 's/' + response.results[i].id+'?api_key=d2fead1aac007a038005db2c914cb11006a472a4'));
    }
    Promise.all(requests).then(function(results){
        let img;
        let title;
        let length = results.length;
        let showMore = false;
        $('.media-holder').append('<div class=\'media-container row\'></div>');
        if(results.length>6){
          length = 6;
          showMore = true;
        }
        for (var i = 0; i <length; i++) {
          if(mediaType==='show'){
            //console.log(results);
            img = results[i].artwork_304x171;
            title = results[i].title;
            generateCard(img, title);
          } else {
            img = results[i].poster_240x342;
            title = results[i].title;
            generateCard(img, title);
         }
        }
      });
  });
}

function generateCard(imageURL, showTitle) {
  let cardTemplate = `
    <div class="col s6 m4">
      <div class="card hoverable">
        <div class="card-image">
          <img src="${imageURL}">
        </div>
        <div class="card-content">
          <p>${showTitle}</p>
        </div>
        <div class="card-action">
          <a href="#">Watch Now</a>
        </div>
      </div>
    </div>
    `;
    $('.media-container').append(cardTemplate);
}
