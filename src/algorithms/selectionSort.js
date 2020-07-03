/*
Selection Sort
--------------

Selection Sort is one of the simplest methods of sorting, 
you pick the largest item and move it to the end of the array 
and repeat until sorted
*/

async function selectionSort() {
  //The entire array is looped through and the largest item is moved to the end each time
  for (let j = 0; j < arr.length; j++) {
    //The max value and max value's position are saved for reference
    max = arr[0].height 
    maxPos = 0
    //The array is looped through in search of the largest value
    for(let k = 1; k < arr.length - j; k++){
      //If the user stops the sort than return ASAP
      if (isStopped == true) {stopSort(); return}
      //Each value is compared to max value and if they are greater, the max is chenged to its value
      await comparison(k, maxPos);
      if (arr[k].height > max) {
        max = arr[k].height
        maxPos = k
      }
    }
    //At this point the max value has been located and its position is swapped to the end
    await swap(maxPos, arr.length-j-1)
  }

  //Once the array is sorted the results are checked to ensure accuracy
  check();
}