gCurrentImage = 0;

function canManipulateImages() {
	if (document.images)
		return true;
	else
		return false;
}
function loadSlide(imageURL) {
	if (gImageCapableBrowser) {
		document.slide.src = imageURL;
		return false;
	}
	else {
		return true;
	}
}
function nextSlide() {
        clrStl(gCurrentImage);
	gCurrentImage = (gCurrentImage + 1) % gNumberOfImages;
	loadSlide(gImages[gCurrentImage]);
        document.getElementById("sm" + gCurrentImage).style.border = '3px red solid';
        
}

function chgIm (id, gImages) {
  var sim = "sm" + id;
  clrStl(gCurrentImage);
  //alert(document.getElementById(sim));
  gCurrentImage = id;
  loadSlide(gImages[id]);
  document.getElementById(sim).style.border = '3px red solid';
  }

function clrStl (id) {
  var sim = "sm" + (id);
  document.getElementById(sim).style.border = 'none';;
  }

gSlideshowInterval = 5;
gNumberOfImages = 4;

gImages = new Array(gNumberOfImages);
gImages[0] = "banners/c01.png";
gImages[1] = "banners/c02.png";
gImages[2] = "banners/c03.png";
gImages[3] = "banners/c04.png";

gImageCapableBrowser = canManipulateImages();

