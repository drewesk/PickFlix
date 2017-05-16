// api key = d2fead1aac007a038005db2c914cb11006a472a4
$(function() {
  showPage('home');
});

const pageFunctions=[];
function registerPage(name, pageFunction){
  pageFunctions[name] = pageFunction;
}

//Make SPA
$('.page.home-page').show();
$('.page-link').click(function(event){
  event.preventDefault();
  const name = this.dataset.page;
  showPage(name);
});

function showPage(name){
  $('.page').hide();
  $('.' + name + '-page').show();

  pageFunctions[name]();
}
