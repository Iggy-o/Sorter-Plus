async function radixSort() {
  //The max height is initialized as 1 but as the program runs the real max height is found
  let max = 1

  //Each placevalue is looped through and the bars are placed in the appropriate section
  for (let placeValue = 1; placeValue <= max; placeValue*=10) {
    let pos = 0;
    for (let currentDigit = 0; currentDigit < 10; currentDigit++) {
      if (pos == arr.length) break;
      for (let i = 0; i < arr.length; i++) {
        //The bars are swapped into a digit based formation
        await comparison(i, pos);
        if (arr[i].height > max && placeValue == 1) max = arr[i].height;
        if (Math.floor(arr[i].height%(placeValue*10)/placeValue) == currentDigit) {
          if (i != pos) { 
            await swap(i, pos);
            //After a swap the previous formation must be fixed
            for (let inc = ++pos; inc < i; inc++) {
              await swap(i, inc);
            }
          }
          else {
            pos++;
          }
        }
      }
    }
  }

  check();
}