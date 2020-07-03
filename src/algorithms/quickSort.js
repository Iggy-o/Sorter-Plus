/*
Quick Sort
--------------

The list of items are split by a pivot, a randomly chosen value
which all smaller values are placed to the left of and all larger values are placed to the right. After this partitioning has been done, the list is split into two groups, items to the left of the partition and items to the right. Each group is sorted using the same method noted above until the entire array is sorted
*/

async function quickSort() {
  await quickSorting(0, arr.length - 1);
  //If the user stops the sort than return ASAP
  if (isStopped == true) {stopSort(); return}
  //This function sorts the array recursively
  async function quickSorting(start, end) {
    //If the user stops the sort than return ASAP
    if (isStopped == true) return
    //If the start is smaller or equal to the end continue
    if (start < end) {
      await comparison(start, end);
      //The index is set to the returned value from sortByPivot
      let pivotIndex = await sortByPivot(start, end);
      async function sortByPivot(start, end) {
        //The pivot's position and its value are saved for later
        let pivotIndex = start;
        let pivotPos = start;
        let pivot = arr[start].height;
        //The array is checked for any bars smaller than the pivot
        for (let i = start; i <= end; i++) {
          //If the user stops the sort than return ASAP
          if (isStopped == true) return
          //If i is smaller than the pivot, swap them
          await comparison(i, pivotIndex);
          if (arr[i].height < pivot) {
            await swap(i, pivotIndex);
            //The pivots position is tracked with pivotPos
            if (pivotIndex == pivotPos) {
              pivotPos = i;
            }
            //The index where the pivot should be is tracked
            pivotIndex++;
          }
        }
        //The pivot is swapped to the end and its position is returned
        await swap(pivotIndex, pivotPos);
        return pivotIndex;
      }
      //The array is split into two and the process is repeated
      await quickSorting(start, pivotIndex);
      await quickSorting(pivotIndex + 1, end);
    }
  }
  
  //Once the array is sorted the results are checked to ensure accuracy
  check();
}