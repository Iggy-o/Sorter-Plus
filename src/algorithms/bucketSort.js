/*
Bucket Sort
--------------

The items are sorted by their greatest placevalue digit 
(ex. 100s or 1000s) and this semi-sorted array is then 
sorted using any other sorting algorithm, in this case a
modified insertion sort is used
*/

async function bucketSort() {
  let digitSize = 100;
  let pos = 0;
  //The digits (1 - 9) are looped through
  for(let currentDigit = 0; currentDigit < 10; currentDigit++) {
    //If the all bars are sorted than break
    if (pos == arr.length) break;
    //The array is searched for bars matching the current digit
    for(let i = 0; i < arr.length; i++) {
      //If the user stops the sort than return ASAP
      if (sortStop == true) {array.stopSort(); return}
      //If the bar matches the current digit it is put at the end
      //of its digit's heap
      await visual.comparison(i, pos);
      if (Math.floor(arr[i].height%(digitSize*10)/digitSize) == currentDigit) {
        if (i != pos) { 
          await visual.swap(i, pos);
          //After a swap the previous formation must be maintained
          for (let inc = ++pos; inc < i; inc++) {
            await visual.swap(i, inc);
          }
        }
        else pos++;
      }
    }
  }

  //Once the buckets have been made, I can run insertion sort to finish sorting each bucket
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