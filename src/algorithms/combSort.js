/*
Comb Sort
--------------

Two items are swapped if they are in the wrong order.
However, the distance between the items starts off as 
the arrays length (First & Last) and that distance is 
shrunk each iteration until it is 1 and the array should 
be sorted
*/

async function combSort() {
  //The bar gap begins at the array's length and is decreased by 1
  //each time
  for (let gap = arr.length - 1; gap > 0; gap--) {
    //The bars are checked until the second bar value is invalid
    for (let i = 0; i + gap < arr.length; i++) {
      //If the user stops the sort than return ASAP
      if (isStopped == true) {stopSort(); return}
      //If the first bar is smaller than the second, they are swapped
      await comparison(i, i + gap)
      if (arr[i].height > arr[i + gap].height) {
        await swap(i, i + gap)
      }
    }
  }
  
  //Once the array is sorted the results are checked to ensure accuracy
  check();
}