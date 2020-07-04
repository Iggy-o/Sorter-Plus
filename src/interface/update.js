//Using p5 setup function, I create a canvas to draw on
setup = () => createCanvas(window.innerWidth, window.innerHeight);

//p5.js allows me to call everything inside this function 
//from the p5 library once every frame
draw = () => new visual;

//Using the p5 resize function, i can resize my canvas
windowResized = () => resizeCanvas(windowWidth, windowHeight*0.90);