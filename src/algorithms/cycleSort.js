//Decommissioned
async function cycleSort() {
  //
  visited = [];
  visited.length = arr.length
  visited.fill(0)
  //console.log(visited)
  let i = 0
  while (visited.includes(0)) {
    console.log(visited.includes(0))
    if (i > arr.length) {
      newSpot = visited.indexOf(0)
      //console.log(newSpot);
      i = newSpot;
    }
    let barValue = arr[i].height;
    let biggerNums = 0;
    let equals = [];
    if (visited[i] != 1) {
      for (let j = 0; j < arr.length; j++) {
        if (j != i) {
          await comparison(j, i)
          if (barValue > arr[j].height) biggerNums++;
          if (barValue == arr[j].height) {
            //console.log("equal?")
            equals.push(j);
          }
        }
      }
      if (equals != 0) {
        await swap(i, biggerNums);
        for (let k = 0; k < equals.length; k++) {
          await swap(equals[k], biggerNums + k);
          visited[biggerNums + k] = 1;
        }
        i = biggerNums + equals.length + 1;
      }
      else{
        visited[biggerNums] = 1;
        if (i == biggerNums) break;
        await swap(i, biggerNums);
      }
    }
    else i++;
  }

  check();
}