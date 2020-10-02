$(function () { 
  count = 0; 
  wordsArray = ["Victoria Valeeva", "escape13"]; 
  setInterval(function () { 
    count++; 
    $("#name").fadeOut(150, function () { 
      $(this).text(wordsArray[count % wordsArray.length]).fadeIn(150); 
    }); 
   }, 2000); 
}); 