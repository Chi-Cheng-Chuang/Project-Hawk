let oscillator, isPlaying, pixelRatio, sizeOnScreen, segmentWidth;

// 
const canvas = document.getElementById("canvas"), // 
  // not sure what this does
  c = canvas.getContext("2d"),
  // for audio, ideally we will remove it
  ac = new AudioContext(),
  // buttons and sliders stuff
  powerBtn = document.getElementById("on-off"),
  oscType = document.getElementById("osc-type"),
  freqSlider = document.getElementById("frequency"),
  gainSlider = document.getElementById("gain"),
  // sounds like this has to deal with sound, most likely needs to be removed
  gainNode = new GainNode(ac, { gain: 0.5 }), // sets up initial value for gain
  analyser = new AnalyserNode(ac, {
    smoothingTimeConstant: 1, // will play with those variables
    fftSize: 2048
  }),
  // !!!!!
  // array which might store the data for graph
  dataArray = new Uint8Array(analyser.frequencyBinCount);
  console.log(dataArray);

// definition for window size where the wave is displayed
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// not sure what this does
pixelRatio = window.devicePixelRatio;
// most likely works by adapting to the size of the window
sizeOnScreen = canvas.getBoundingClientRect();
// not sure what this does
canvas.width = sizeOnScreen.width * pixelRatio;
canvas.height = sizeOnScreen.height * pixelRatio;
// not sure what this does 
canvas.style.width = canvas.width / pixelRatio + "px";
canvas.style.height = canvas.height / pixelRatio + "px";
c.fillStyle = "#181818"; // most likely color definiton for background
c.fillRect(0, 0, canvas.width, canvas.height);
c.strokeStyle = "#33ee55"; // color for the wave?
c.beginPath(); // what does this do?
// c.moveTo(0, canvas.height / 2); // ?
// c.lineTo(canvas.width, canvas.height / 2); // ?
// c.stroke(); // ?

// turn on/off button functionaliy
// sets up a trigger for button click
powerBtn.addEventListener("click", () => {
  // if is playing == true
  if (isPlaying) {
    // if button taps when it is on, it turns off
    // by stopping the oscillator functionality
    if (oscillator) oscillator.stop();
    // then power button displays "Turn On"
    powerBtn.innerHTML = "Turn On";
  } else {
    // oscillator instantiation
    oscillator = new OscillatorNode(ac, {
      // need to figure out how to feed the value here
      type: oscType.value,
      frequency: freqSlider.value
    });
    // 
    oscillator.connect(gainNode);
    gainNode.connect(analyser);
    analyser.connect(ac.destination);
    oscillator.start();
    draw();
    powerBtn.innerHTML = "Turn Off";
  }
  document.getElementById("led").classList.toggle("on");
  isPlaying = !isPlaying;
});

freqSlider.addEventListener("input", (event) => {
  let freq = event.target.value;
  document.getElementById("frequencyValue").innerHTML = freq;
  if (oscillator && isPlaying) {
    oscillator.frequency.value = freq;
  }
});

oscType.addEventListener("change", (event) => {
  if (oscillator && isPlaying) {
    oscillator.type = event.target.value;
  }
});

gainSlider.addEventListener("input", (event) => {
  let gain = event.target.value;
  document.getElementById("gainValue").innerHTML = gain;
  if (oscillator && isPlaying) {
    gainNode.gain.value = gain;
  }
});

// draw function
const draw = () => {
  analyser.getByteTimeDomainData(dataArray);
  segmentWidth = canvas.width / analyser.frequencyBinCount;
  
  // Clear the canvas and draw a white grid
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.strokeStyle = "#414141";
  
  // changing number of lines makes smaller squares
  const numLines = 40; 
  const lineHeight = canvas.height / numLines;
  
  // Draw Horizontal lines
  for (let i = 0; i < canvas.height; i++) 
  {
    
    c.beginPath();
    c.moveTo(0, i * lineHeight);
    c.lineTo(canvas.width, i * lineHeight);
    c.stroke();
  }

  // Draw Vertical lines
  for(let i = 0; i < canvas.width; i++)  
  {
    c.beginPath();
    c.moveTo(i * lineHeight, 0);
    c.lineTo(i * lineHeight, canvas.height);
    c.stroke();
  }
  
  // Draw the waveform
  c.strokeStyle = "#33ee55";
  c.beginPath();
  c.moveTo(-100, canvas.height / 2);
  if (isPlaying) 
  {
    for (let i = 1; i < analyser.frequencyBinCount; i += 1) 
    {
      let x = i * segmentWidth;
      let v = dataArray[i] / 128.0;
      let y = (v * canvas.height) / 2;
      c.lineTo(x, y);
    }
  }
  c.lineTo(canvas.width + 100, canvas.height / 2);
  c.stroke();
  
  requestAnimationFrame(draw);
};

const fs = require('fs');
fs.writeFile('datafile.txt', dataArray.join('\n'), function (err) {
  if (err) throw err;
  console.log('Elements written to file');
});

// Below the code makes sense, above requires explanation in reverse engineering
var randomBinary = require('random-binary');
const { performance } = require('perf_hooks');
const { systemPreferences } = require('electron');
// randomBinary(4); or 8 or 16 bits to generate different binary number 
// with different number of bits

mode = false; // true for continuous, false for "run once" mode
// need to tie it to the button

// everything below does not need reverse engineering

var array = [];
for (let j = 0; j < 100; j++) { // for loop to populate the array to simulate the data block
  array.push(parseInt(randomBinary(12), 2)); // 12 bit binary value
}

function FrequencyInputGainTests() { // doesnt work as intended, needs to be redone 
  // testing gradual increase/decrease for frequency only 
  var myString = "Freq Tests";
  var myText = document.getElementById("myText");
  myText.textContent = myString;
  sleep(function() {}, 1000); 

  // testing gradual increase/decrease for input gain only, frequency remains constant
  var myString = "Input Gain Tests";
  var myText = document.getElementById("myText");
  myText.textContent = myString;
  sleep(function() {}, 1000); 

  // testing gradual increase/decrease for freq and input gain simultaneously
  var myString = "Input & Freq Tests";
  var myText = document.getElementById("myText");
  myText.textContent = myString;
  sleep(function() {}, 1000); 

  // testing inverse increase/decrease for freq and input gain simulatenously
  var myString = "Input & Freq Inv Tests";
  var myText = document.getElementById("myText");
  myText.textContent = myString;
  sleep(function() {}, 1000); 

  // instantaneous change for frequency only
  var myString = "Freq Instantaneous Tests";
  var myText = document.getElementById("myText");
  myText.textContent = myString;
  sleep(function() {}, 1000); 

  // instantaneous change for input gain only
  var myString = "Gain Instantaneous Tests";
  var myText = document.getElementById("myText");
  myText.textContent = myString;
  sleep(function() {}, 1000); 

  // instantaneous change for both frequency and input gain
  // var myText = document.getElementById("myText");
  // myText.textContent = myString;
}

