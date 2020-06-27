async function mergeSort() {
  await mergeSorting(0, arr.length - 1)
  async function mergeSorting(start, end) {
    if(start < end) {
      await comparison(start, end);
      let mid = Math.floor((start + end)/2);
      await mergeSorting(start, mid);
      await mergeSorting(mid + 1, end);
      await merge(start, mid, end);
      async function merge(start, mid, end) {
        for (let i = start; i < mid + 1; i++) {
          await comparison(i, mid + 1);
          if (arr[i].height > arr[mid + 1].height) {
            await swap(i, mid + 1);
            for (let j = mid + 1; j < end; j++) {
              await comparison(j, j + 1)
              if (arr[j].height > arr[j + 1].height) {
                await swap(j, j + 1);
              }
              else break;
            }
          }
        }
      }
    }
  }
  check();
}