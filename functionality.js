let oscillator, isPlaying, pixelRatio, sizeOnScreen, segmentWidth;
const canvas = document.getElementById("canvas"),
  c = canvas.getContext("2d"),
  ac = new AudioContext(),
  powerBtn = document.getElementById("on-off"),
  oscType = document.getElementById("osc-type"),
  freqSlider = document.getElementById("frequency"),
  gainSlider = document.getElementById("gain"),
  gainNode = new GainNode(ac, {
    gain: 0.5
  }),
  analyser = new AnalyserNode(ac, {
    smoothingTimeConstant: 1,
    fftSize: 2048
  }),
  dataArray = new Uint8Array(analyser.frequencyBinCount);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
pixelRatio = window.devicePixelRatio;
sizeOnScreen = canvas.getBoundingClientRect();
canvas.width = sizeOnScreen.width * pixelRatio;
canvas.height = sizeOnScreen.height * pixelRatio;
canvas.style.width = canvas.width / pixelRatio + "px";
canvas.style.height = canvas.height / pixelRatio + "px";
c.fillStyle = "#181818";
c.fillRect(0, 0, canvas.width, canvas.height);
c.strokeStyle = "#33ee55";
c.beginPath();
//c.moveTo(0, canvas.height / 2);
//c.lineTo(canvas.width, canvas.height / 2);
//c.stroke();

//drawing grid lines
for (x = 0; x <= canvas.width; x += 30) 
{
  for (y = 0; y <= canvas.height; y += 30) 
  {
    //draw vertical lines
    c.moveTo(x, 0);
    c.lineTo(x, canvas.height);
    
    //draw horizontal lines
    c.moveTo(0, y);
    c.lineTo(canvas.width, y);
    
    //grid line color settings
    c.strokeStyle = "#5f5f5f";
    c.stroke();
  }
}

powerBtn.addEventListener("click", () => {
  if (isPlaying) {
    if (oscillator) oscillator.stop();
    powerBtn.innerHTML = "Turn On";
  } else {
    oscillator = new OscillatorNode(ac, {
      // need to figure out how to feed the value here
      type: oscType.value,
      frequency: freqSlider.value
    });
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

const draw = () => {
  analyser.getByteTimeDomainData(dataArray);
  segmentWidth = canvas.width / analyser.frequencyBinCount;
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.beginPath();
  c.moveTo(-100, canvas.height / 2);
  if (isPlaying) {
    for (let i = 1; i < analyser.frequencyBinCount; i += 1) {
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

var randomBinary = require('random-binary');
const { performance } = require('perf_hooks');
const { systemPreferences } = require('electron');
// randomBinary(4); or 8 or 16 bits to generate different binary number 
// with different number of bits

mode = false; // true for continuous, false for "run once" mode
// need to config how to tie it to the button

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