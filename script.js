/*
Ighoise Odigie
June 1, 2020
Youtube: https://www.youtube.com/channel/UCud4cJjtCjEwKpynPz-nNaQ?
Github: https://github.com/Iggy-o
Preview: https://repl.it/@IghoiseO/Sorter-Plus#script.js
*/

//The fllowing code is specifically for the title page
let titleOn = true;
window.onclick = function() {
  if (titleOn === true) {
    titleOn = false;
    prompt = document.getElementById("prompt");
    prompt.style.fontSize = "4vh";
    prompt.style.display = "none";
    document.getElementById("prompt").innerHTML = "Please let the sorting finish<br>(Hint: You can speed it up with the slider)";
    document.getElementById("container").style.display = "inline-block";
    randomize();
  }
}

//This function manages the audio
audio();
function audio() {
  audio = document.getElementById("music")
  audio.play();
  audio.volume = 0.25;
}

//These are variables that must be initialized globally
let speed, mode, arrlength, barWidth;
let arr = [];
let sortStart = false
let inputReady = true
let randomized = false
let modes = {
  1: bubbleSort,
  2: selectionSort,
  3: quickSort,
  4: insertionSort,
  5: mergeSort,
  6: heapSort,
  7: bucketSort,
  8: cycleSort,
  9: radixSort,
  10: combSort,
  11: monkeySort
}

//This is the function called by HTML elements to start the sort
let hintOn = true
let compensate = window.innerHeight*0.1
let minHeight = 50 * (window.innerHeight/1000)

async function startSort() {
  if (inputReady == true) {
    document.getElementById("button").style.animationIterationCount = "0"
    mode = document.getElementById("algorithm").value
    sortStart = true
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
    }, 5000)
  }
}
function randomize() {
  if (inputReady == true) {
    randomized = true
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
    if ((p.color) != "green" && (p.color) != "red"){
      p.color = (color += 200/arrlength);
    }
    fill(p.color);
    rect(x, windowHeight - p.height - 35, barWidth, p.height);
    x += barWidth;
  }
  if (sortStart == true){
    modes[mode]();
    sortStart = false;
  }
} 

//These are the sorting algorithms
async function bubbleSort() {
  for (let j = 0; j < arr.length; j++) {
    for(let k = 0; k < arr.length - 1 - j; k++){
      if (arr[k].height > arr[k+1].height) {
        await swap(k, k + 1); 
      }
    }
  }
  check()
}
async function selectionSort() {
  for (let j = 0; j < arr.length; j++) {
    max = arr[0].height
    maxPos = 0
    for(let k = 0; k < arr.length - j; k++){
      if (arr[k].height > max) {
        max = arr[k].height
        maxPos = k
      }
    }
    await swap(maxPos, arr.length-j-1)
  }
  check()
}
async function quickSort() {
  await quickSorting(0, arr.length - 1)
  async function quickSorting(start, end) {
    if (start >= end) {
      return
    }
    let index = await partition(start, end)
    await quickSorting(start, index-1)
    await quickSorting(index + 1, end)
    async function partition(start, end){
      let pivotIndex = start
      let pivot = arr[end].height
      for (let i = start; i < end; i++){
        if (arr[i].height < pivot){
          await swap(i, pivotIndex)
          pivotIndex += 1
        }
      }
      await swap(pivotIndex, end)
      return pivotIndex
    }
  }
  check()
}
async function insertionSort() {
  for (let j = 0; j < arr.length - 1; j++) {
    for (let k = j; k >= 0; k--){
      if (arr[k + 1].height < arr[k].height){
        await swap(k + 1, k)
      }
    }
  }
  check()
}
async function mergeSort() {
  await mergeSorting(0, arr.length + 1)
  async function mergeSorting(start, end) {
    if(start < end) {
      mid = Math.floor((start + end)/2)
      await mergeSorting(start, mid)
      await mergeSorting(mid + 1, end)

      await merge(start, mid, end)
      async function merge(start, mid, end) {
        for (let i = start; i < mid; i++) {
          for (let j = start; j < mid; j++) {
            if (arr[start + (j - start)].height > arr[mid + (i - mid)].height){
              await swap(start + (j - start), mid + (i - mid))
            }
          }
        }
      }
    }
  }
  check()
}
async function heapSort() {
  alert("Not Ready Yet")
  check()
}
async function bucketSort() {
  alert("Not Ready Yet")
  check()
}
async function cycleSort() {
  alert("Not Ready Yet")
  check()
}
async function radixSort() {
  alert("Not Ready Yet")
  check()
}
async function combSort() {
  alert("Not Ready Yet")
  check()
}
async function monkeySort() {
  alert("Not Ready Yet")
  check()
}


//These are the functions frequently called on in the sorting algorithms
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function swap(a, b){
  arr[a].color = "green";
  arr[b].color = "red";
  await sleep(speed);
  let temp = arr[a];
  arr[a]= arr[b];
  arr[b]= temp;
  arr[a].color = "black";
  arr[b].color = "black";
}

let pauseTime = 1000;
async function check() {
  await sleep(pauseTime);
  for (let i = 0; i < arr.length; i++){
    arr[i].color = "green";
    await sleep(speed/arrlength);
    arr[i].color = "black";
  }
  inputReady = true;
}