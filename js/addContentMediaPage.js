function addDatatoPage(media) {
    addTitle(media);
    addPoster(media);
    addDescription(media);
    addSources(media);
}

function addTitle(media){
  let title = media.title;
  let titleTemplate = `
    <div class="col s12s">
      <h3>${title}</h3>
    </div>
    `;
  $('.' + mediaType + '.title-holder').append(titleTemplate);
}

function addPoster(media){
  const imageURL = media.imageURL;
  const imageTemplate = `
    <div class="col s12 m7 poster-img" >
      <div class="card">
        <div class="card-image">
          <img class="z-depth-3" src="${imageURL}">
        </div>
      </div>
    </div>
    `;
  $('.' + mediaType + '.card-holder-title').before(imageTemplate);
}


function addDescription(media){
  console.log(media);
  const description = media.overview;
  const year = media.year;
  const extra = media.extra;
  const title = media.title;
  const cast = media.cast;
  let cast_list = '';
  let extra_class = 'Network';
  for (var i = 0; i < cast.length-1; i++) {
    cast_list += cast[i].name + ', ';
  } cast_list += cast[cast.length-2].name;
  console.log(cast_list);
  if(media.media=='show') {
    extra_class = 'Network';
  } else {
    extra_class = 'Producer';
  }
  let pTemplate = `
    <h3>
      <span class="about-span">About</span>
      ${title}
    </h3>
    <div class="title-synopsis">
    <p>${description}</p>
    </div>
    <div class="title-cast-and-crew">
      <h5>Cast</h5>
      <p>${cast_list}</p>
      <h5>Year of Original Release</h5>
      <p>${year}</p>
      <h5>${extra_class}</h5>
      <p>${extra}</p>
    </div>
    `;
  $('.' + mediaType + '.about-holder').append(pTemplate);
}



function addSources(media){
  let free = media.free_web_sources;
  let subscription = media.subscription_web_sources;
  let purchase = media.purchase_web_sources;
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

var streamingIcons = {
   'Netflix': './images/netflix.png',
   'iTunes': './images/itunes.png',
   'Amazon': './images/amazon.jpg',
   'Amazon Prime': './images/amazon-prime.png',
   'VUDU': './images/vudu.jpeg',
   'Google Play': './images/google-play.png',
   'YouTube': './images/youtube.png',
   'Verizon On Demand': './images/verizon.png',
   'Hulu': './images/hulu.png',
   'CinemaNow': './images/cinema-now.jpeg',
   'Sony Entertainment Network': './images/sony.jpg',
   'Paramount Movies': './images/paramount.jpg'
};

function findStreamingIcon(service, link, sourcetype) {
  let imgURL = './images/placeholder.jpeg';
  if (streamingIcons.hasOwnProperty(service)== true)  {
    imgURL = streamingIcons[service];
  }
  generateIcon(imgURL, link, sourcetype);
}

function generateIcon(imgURL, link, sourcetype){
  console.log('made to generate icon');
  let iconTemplate = `
  <div>
    <a href="${link}" class="source-link">
      <img src="${imgURL}" alt="source" style="width:60px;height:42px;border:0;">
    </a>
  </div>
  `;
$('.' + mediaType + '.' + sourcetype + '-container').append(iconTemplate);
}
