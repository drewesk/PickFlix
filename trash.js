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
