async function combSort() {
  for (let gap = arr.length - 1; gap > 0; gap--) {
    for (let i = 0; i + gap < arr.length; i++) {
      await comparison(i, i + gap)
      if (arr[i].height > arr[i + gap].height) {
        await swap(i, i + gap)
      }
    }
  }
  check();
}