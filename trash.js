function requestData(url) {
  $.ajax({
    url: url,
    type: 'Get',
    dataType: 'json',
    headers: {'Authorization': 'd2fead1aac007a038005db2c914cb11006a472a4'},
    success: handleData,
    error: function(msg){alert(msg);}
  });
}

function postPoster(response) {
  let imageURL = response.poster_240x342;
  let overview = response.overview;
  let cardTitle = response.title +' (' +response.release_year+ ')';
  let cardTemplate = `
    <div class="card card-movie">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator sub-image" src="${imageURL}">
      </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">${cardTitle}<i class="material-icons right">more_vert</i></span>
      <p><a href="#">This is a link</a></p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">Plot Summary<i class="material-icons right">close</i></span>
      <p>"${overview}"</p>
    </div>
  </div>
  `;
  $('.media-single-card-holder').append(cardTemplate);
}
