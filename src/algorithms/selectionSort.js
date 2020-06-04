async function selectionSort() {
  for (let j = 0; j < arr.length; j++) {
    max = arr[0].height
    maxPos = 0
    for(let k = 1; k < arr.length - j; k++){
      await comparison(k, maxPos);
      if (arr[k].height > max) {
        max = arr[k].height
        maxPos = k
      }
    }
    await swap(maxPos, arr.length-j-1)
  }
  check();
}