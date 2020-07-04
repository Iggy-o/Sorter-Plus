/*
Insertion Sort
--------------

Starting from the left side of the array, moving left to right,
each new item is inserted into the sorted left bounded heap and
the order is maintained by putting the new item in its appropriate
position
*/

async function insertionSort() {
  //Each bar in the array is selected moving from left to right
  for (let j = 0; j < arr.length - 1; j++) {
    //The current bar is checked with every neighbour to the left
    for (let k = j; k >= 0; k--){
      //If the user stops the sort than return ASAP
      if (sortStop == true) {array.stopSort(); return}
      //If the bar is smaller than its left neighbour, than it is swapped
      await visual.comparison(k, k + 1);
      if (arr[k + 1].height < arr[k].height){
        await visual.swap(k + 1, k)
      //Otherwise, the positioning process is complete
      }else{
        break
      }
    }
  }

  //Once the array is sorted the results are checked to ensure accuracy
  visual.check();
}