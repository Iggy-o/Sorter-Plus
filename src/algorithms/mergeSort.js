//Merge Broken
//Has speed issues
async function mergeSort() {
  await mergeSorting(0, arr.length + 1)
  async function mergeSorting(start, end) {
    if(start < end) {
      if(end < arr.length) {
        await comparison(start, end);
      }
      mid = Math.floor((start + end)/2)
      await mergeSorting(start, mid)
      await mergeSorting(mid + 1, end)
      await merge(start, mid)
      async function merge(start, mid) {
        for (let i = start; i < mid; i++) {
          for (let j = start; j < mid; j++) {
            await comparison(start + (j - start), mid + (i - mid));
            if (arr[start + (j - start)].height > arr[mid + (i - mid)].height){
              await swap(start + (j - start), mid + (i - mid))
            }
          }
        }
      }
    }
  }
  check();
}