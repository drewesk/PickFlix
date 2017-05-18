// api key = d2fead1aac007a038005db2c914cb11006a472a4
//show home page upon loading
$(function() {
  showPage('home');
});

//register all other pages
const pageFunctions=[];
function registerPage(name, pageFunction){
  pageFunctions[name] = pageFunction;
}

//Make SPA
$('.page.home-page').show();
//behavior when going back to home page
$('.page-link').click(function(event){
  event.preventDefault();
  const name = this.dataset.page;
  //clear media pages
  showPage(name);
});

function showPage(name){
  //hide other pages
  $('.page').hide();
  clearPage();
  //show and call function for current page
  $('.' + name + '-page').show();
  pageFunctions[name]();
}
