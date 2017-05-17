function clearPage() {
  $('.title-holder').empty();
  $('.about-holder').empty();
  $('.sources-container').empty();
  $('.poster-holder').empty();


}

function addDatatoPage(media) {
    addTitle(media);
    addPoster(media);
    addDescription(media);
    addSources(media);
}

function addTitle(media){
  let title = media.title;
  let titleTemplate = `
    <div class="col s12 m6 l4">
      <h3>${title}</h3>
    </div>
    `;
  $('.' + mediaType + '.title-holder').append(titleTemplate);
}

function addPoster(media){
  let imageURL = media.imageURL;
  let imageTemplate = `
    <div class="col s12 m8 l4 poster-holder">
      <img src="${imageURL}" class="responsive-img">
    </div>
    `;
  $('.' + mediaType + '.card-holder-title').before(imageTemplate);
}

function addDescription(media){
  let description = media.overview;
  let pTemplate = `
    <div class='row'>
      <div class="col s12">
        <p>${description}</p>
      </div>
    </div>
    `;
  $('.' + mediaType + '.about-holder').append(pTemplate);
}

function addSources(media){
  let free = media.free_web_sources;
  let subscription = media.subscription_web_sources;
  let purchase = media.purchase_web_sources;
  console.log(free);
  console.log(subscription);
  console.log(purchase);
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

function createRequestURL(query){
  const PROXY_URL= 'https://galvanize-cors-proxy.herokuapp.com/';
  const startURL = 'http://api-public.guidebox.com/v2/';
  const endURL = 'api_key=d2fead1aac007a038005db2c914cb11006a472a4';
  return PROXY_URL + startURL + query + endURL;
}

function callAPIwithURL(fullURL) {
  return $.get(fullURL);
}
