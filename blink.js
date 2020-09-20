$(function () { 
  count = 0; 
  wordsArray = ["Timur Valeev", "escape13"]; 
  setInterval(function () { 
    count++; 
    $("#name").fadeOut(150, function () { 
      $(this).text(wordsArray[count % wordsArray.length]).fadeIn(150); 
    }); 
   }, 1300); 
}); 