//When all files have been loaded, the loader is hidden and the 
//user is prompted to click to continue
let prompt = document.getElementById("prompt");
let loader = document.getElementById("loader");
window.onload = () => {
  //The prompt is shown
  prompt.style.display = "inline-block";
  //The loader is hidden
  loader.style.display = "none";
};

//When the user clicks the prompt, it is hidden, the program starts,
//and music is played
let audio = document.getElementById("music");
let sortedSound = document.getElementById("sorted");
prompt.addEventListener("click", function(){
  //The startup screen is hidden
  prompt.style.display = "none";
  //The ui is shown to the user
  document.getElementById("container").style.display = "inline-block";
  //The array of randomized bars are setup
  new array;
  //The audio is downloaded and prepped for play
  audio.volume = 0.5;
  sortedSound.volume = 0.25;
  audio.play();
});

//When the button is clicked for the first time the animation is turned off
let button = document.getElementById("button");
button.addEventListener("click", () => button.style.animationIterationCount = "0");

//When the slider is changed update the speed
let slider = document.getElementById("myRange");
let speed = slider.value;
slider.addEventListener("input", () => speed = slider.value);