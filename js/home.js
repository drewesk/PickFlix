var mediaType = 'show';
var currentMediaID;

function home(){
  console.log('home');
  $(document).ready(function(){
    //on submit, store, request, and eppend information
    $('#mediasubmit').on('submit', function() {
      let query = storeUserInput(event);
      let getURL = createRequestURL(query);
      $('.media-container').remove();
      callAPIwithURL(getURL).then(callAPIwithIDs);
    }); //end on submit
    //on user toggling between media type, reset var
    $('.tab').on('click', function(){
        mediaType = $(this).attr('id');
    }); //end on tab
    $('body').on('click', 'div.card-home', function(){
      console.log('clicked me');
      goToPage(this.id, mediaType);
      //console.log(this.id);
    }); //end on card click
  });//end document ready
}//end home function


//Data handling/API Requests
function storeUserInput(event) {
  event.preventDefault();
  let title = $('input').val();
  let query = 'search?type=' + mediaType + '&field=title&query=' + title + '&';
  return query;
}


function callAPIwithIDs(response){
  let requests = [];
  for (var i = 0; i < response.results.length; i++) {
    let query = mediaType + 's/' + response.results[i].id + '?';
    let fullURL = createRequestURL(query);
    requests.push($.get(fullURL));
  } //end for loop
  Promise.all(requests).then(createInitialCards);
}

//Element handling
function createInitialCards(results) {
  let img, title, mediaID;
  let length = results.length;
  let showMore = false;
  $('.media-holder').append('<div class=\'media-container row\'></div>');
  if(results.length>6){
    length = 6;
    showMore = true;
  } // end if statemend
  for (var i = 0; i <length; i++) {
    title = results[i].title;
    mediaID = results[i].id;
    if(mediaType==='show'){
      img = results[i].artwork_304x171;
      generateCard(img, title, mediaID);
    } else {
      img = results[i].poster_240x342;
      generateCard(img, title, mediaID);
      }
  } //end for loop
}


function generateCard(imageURL, showTitle, mediaID) {
  let cardTemplate = `
    <div class="col s6 m4">
      <div class="card card-home hoverable" id="${mediaID}">
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

//actions upon links
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
