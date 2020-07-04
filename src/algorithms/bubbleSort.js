/*
Bubble Sort
--------------

Bubble Sort is a very simple process in which you compare two
neighbouring items (or in this case bars) and ensure the left 
on is larger, if not you swap them. Once you get to the end you
should have the largest item in its appropriate position. You 
repeat this process until the array is sorted.
*/

async function bubbleSort() {
  //The largest bar is moved to the end for the length of the array
  for (let j = 0; j < arr.length; j++) {
    //Moving from left to right each bar is compared to its right neighbour
    for(let k = 0; k < arr.length - 1 - j; k++){
      //If the user stops the sort than return ASAP
      if (sortStop == true) {array.stopSort(); return}
      //The current bar is swapped if the right bar is bigger
      await visual.comparison(k, k + 1);
      if (arr[k].height > arr[k+1].height) {
        await visual.swap(k, k + 1); 
      }
    }
  }

  //Once the array is sorted the results are checked to ensure accuracy
  visual.check();
}