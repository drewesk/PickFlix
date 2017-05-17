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
  let iconTemplate = `
  <div class="col s1">
  <a href="${link}" class="source-link">
    <img src="${imgURL}" alt="source" style="width:42px;height:42px;border:0;">
  </a>
  </div>
  `;
console.log('.' + sourcetype + '-container');
//  $('.' + sourcetype + '-container').append(iconTemplate);
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
