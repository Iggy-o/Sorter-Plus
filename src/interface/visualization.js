//These are the functions frequently called on in the sorting algorithms
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function comparison(a, b){
  comparisons += 1
  arr[a].color = "purple";
  arr[b].color = "purple";
  await sleep(speed);
  arr[a].color = "black";
  arr[b].color = "black";
}
async function swap(a, b){
  swaps += 1
  arr[a].color = "green";
  arr[b].color = "red";
  await sleep(speed/2);
  let temp = arr[a];
  arr[a]= arr[b];
  arr[b]= temp;
  await sleep(speed/2)
  arr[a].color = "black";
  arr[b].color = "black";
}
let pauseTime = 1000;
async function check() {
  await sleep(pauseTime);
  let prev = arr[0].height
  for (let i = 0; i < arr.length; i++){
    if (arr[i].height >= prev){
      arr[i].color = "green";
      prev = arr[i].height
      await sleep(speed/arrlength);
      arr[i].color = "black";
    }
    else{
      arr[i].color = "red"
    }
  }
  audio.volume = 0.1;
  sortedSound.play()
  sortedSound.addEventListener("ended", function(){
     audio.volume = 0.5;
  });
  inputReady = true;
  button.innerHTML = "START";
}