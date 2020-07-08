//The following class holds the functions for the visuals
class visual {
  //The array's bars are drawn
  constructor() {
    //Wipe the canvas clean after each drawing
    background("white");
    //Set the width of the bars
    let barWidth = windowWidth/arr.length;
    //Initialize the x position and the bar color gradient to 0
    let xpos = 0;
    let color = 0;
    //Loop through the bar array and draw the bars and the stats
    for(let i = 0; i < arr.length; i++){
      //The current array object is stored in this variable "p"
      let p = arr[i];
      //If the color is black, then add a gradient to it
      if (!(["red", "green", "purple"].includes(p.color))) p.color = (color += 200/arr.length);
      fill(p.color)
      //Using the bar's color, draw its rectangle, and shift futue bars over
      rect(xpos, window.innerHeight - p.height, barWidth, p.height);
      xpos += barWidth;
      if (i === 0) {
        //Set the color to black and the alignment to centered
        fill("black"); textAlign(CENTER);
        //Draw the stats text with the above qualities
        text(`Array Accesses: ${swaps} | Comparisons: ${comparisons}`, windowWidth/2, windowHeight*0.05);
      }
    }
  }
  //Two bars are visually compared
  static async comparison(a, b){
    //Incrtement the comparisons stat by 1
    comparisons++;
    //Set the two compared bars to purple
    arr[a].color = arr[b].color = "purple";
    //Wait a few milliseconds
    await visual.sleep(speed);
    //Contiue by reseting them to black
    arr[a].color = arr[b].color = "black";
  }
  //Two bars are visually swapped
  static async swap(a, b){
    //Increment the swaps stat by 1
    swaps++;
    //Set the two bars to red and green respectively
    arr[a].color = "green";
    arr[b].color = "red";
    //Wait a few milliseconds
    await visual.sleep(speed/2);
    //Swap the bars (their heights and colors)
    let temp = arr[a];
    arr[a]= arr[b];
    arr[b]= temp;
    //Wait a few more milliseconds
    await visual.sleep(speed/2);
    //Finally return the bars to black
    arr[a].color = arr[b].color = "black";
  }
  //The "sorted" array is checked for errors
  static async check() {
    //Wait 1.5 seconds before the check begins
    await visual.sleep(1000);
    //Store the previously checked bar in this variable
    let prev = arr[0].height
    //Loop through and check for any bars that are not in order
    for (let i = 0; i < arr.length; i++){
      if (arr[i].height >= prev){
        //If the two bars are in order color them green
        arr[i].color = "green";
        //Set the previous variable to the current bar
        prev = arr[i].height
        await visual.sleep(speed/arr.length);
        //Reset their colors to black after a few milliseconds
        arr[i].color = "black";
      }
      //If the bars are not in order set them permanently to red
      else arr[i].color = "red";
    }
    //When the sort is completed these must be completed
    visual.sortCompleted();
  }
  //When the sort is completed a sound is played and user input is allowed
  static sortCompleted() {
    //When the sorting is complete play a sort completed sound
    audio.volume = 0.1;
    sortedSound.play()
    sortedSound.addEventListener("ended", () => audio.volume = 0.5);
    //Allow the user to start a new sort
    inputReady = true;
    button.innerHTML = "START";
  }
  //This function allows me to pause the program for said amount of seconds
  static sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}