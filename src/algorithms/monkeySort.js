async function monkeySort() {
  let i = 0
  while(i<1){
   let num1 = Math.round(Math.random()*(arr.length-1))
   let num2 = Math.round(Math.random()*(arr.length-1))
   if(num1 == num2){
     if (num2 > Math.round(arr.length/2)){
       num2--
     }
     else{
       num2++
     }
   }
   await swap(num1, num2)
   let prev = arr[0].height
   let dobreak = true
   for (let b = 1; b<arr.length;b++){
     if (arr[b].height < prev){
        dobreak = false
     }
     prev = arr[b].height
   }
   if (dobreak == true){
     i = 1
   }
  }
  check();
}
