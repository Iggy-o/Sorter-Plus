//May have speed issue
async function quickSort() {
  await quickSorting(0, arr.length - 1)
  async function quickSorting(start, end) {
    if (start >= end) {
      return
    }
    await comparison(start, end);
    let index = await partition(start, end)
    await quickSorting(start, index - 1)
    await quickSorting(index + 1, end)
    async function partition(start, end){
      let pivotIndex = start
      let pivot = arr[end].height
      for (let i = start; i < end; i++){
        await comparison(i, pivotIndex);
        if (arr[i].height < pivot){
          await swap(i, pivotIndex)
          pivotIndex += 1
        }
      }
      await swap(pivotIndex, end)
      return pivotIndex
    }
  }
  check();
}