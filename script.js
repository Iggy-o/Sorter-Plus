/*
Ighoise Odigie
May, 28 2020
Youtube: https://www.youtube.com/channel/UCud4cJjtCjEwKpynPz-nNaQ?
Github: https://github.com/Iggy-o
Preview: https://repl.it/@IghoiseO/Confetti-Party#index.html
*/

//These are global variables that must be initialized
let speed, mode, arrlength, barWidth;
let arr = []
let start, checkOn = false
let ready = true
let pauseTime = 1000
let modes = {
  1: bubbleSort,
  2: selectionSort,
  3: quickSort,
  4: insertionSort,
  5: mergeSort,
  //6: heapSort,
  //7: bucketSort,
  //8: cycleSort,
  //9: radixSort,
  //10: combSort,
  //11: monkeySort
}

async function startSort() {
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
        this.y = window.innerHeight
        this.height = Math.round(Math.random()*window.innerHeight);
        this.width = barWidth;
      }
    }
    setTimeout(function(){start = true}, pauseTime)
  }
  else{
    alert("Please let the sorting finish\n(Note: You can speed it up with the slider)")
  }
}


function setup(){
  noStroke();
  createCanvas(window.innerWidth, window.innerHeight);
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
    rect(x, p.y - p.height, p.width, p.height);
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
    await sleep(speed/100)
    arr[i].color = "black"
  }
  ready = true
}