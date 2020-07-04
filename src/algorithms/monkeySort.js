/*
Monkey Sort
--------------

Monkey Sort is the worst method of sorting,
it is the process of randomly picking two items
and swapping them until all the elements are sorted
*/

async function monkeySort() {
  //This variable determines whether to continue swapping bars
  let isNotDone = true;
  //While the array is not sorted the swapping continues
  while(isNotDone){
    //If it is not yet sorted two random bars are selected to be swapped
    let num1 = Math.round(Math.random()*(arr.length-1))
    let num2 = Math.round(Math.random()*(arr.length-1))
    //If the bars are the same, the second bar is changed
    if(num1 == num2){
      if(num2 >= Math.round(arr.length/2)) num2--
      else num2++
    }
    //The two random bars are ready to be swapped
    await visual.swap(num1, num2);
    //If the array is sorted, the swapping can be discontinued
    //The previous bar is saved for reference
    let prev = arr[0].height;
    //isNotDone is temporarily false unless the array is not sorted 
    //in that case it is set back to true
    isNotDone = false;
    //Every bar in the array is checked
    for (let b = 1; b < arr.length; b++){
      //If the user stops the sort than return ASAP
      if (sortStop == true) {array.stopSort(); return}
      //If two bars are not in correct order, isNotDone remains true
      if (arr[b].height < prev){isNotDone = true; break;}
      //The previous bar is changed to the current bar
      prev = arr[b].height;
    }
  }

  //Once the array is sorted the results are checked to ensure accuracy
  visual.check();
}
