//When all files have been loaded, the loader is hidden and the program is run
prompt = document.getElementById("prompt");
loader = document.getElementById("loader")
window.onload = function() {
  prompt.style.display = "inline-block"
  loader.style.display = "none"
};


//The following code is specifically for the title page
let titleOn = true;
window.onclick = function() {
  if (titleOn === true) {
    //This code manages the audio
    audio = document.getElementById("music");
    audio.volume = 0.5;
    audio.play();
    //
    titleOn = false;
    prompt.style.display = "none";
    document.getElementById("container").style.display = "inline-block";
    randomize();
  }
}