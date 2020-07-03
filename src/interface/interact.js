//These are variables that must be initialized globally
let speed, mode, arrlength, barWidth, validateValue, validateMax, validateMin;
let arr = [];
let sortStart = false;
let inputReady = true;
let randomized = false;
let modes = {
  1: bubbleSort, 2: selectionSort, 3: quickSort,
  4: insertionSort, 5: mergeSort, 6: heapSort,
  7: bucketSort, 8: radixSort, 9: combSort, 10: monkeySort
}

//This is the function called by HTML elements to start the sort
let hintOn = true;
let hintTime = 2000;
let compensate = window.innerHeight*0.1;
let minHeight = 50 * (window.innerHeight/1000);
let comparisons = 0;
let swaps = 0;
let button = document.getElementById("button");

async function startSort() {
  if (inputReady == true) {
    //isStopped = false;
    button.style.animationIterationCount = "0";
    button.innerHTML = "STOP";
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
  else if (isStopped == false) {
    isStopped = true;
    //setTimeout(function(){
    //}, 2000);
  }
}
function stopSort() {
  isStopped = false;
  button.innerHTML = "START";
  inputReady = true;
  sortStart = false;
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
      //console.log(validateValue, validateMax)
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