//Active status
var activePage = window.location;
//console.log(activePage);
var navBar = document.getElementById("navbarNavAltMarkup");
var navLinkBtns = navBar.getElementsByTagName('a'), hrefs = [];
//console.log(navLinkBtns);
for (var i = 0; i < navLinkBtns.length; i++) {
  if (navLinkBtns[i].href == activePage) {
    navLinkBtns[i].classList.add("active");
  }
}
//Active status END"

//Image upload
function uploadimage() {
  var fileElement = document.getElementById('uploadImg');
  if (uploadImg.files.length != 0 && uploadImg.files[0].type.match(/image.*/)) {
    var newImgDiv = document.createElement("div");
    newImgDiv.classList.add("col-xs-12" , "col-sm-6", "col-md-3", "gal-div");
    var newImgElem = document.createElement("img");
    newImgElem.classList.add("w-100", "h-100",);
    newImgElem.setAttribute("id", "image1")
    newImgDiv.appendChild(newImgElem);
    document.getElementById("imgGallery").appendChild(newImgDiv);
    var reader = new FileReader();
    reader.onload = function (e) {
      var imgElement = document.getElementById("imgGallery").lastElementChild.firstChild;
      console.log(imgElement);
      imgElement.src = e.target.result;
    };
    reader.readAsDataURL(fileElement.files[0]);
    reader.onerror = function() {
      alert("Upload error");
    };
  } else {
    alert("Choose an image");
  }
}
//Image upload END
