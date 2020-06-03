/*
Ighoise Odigie
June 1, 2020
#Made Within a Week
Youtube: https://www.youtube.com/channel/UCud4cJjtCjEwKpynPz-nNaQ?
Github: https://github.com/Iggy-o
Preview: https://repl.it/@IghoiseO/Sorter-Plus#script.js
*/

//The fllowing code is specifically for the title page
let titleOn = true;
window.onclick = function() {
  if (titleOn === true) {
    //This code manages the audio
    audio = document.getElementById("music");
    audio.volume = 0.025;
    audio.play();
    //
    titleOn = false;
    prompt = document.getElementById("prompt");
    prompt.style.fontSize = "4vh";
    prompt.style.display = "none";
    document.getElementById("prompt").innerHTML = "Please let the sorting finish<br>(Hint: You can speed it up with the slider)";
    document.getElementById("container").style.display = "inline-block";
    randomize();
  }
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
let hintOn = true;
let hintTime = 2000;
let compensate = window.innerHeight*0.1;
let minHeight = 50 * (window.innerHeight/1000);
let comparisons = 0;

async function startSort() {
  if (inputReady == true) {
    document.getElementById("button").style.animationIterationCount = "0"
    mode = document.getElementById("algorithm").value
    sortStart = true
    comparisons = 0
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
    if ((p.color) != "green" && (p.color) != "red" && (p.color) != "purple"){
      p.color = (color += 200/arrlength);
    }
    fill(p.color);
    rect(x, windowHeight - p.height - 35, barWidth, p.height);
    fill("black");
    textSize(windowHeight*0.025)
    text(`Comparisons: ${comparisons}`, windowWidth/2-windowHeight*0.03, windowHeight*0.05)
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
      await comparison(k, k + 1);
      if (arr[k].height > arr[k+1].height) {
        await swap(k, k + 1); 
      }
    }
  }
  check();
}
async function selectionSort() {
  for (let j = 0; j < arr.length; j++) {
    max = arr[0].height
    maxPos = 0
    for(let k = 0; k < arr.length - j; k++){
      await comparison(k, maxPos);
      if (arr[k].height > max) {
        max = arr[k].height
        maxPos = k
      }
    }
    await swap(maxPos, arr.length-j-1)
  }
  check();
}
//May have speed issue
async function quickSort() {
  await quickSorting(0, arr.length - 1)
  async function quickSorting(start, end) {
    if (start >= end) {
      return
    }
    await comparison(start, end);
    let index = await partition(start, end)
    await quickSorting(start, index - 1)
    await quickSorting(index + 1, end)
    async function partition(start, end){
      let pivotIndex = start
      let pivot = arr[end].height
      for (let i = start; i < end; i++){
        await comparison(i, pivotIndex);
        if (arr[i].height < pivot){
          await swap(i, pivotIndex)
          pivotIndex += 1
        }
      }
      await swap(pivotIndex, end)
      return pivotIndex
    }
  }
  check();
}
async function insertionSort() {
  for (let j = 0; j < arr.length - 1; j++) {
    for (let k = j; k >= 0; k--){
      await comparison(k, k + 1);
      if (arr[k + 1].height < arr[k].height){
        await swap(k + 1, k)
      }else{
        break
      }
    }
  }
  check();
}
//Merge Broken
//Has speed issues
async function mergeSort() {
  await mergeSorting(0, arr.length - 1)
  async function mergeSorting(start, end) {
    if(start < end) {
      await comparison(start, end);
      mid = Math.floor((start + end)/2)
      await mergeSorting(start, mid)
      await mergeSorting(mid + 1, end)
      await merge(start, mid)
      async function merge(start, mid) {
        for (let i = start; i < mid; i++) {
          for (let j = start; j < mid; j++) {
            await comparison(start + (j - start), mid + (i - mid));
            if (arr[start + (j - start)].height > arr[mid + (i - mid)].height){
              await swap(start + (j - start), mid + (i - mid))
            }
          }
        }
      }
    }
  }
  check();
}
async function heapSort() {
  let n = arr.length - 1
  await bubble()
  async function bubble() {
    for(let parentNode = n; parentNode >= 0; parentNode--) {
      await drown(parentNode)
    }
    while (n >= 0) {
      await swap(0, n)
      n--
      await drown(0)
    }
  }
  async function drown(parentNode) {
    let leftNode = parentNode*2 + 1
    let rightNode = parentNode*2 + 2
    let maxNode = parentNode;
    if (leftNode <= n){
      await comparison(leftNode, maxNode);
      if(arr[leftNode].height > arr[maxNode].height){
        maxNode = leftNode
      }
    }
    if(rightNode <= n) {
      await comparison(rightNode, maxNode);
      if (arr[rightNode].height > arr[maxNode].height){
        maxNode = rightNode
      }
    }
    if (maxNode > parentNode) {
      await swap(parentNode, maxNode)
      await drown(maxNode)
    }
  }
  check();
}
async function bucketSort() {
  check();
}
async function cycleSort() {
  check();
}
async function radixSort() {
  check();
}
async function combSort() {
  check();
}
async function monkeySort() {
  check();
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
    if (arr[i].height > prev){
      arr[i].color = "green";
      prev = arr[i].height
      await sleep(speed/arrlength);
      arr[i].color = "black";
    }
    else{
      arr[i].color = "red"
    }
  }
  inputReady = true;
}