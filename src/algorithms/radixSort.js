//Major Issues Decomissioned
async function radixSort() {
  let max = arr[0].height
  let maxPos = 0
  for(let k = 1; k < arr.length; k++){
    await comparison(k, maxPos);
    if (arr[k].height > max) {
      max = arr[k].height
      maxPos = k
    }
  }
  for (let value = 1; value <= max; value*=10) {
    let countArr = []
    let auxArr = []
    let digit;
    for (let i = 0; i < 10; i++) {
      countArr[i] = 0
    }
    for (let i = 0; i <= arr.length-1; i++) {
      digit = await simplify(arr[i].height, value)
      countArr[digit] = countArr[digit] + 1
      //console.log(arr[i].height)
    }
    //console.log(countArr)
    countArr[0]--
    for (let i = 1; i < 10; i++) {
      countArr[i]+=countArr[i-1]
    }
    //console.log(countArr)
    for (let i = arr.length - 1; i >= 0; i--) {
      digit = await simplify(arr[i].height, value)
      auxArr[i] = countArr[digit]      
      countArr[digit] = countArr[digit] - 1
    }
    //console.log('aux', auxArr)

    let i = 0;
    let last = arr.length - 1 
    while (i < arr.length + 1) {
      if (auxArr[last] != last) {
        await swap(auxArr[last], last)
        temp = auxArr[last]
        auxArr[last] = auxArr[auxArr[last]]
        auxArr[auxArr[last]] = temp
        i++
      }
      else {
        console.log("down")
        last--
      }
    }
  }
  function simplify(number, value) {
    return Math.floor(number%(value*10)/value)
  }
  check();
}