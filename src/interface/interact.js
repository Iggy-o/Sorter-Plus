//Initialize a global array to store the sorting items
let arr = [];
//These variables determine when to start and stop the sorting
let sortStop = false;
//These varibales track the comparisons and swaps
let comparisons = 0, swaps = 0;
//This variable determines when a user can edit the array size, etc.
let inputReady = true;
//This is a dictionary containing the modes and their associated #'s
let modes = {
  1: bubbleSort, 2: selectionSort, 3: quickSort,
  4: insertionSort, 5: mergeSort, 6: heapSort,
  7: bucketSort, 8: radixSort, 9: combSort, 10: monkeySort
}

//
class array{
  //When a new array is created, it is filled with a ner set of random bars
  constructor(){
    if (inputReady) {
      //Create a new array
      arr = [];
      //The comparisons and swaps are reset to 0
      comparisons = 0, swaps = 0;
      //For the entire value of the validated input a new random bar is created
      for(let i = 0; i < this.validateInput(); i++) {
        arr.push(new bar);
        function bar() {
          //Define the new bar's color
          this.color = "black";
          //Choose a random number within a range
          let random = Math.random();
          if (random < 0.3) random += 0.15; else if (random > 0.8) random -= 0.05;
          //Define the new bar's random height
          this.height = Math.round(random * window.innerHeight);
        }
      }
    }
  }
  //The inputted amount of entities is validated
  validateInput() {
    //The user input, max value and min value are all saved for 
    //later reference
    let entities = document.getElementById("bars");
    let validateValue = entities.value;
    let validateMax = parseInt(entities.max);
    let validateMin = parseInt(entities.min);
    //If the user inputted value is not within the predetermined 
    //boundaries, it is changed to meet the requirements
    if (validateValue < validateMin) entities.value = validateMin;
    else if (validateValue > validateMax) entities.value = validateMax;
    return entities.value;
  }
  //This function starts the sorting process
  static async startSort() {
    //If the program is ready for input continue
    if (inputReady == true) {
      //Alter the button to say STOP
      button.innerHTML = "STOP";
      //Create a new array and start the sorting process
      new array;
      //The sorting is started
      modes[document.getElementById("algorithm").value]();
      //After the sorting has started, user input is ignored
      inputReady = false;
    }
    //If the button is clicked again, stop the sort
    else if (sortStop == false) sortStop = true;
  }
  //This function ends the sorting process
  static stopSort() {
    //Alter the button to say START
    button.innerHTML = "START";
    //Turn sortStop off again
    sortStop = false;
    //If the sort is set to stop then allow for user input again
    inputReady = true;
  }
}
