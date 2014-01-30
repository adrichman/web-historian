
$(document).on('ready', function(){

  $('#submitUrlButton').on('click',function(e){
    e.preventDefault();
    var urlToCheck = $('#urlInputField').val();
    window.location.assign(urlToCheck);

  });

});