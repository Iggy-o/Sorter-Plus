/*
Ighoise Odigie
June 1, 2020
Youtube: https://www.youtube.com/channel/UCud4cJjtCjEwKpynPz-nNaQ?
Github: https://github.com/Iggy-o
Preview: https://repl.it/@IghoiseO/Sorter-Plus#script.js
*/

let titleOn = true;
let flashTime = 1
window.onclick = function() {
  if (titleOn === true) {
    titleOn = false;
    document.getElementById("container").style.display = "inline-block"
    prompt = document.getElementById("prompt")
    prompt.style.animation = `flash ${flashTime}s ease-in-out alternate infinite`
    prompt.style.fontSize = "4vh"
    prompt.innerHTML = "Choose Your Settings<br>And Select Start"
  }
}

audio = document.getElementById("music")
audio.play()
audio.volume = 0.25

//These are global variables that must be initialized
let speed, mode, arrlength, barWidth;
let arr = []
let start, checkOn = false
let turnOn = true
let ready = true
let pauseTime = 1000
let compensate = window.innerHeight*0.1
let minHeight = 50 * (window.innerHeight/1000)
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

async function startSort() {
  document.getElementById("prompt").style.display = "none"
  if (ready == true) {
    ready = false
    mode = document.getElementById("algorithm").value
    arrlength = document.getElementById("bars").value
    barWidth = window.innerWidth/arrlength
    arr = []
    for(let i = 0; i < arrlength; i++) {
      arr.push(new bar)
      function bar() {
        this.color = "black"
        this.height = Math.round(Math.random()*(window.innerHeight - compensate)+minHeight);
      }
    }
    setTimeout(function(){start = true}, pauseTime)
  }
  else{
    document.getElementById("prompt").style.display = "inline-block";
    document.getElementById("prompt").innerHTML = "Please let the sorting finish<br>(Hint: You can speed it up with the slider)"
    if (turnOn == true) {
      turnOn = false
      setTimeout(function(){
        document.getElementById("prompt").style.display = "none";
        turnOn = true
      }, (flashTime*4 + 1)*1000)
    }
  }
}

function setup(){
  noStroke();
  createCanvas(window.innerWidth, window.innerHeight);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  barWidth = windowWidth/arrlength
  compensate = window.innerHeight*0.1
  minHeight = 50 * (window.innerHeight/1000)
}
function draw(){
  speed = document.getElementById("myRange").value
  background("white");
  let x = 0;
  let color = 0
  for(let i = 0; i < arr.length; i++){
    let p = arr[i];
    if ((p.color) != "green" && (p.color) != "red"){
      p.color = (color += 200/arrlength)
    }
    fill(p.color);
    rect(x, windowHeight - p.height - 35, barWidth, p.height);
    x += barWidth
  }
  if (start == true){
    modes[mode]()
    start = false
  }
  if (checkOn == true) {
    check()
    checkOn = false
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
  setTimeout(function(){checkOn = true}, pauseTime)
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
  setTimeout(function(){checkOn = true}, pauseTime)
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
  setTimeout(function(){checkOn = true}, pauseTime)
}
async function insertionSort() {
  for (let j = 0; j < arr.length - 1; j++) {
    for (let k = j; k >= 0; k--){
      if (arr[k + 1].height < arr[k].height){
        await swap(k + 1, k)
      }
    }
  }
  setTimeout(function(){checkOn = true}, pauseTime)
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
  setTimeout(function(){checkOn = true}, pauseTime)
}
async function heapSort() {
  alert("Not Ready Yet")
  setTimeout(function(){checkOn = true}, pauseTime)
}
async function bucketSort() {
  alert("Not Ready Yet")
  setTimeout(function(){checkOn = true}, pauseTime)
}
async function cycleSort() {
  alert("Not Ready Yet")
  setTimeout(function(){checkOn = true}, pauseTime)
}
async function radixSort() {
  alert("Not Ready Yet")
  setTimeout(function(){checkOn = true}, pauseTime)
}
async function combSort() {
  alert("Not Ready Yet")
  setTimeout(function(){checkOn = true}, pauseTime)
}
async function monkeySort() {
  alert("Not Ready Yet")
  setTimeout(function(){checkOn = true}, pauseTime)
}


//
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function swap(a, b){
  arr[a].color = "green"
  arr[b].color = "red"
  await sleep(speed)
  let temp = arr[a];
  arr[a]= arr[b];
  arr[b]= temp;
  arr[a].color = "black"
  arr[b].color = "black"
}

async function check() {
  for (let i = 0; i < arr.length; i++){
    arr[i].color = "green"
    await sleep(speed/arrlength)
    arr[i].color = "black"
  }
  ready = true
}