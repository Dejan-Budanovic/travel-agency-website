//Subscribe ALERT function
function subscribeAlert() {
  var userSubEmail = document.getElementById("InputSubEmail").value;
  var userSubEmailValid = document.getElementById("InputSubEmail").value.indexOf("@");
  submitOK = "true";
  if (userSubEmailValid == -1) {
    alert("Please enter a valid e-mail!");
    submitOK = "false";
  }
  if (submitOK == "false") {
    return false;
  }
  alert("Thank you for subcribing " + userSubEmail);
}
//Subscribe ALERT function

// post COMMENT function
function postComment() {
  var text = document.getElementById('FormControlTextarea');
  if (text.value != "") {    //Izvrši ako ima komnetara
    //var imgAttr = "img/person-circle.svg";   //Putanja do Avatara
    var imgSpan = document.createElement("span");
    var div = document.createElement("div"); //DIV u kome se nalazi paragraf sa komentarom
    var attr = document.createAttribute("class"); //Klasa DIV-a
    //var userImg = document.createElement("img"); //Kreira novi IMG element za Avatar
    //userImg.setAttribute('src', imgAttr); //Dodeljuje SRC atribut sa avgAttr putanjom
    var p = document.createElement("p"); //Kreira paragraf u kome će se nalaziti komentar
    p.classList += 'commentText'; //Dodeljuje klasu paragrafu
    p.innerHTML =text.value; //Dodeljuje vrednost iz "text" forme
    attr.value="commentTextWindow"; //Imenuje klasu za DIV
    div.setAttributeNode(attr);   //Dodeljuje klasu DIV-u
    div.append(/*userImg*/imgSpan, p); //Dodeljuje DIV-u vrednosti Avatara i Komentara
    document.getElementById('userComment').appendChild(div); //Dodaje DIV na tačno mesto
    text.value = "";    //Resetuje vrednost "text" forme
  } else {
    alert("Enter a comment");    //ALERT ako nema komentara
  }
}
//post COMMENT function END

//show ARTiCLE function
var readArticle = document.getElementById("article1");
var blogArticle = document.getElementsByClassName("blog-article");
readArticle.style.display = "none"
function readMore() {
  if (readArticle.style.display === "none") {
    readArticle.style.display = "block";
    for (var i = 0; i < blogArticle.length; i++) {
        blogArticle[i].style.display = "none";
        }
  } else {
    readArticle.style.display = "none";
    for (var i = 0; i < blogArticle.length; i++) {
        blogArticle[i].style.display = "block";
    }
  }
}

//show ARTiCLE function END


//Sort by Popular
var headings = document.getElementsByTagName("h5");
var popArt = document.getElementById("popular-articles").getElementsByTagName("p");
for (var i = 0; i < 4; i++) {
popArt[i].innerHTML =  headings[i].innerHTML;
}
//Sort by Popular END


//Sort by Categories
var categories = document.getElementsByClassName('article-categories');
var catArt = document.getElementById("categories").getElementsByTagName("p");
var destCounter = 0;
var trTipCounter = 0;
var summVacCounter = 0;
for (var i = 0; i < categories.length; i++) {
  if (categories[i].innerHTML === "Destinations") {
    destCounter++;
  } else if (categories[i].innerHTML === "Travel tips") {
    trTipCounter++;
  } else if (categories[i].innerHTML === "Summer vacation") {
    summVacCounter++;
  }
  catArt[0].innerHTML ="Travel tips " +"(" + trTipCounter +")";
  catArt[1].innerHTML ="Destinations " +"(" + destCounter +")";
  catArt[2].innerHTML ="Summer vacation " +"(" + summVacCounter +")";
}
//console.log(summVacCounter);
//Sort by Categories END

//Sort by Recent
var datesArr = document.getElementsByTagName('time');
var recArt = document.getElementById("recent-articles").getElementsByTagName("p");
for (var i = 0; i < recArt.length; i++) {
recArt[i].innerHTML =  datesArr[i].previousElementSibling.innerHTML;
}
//Sort by Recent END
