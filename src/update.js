/*
Ighoise Odigie
June 1, 2020
#Made Within a Week
Youtube: https://www.youtube.com/channel/UCud4cJjtCjEwKpynPz-nNaQ?
Github: https://github.com/Iggy-o
Preview: https://repl.it/@IghoiseO/Sorter-Plus#script.js
*/ 

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
    prompt.style.fontSize = "4vh";
    prompt.style.display = "none";
    document.getElementById("prompt").innerHTML = "Please let the sorting finish<br>(Hint: You can speed it up with the slider)";
    document.getElementById("container").style.display = "inline-block";
    randomize();
  }
}

//These are variables that must be initialized globally
let speed, mode, arrlength, barWidth, validateValue, validateMax, validateMin;
let arr = [];
let sortStart = false
let inputReady = true
let randomized = false
let modes = {
  1: bubbleSort, 2: selectionSort, 3: quickSort,
  4: insertionSort, 5: mergeSort, 6: heapSort,
  7: bucketSort, 8: cycleSort, 9: radixSort,
  10: combSort, 11: monkeySort
}

//This is the function called by HTML elements to start the sort
let hintOn = true;
let hintTime = 2000;
let compensate = window.innerHeight*0.1;
let minHeight = 50 * (window.innerHeight/1000);
let comparisons = 0;
let swaps = 0;

async function startSort() {
  if (inputReady == true) {
    document.getElementById("button").style.animationIterationCount = "0"
    mode = document.getElementById("algorithm").value
    sortStart = true
    comparisons = 0
    swaps = 0
    if(randomized == false){
      randomize()
    }
    inputReady = false
    randomized = false
  }
  else if(hintOn == true){
    hintOn = false;
    document.getElementById("prompt").style.display = "inline-block";
    setTimeout(function(){
      document.getElementById("prompt").style.display = "none";
    }, hintTime)
  }
}
function randomize() {
  if (inputReady == true) {
    randomized = true
    validateValue = document.getElementById("bars").value;
    validateMax = parseInt(document.getElementById("bars").max);
    validateMin = parseInt(document.getElementById("bars").min);
    if (validateValue < validateMin) {
      document.getElementById("bars").value = validateMin;
    }
    else if (validateValue > validateMax) {
      console.log(validateValue, validateMax)
      document.getElementById("bars").value = validateMax;
    }
    
    arrlength = document.getElementById("bars").value;
    barWidth = window.innerWidth/arrlength;
    arr = [];
    for(let i = 0; i < arrlength; i++) {
      arr.push(new bar);
      function bar() {
        this.color = "black";
        this.height = Math.round(Math.random()*(window.innerHeight - compensate - 35)+minHeight);
      }
    }
  }
}


//Using Proceesing JS, I create and update a canvas the size of the screen with the bars
function setup(){
  noStroke();
  createCanvas(window.innerWidth, window.innerHeight);
  sortedSound = document.getElementById("sorted");
  sortedSound.volume = 0.25
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  barWidth = windowWidth/arrlength;
  compensate = window.innerHeight*0.1;
  minHeight = 50 * (window.innerHeight/1000);
}
function draw(){
  speed = document.getElementById("myRange").value;
  background("white");
  let x = 0;
  let color = 0;
  for(let i = 0; i < arr.length; i++){
    let p = arr[i];
    if ((p.color) != "green" && (p.color) != "red" && (p.color) != "purple"){
      p.color = (color += 200/arrlength);
    }
    fill(p.color);
    rect(x, windowHeight - p.height - 35, barWidth, p.height);
    x += barWidth;
    fill("black");
    textAlign(CENTER)
    textSize(windowHeight*0.025)
    text(`Swaps: ${swaps} | Comparisons: ${comparisons}`, windowWidth/2, windowHeight*0.05)
  }
  if (sortStart == true){
    modes[mode]();
    sortStart = false;
  }
} 

//These are the functions frequently called on in the sorting algorithms
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function comparison(a, b){
  comparisons += 1
  arr[a].color = "purple";
  arr[b].color = "purple";
  await sleep(speed);
  arr[a].color = "black";
  arr[b].color = "black";
}
async function swap(a, b){
  swaps += 1
  arr[a].color = "green";
  arr[b].color = "red";
  await sleep(speed/2);
  let temp = arr[a];
  arr[a]= arr[b];
  arr[b]= temp;
  await sleep(speed/2)
  arr[a].color = "black";
  arr[b].color = "black";
}
let pauseTime = 1000;
async function check() {
  await sleep(pauseTime);
  let prev = arr[0].height
  for (let i = 1; i < arr.length; i++){
    if (arr[i].height >= prev){
      arr[i].color = "green";
      prev = arr[i].height
      await sleep(speed/arrlength);
      arr[i].color = "black";
    }
    else{
      arr[i].color = "red"
    }
  }
  audio.volume = 0.1;
  sortedSound.play()
  sortedSound.addEventListener("ended", function(){
     audio.volume = 0.5;
  });
  inputReady = true;
}