/*
Ighoise Odigie
June 1, 2020
#Made Within a Week
Youtube: https://www.youtube.com/channel/UCud4cJjtCjEwKpynPz-nNaQ?
Github: https://github.com/Iggy-o
Preview: https://repl.it/@IghoiseO/Sorter-Plus#script.js
*/

//Using Proceesing JS, I create and update a canvas the size of the screen with the bars
let isStopped = false;
//
function setup(){
  noStroke();
  createCanvas(window.innerWidth, window.innerHeight);
  sortedSound = document.getElementById("sorted");
  sortedSound.volume = 0.25
}

//
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  barWidth = windowWidth/arrlength;
  compensate = window.innerHeight*0.1;
  minHeight = 50 * (window.innerHeight/1000);
}

//
function draw(){
  speed = document.getElementById("myRange").value;
  background("white");
  let x = 0;
  let color = 0;
  for(let i = 0; i < arr.length; i++){
    let p = arr[i];
    if ((p.color) != "green" && (p.color) != "red" && (p.color) != "purple"){
      p.color = (color += 200/arrlength);
    }
    fill(p.color);
    rect(x, windowHeight - p.height - 35, barWidth, p.height);
    x += barWidth;
    fill("black");
    textAlign(CENTER)
    textSize(windowHeight*0.025)
    text(`Swaps: ${swaps} | Comparisons: ${comparisons}`, windowWidth/2, windowHeight*0.05)
  }
  if (sortStart == true){
    modes[mode]();
    sortStart = false;
  }
}