async function insertionSort() {
  for (let j = 0; j < arr.length - 1; j++) {
    for (let k = j; k >= 0; k--){
      await comparison(k, k + 1);
      if (arr[k + 1].height < arr[k].height){
        await swap(k + 1, k)
      }else{
        break
      }
    }
  }
  check();
}