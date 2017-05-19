//Global Variables
var mediaType = 'show';
var currentMediaID;

function callHomeLoad(){
  $('.submitbutton').click(function(){
    //event.preventDefault();
    mediaType = $(this).attr("name");
    console.log(mediaType);
  })
  $('#mediasubmit').on('submit', function() {
    //disable button
    $('.btn').attr('disabled', 'disabled');
    setLoading(true);
    let query = storeUserInput(event);
    let getURL = createRequestURL(query);
    //remove previous results
    $('.media-container').remove();
    callAPIwithURL(getURL).then(callAPIwithIDs);
  }); //end on submit
}

function home(){
  $(document).ready(function(){
    //on submit, store, request, and eppend information

    //on user toggling between media type, reset var
    $('.tab').on('click', function(){
        mediaType = $(this).attr('id');
    }); //end on tab
  });//end document ready
}//end home function

function setLoading(isLoading){
  if(isLoading){
    $('.progress').show();
  } else {
    $('.progress').hide();
  }
}

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
  setLoading(false);
  $('body').css('background-image', 'url()');
  offset_id = '';
  $('.btn').removeAttr('disabled');
  let img, title, mediaID;
  let length = results.length;
  let showMore = false;
  $('.media-holder').append('<div class=\'media-container row\'></div>');
  if(results.length>6){
    length = 6;
    showMore = true;
  } else if (length==1){
    offset_id = 'first';
  } else if (length==2){
     offset_id = 'second';
  }

  for (var i = 0; i <length; i++) {
    let offset = 0;
    if(i==0 && offset_id == 'first'){
      offset = 4;
    }
    if(i==0 && offset_id == 'second'){
      offset = 1;
    }
    if(i==1 && offset_id == 'second'){
      offset = 2;
    }
    title = results[i].title;
    mediaID = results[i].id;
    if(mediaType==='show'){
      img = results[i].artwork_304x171;
      generateCard(img, title, mediaID, offset);
    } else {
      img = results[i].poster_240x342;
      generateCard(img, title, mediaID, offset);
      }
  } //end for loop
  $('.main-page-cards').on('click', function(){
    goToPage(this.id, mediaType);
  });
}


function generateCard(imageURL, showTitle, mediaID, offset) {
  console.log('col s6 m4 offset-' + offset);
  let cardTemplate = `
    <div class="col s6 m4 offset-m${offset}">
      <div class="card card-home main-page-cards hoverable" id="${mediaID}">
        <div class="card-image">
          <img src="${imageURL}">
        </div>
        <div class="card-content">
          <p>${showTitle}</p>
        </div>
      </div>
    </div>
    `;
    //end on card click
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
