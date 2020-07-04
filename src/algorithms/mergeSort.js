/*
Merge Sort
--------------

Merge Sort splits up the list of items into smaller lists,
those lists are sorted and merged into a larger list,
that larger list is sorted and merged into and even larger list,
until all the items in the array have been sorted
*/

async function mergeSort() {
  //This function is called recursively with smaller and smaller ranges of bars
  await mergeSorting(0, arr.length - 1)
  //If the user stops the sort than return ASAP
  if (sortStop == true) {array.stopSort(); return}
  async function mergeSorting(start, end) {
    //If the user stops the sort than return ASAP
    if (sortStop == true) return
    //If the range of bars is greater than 1 continue
    if(start < end) {
      //The array is split into two halves which are sorted
      await visual.comparison(start, end);
      let mid = Math.floor((start + end)/2);
      await mergeSorting(start, mid);
      await mergeSorting(mid + 1, end);
      //The two sorted halves are merged into one bigger array
      await merge(start, mid, end);
      async function merge(start, mid, end) {
        //If the user stops the sort than return ASAP
        if (sortStop == true) return
        //Each bar from the first half is compared
        //with the associated bar from the second half
        for (let i = start; i < mid + 1; i++) {
          //If the bar from the first half is smaller than the
          //associated bar from the second half, they are swapped
          await visual.comparison(i, mid + 1);
          if (arr[i].height > arr[mid + 1].height) {
            await visual.swap(i, mid + 1);
            //After the two bars are swapped
            //The second half must be reorganized
            for (let j = mid + 1; j < end; j++) {
              await visual.comparison(j, j + 1)
              if (arr[j].height > arr[j + 1].height) {
                await visual.swap(j, j + 1);
              }
              else break;
            }
          }
        }
      }
    }
  }
  
  //Once the array is sorted the results are checked to ensure accuracy
  visual.check();
}