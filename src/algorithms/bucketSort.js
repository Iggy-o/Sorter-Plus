async function bucketSort() {
  let digitSize = 100;
  let pos = 0;
  for(let currentDigit = 0; currentDigit < 10; currentDigit++) {
    if (pos == arr.length) break;
    for(let array = 0; array < arr.length; array++) {
      //The bars are swapped into a digit based formation
      await comparison(array, pos);
      if (arr[array].height > max && digitSize == 1) max = arr[array].height;
      if (Math.floor(arr[array].height%(digitSize*10)/digitSize) == currentDigit) {
        if (array != pos) { 
          await swap(array, pos);
          //After a swap the previous formation must be fixed
          for (let inc = ++pos; inc < array; inc++) {
            await swap(array, inc);
          }
        }
        else {
          pos++;
        }
      }
    }
  }

  //Once the buckets have been made, I can run insertion sort to finish sorting each bucket
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