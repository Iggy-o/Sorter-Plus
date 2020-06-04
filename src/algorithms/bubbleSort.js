async function bubbleSort() {
  for (let j = 0; j < arr.length; j++) {
    for(let k = 0; k < arr.length - 1 - j; k++){
      await comparison(k, k + 1);
      if (arr[k].height > arr[k+1].height) {
        await swap(k, k + 1); 
      }
    }
  }
  check();
}