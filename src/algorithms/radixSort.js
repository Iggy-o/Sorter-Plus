/*
Radix Sort
--------------

Radix Sort uses place values to effectively sort a list of items,
it goes through a place value and orders the list of items from 1-9.
The order of the last place value is maintained and the array is 
reordered based on the next place value until the array if fully sorted
*/

async function radixSort() {
  //The max height is initialized as 1 but as the program runs the real max height is found
  let max = 1
  //Each place value is looped through and the bars are placed in the appropriate section (1-9)
  for (let placeValue = 1; placeValue <= max; placeValue*=10) {
    let pos = 0;
    //Each digit (1-9) is looped through
    for (let currentDigit = 0; currentDigit < 10; currentDigit++) {
      //If the all bars are sorted than break
      if (pos == arr.length) break;
      //The array is searched for bars matching the current digit
      for (let i = 0; i < arr.length; i++) {
        //If the user stops the sort than return ASAP
        if (isStopped == true) {stopSort(); return}
        //As the array is looped through the max height is 
        //saved for later use 
        if (arr[i].height > max && placeValue == 1 && currentDigit == 0) max = arr[i].height;
        //If the bar matches the current digit it is put at the end
        //of its digit's heap
        await comparison(i, pos);
        if (Math.floor(arr[i].height%(placeValue*10)/placeValue) == currentDigit) {
          if (i != pos) { 
            await swap(i, pos);
            //After a swap the previous formation must be maintained
            for (let inc = ++pos; inc < i; inc++) {
              await swap(i, inc);
            }
          }
          else pos++;
        }
      }
    }
  }

  //Once the array is sorted the results are checked to ensure accuracy
  check();
}