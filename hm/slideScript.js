//Image array

const images = [
    "images/fox.png",
    "images/mushrooms.png",
    "images/pie.png",
    "images/PumpkinSpice.png",
    "images/StackPump.png"
];

let currentIndex = 0;
const slide = document.getElementById("slide");

function showImage() 
{
    slide.src = images[currentIndex];
}

//show first image when window loads
window.onload = showImage;
//show next image
function nextImage()
{
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
}
//Show previous Image
function prevImage()
{
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
}