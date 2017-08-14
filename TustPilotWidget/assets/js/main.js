(function () {
    var myData = [];  
    var num = 0;
    var i = 0;
 
 function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
xobj.overrideMimeType("application/json");
xobj.open('GET', 'assets/js/review.json', true);
xobj.onreadystatechange = function () {
if (xobj.readyState == 4 && xobj.status == "200") {
callback(xobj.responseText);
}
}
xobj.send(null);
};   
loadJSON(function(response) {
myData = JSON.parse(response);
  
var average = document.getElementById("averageRating");
var scrollWindow = document.getElementById("scrollBox");
var detailedWindow = document.getElementById("detailedView");
   

myData.forEach(function(item, index) {
   //HTML Components
   var mouseoverEvent = "onmouseover='displayDetail(" + i + ")'";
   var mouseoutEvent = "onmouseout='hideDetail(" + i + ")'";     
   var starImage = "<img src='assets/img/" + item.starRating + " star.svg'/>";
    
   //calculate the average rating
   var ratingNum = parseInt(item.starRating);
   num = num + ratingNum;
    
   //display the available review records.
   var reviewRecord = "<a href='#'><span class='record inline-block' " + mouseoverEvent + " " + mouseoutEvent + ">" + starImage + "<br/><strong>" + item.reviewTitle + "</strong><br/><p>" + item.firstName + " " + item.lastName + "</p><p>" + item.reviewBody + "</p></span></a>";
    
   var detailedRecord= "<div id='detailedRecord" + i + "' class='expandedRecord' style='display:none;'><h3>" + item.reviewTitle + "</h3><hr/><small>Submitted by: " + item.fullName + "</small><br/>" + starImage + "<br/><br/><p>" + item.reviewBody + "</p></div>"
    
   scrollWindow.innerHTML += reviewRecord;
   detailedWindow.innerHTML += detailedRecord;
   i++;
})

   var averageRating = num / myData.length;
   average.innerHTML = "<img class='ratingImage' src='assets/img/" + averageRating + " star.svg' alt='stars'/>";  
  
    //displays the correct div for the review entry.
    displayDetail = function(divNum){
        document.getElementById("detailedRecord" + divNum).style.display = "block";
        
    }
    //hides the div once the mouse leaves the entry.
    hideDetail = function(divNum) {
          document.getElementById("detailedRecord" + divNum).style.display = "none";
    }   
});     
}) ();




