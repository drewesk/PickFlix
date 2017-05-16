var mediaType = 'show';
var currentMediaID;

function home(){
  console.log('home');
  $(document).ready(function(){
    //on submit, store all information
    $('#mediasubmit').on('submit', function() {
      let query = storeUserInput(event);
      let getURL = createRequestURL(query);
      $('.media-container').remove();
      callAPI(getURL);
    }); //end on submit
    //on user toggling between media type, reset var
    $('.tab').on('click', function(){
        mediaType = $(this).attr('id');
    }); //end on tab
    $('body').on('click', 'div.card', function(){
      console.log('clicked me');
      goToPage(this.id, mediaType);
      //console.log(this.id);
    }); //end on card click
  });//end document ready
}//end home function


  function storeUserInput(event) {
    event.preventDefault();
    let title = $('input').val();
    let query = 'search?type=' + mediaType + '&field=title&query=' + title;
    return query;
  }

  function createRequestURL(query){
    const PROXY_URL= 'https://galvanize-cors-proxy.herokuapp.com/';
    const startURL = 'http://api-public.guidebox.com/v2/';
    const endURL = '&api_key=d2fead1aac007a038005db2c914cb11006a472a4';
    return PROXY_URL + startURL + query + endURL;
  }

  function callAPI(fullURL){
    $.get(fullURL).then(function(response){
      const PROXY_URL= 'https://galvanize-cors-proxy.herokuapp.com/';
      const startURL = 'http://api-public.guidebox.com/v2/';
      let requests = [];
      for (var i = 0; i < response.results.length; i++) {
        let query =
        //requests.push($.get('http://api-public.guidebox.com/v2/' + mediaType + '/' + response.results[i].id+'?api_key=d2fead1aac007a038005db2c914cb11006a472a4'));
        requests.push($.get(PROXY_URL+startURL+ mediaType + 's/' + response.results[i].id+'?api_key=d2fead1aac007a038005db2c914cb11006a472a4'));
      } //end for loop
      Promise.all(requests).then(function(results){
          let img;
          let title;
          let mediaID;
          let length = results.length;
          let showMore = false;
          $('.media-holder').append('<div class=\'media-container row\'></div>');
          if(results.length>6){
            length = 6;
            showMore = true;
          } // end if statemend
          for (var i = 0; i <length; i++) {
            if(mediaType==='show'){
              //console.log(results);
              img = results[i].artwork_304x171;
              title = results[i].title;
              mediaID = results[i].id;
              generateCard(img, title, mediaID);
            } else {
              img = results[i].poster_240x342;
              title = results[i].title;
              mediaID = results[i].id;
              generateCard(img, title, mediaID);
              }
          } //end for loop
        }); //end promise.all
    }); //end get
  }//end call api function

  function generateCard(imageURL, showTitle, mediaID) {
    let cardTemplate = `
      <div class="col s6 m4">
        <div class="card hoverable" id="${mediaID}">
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


function goToPage(id, mediaType) {
  if (mediaType=='movie') {
    currentMediaID = id;
    showPage('movies');
  } else if(mediaType=='show'){
    currentMediaID = id;
    showPage('shows');
  }
}//end goToPage functions

registerPage('home', home);
