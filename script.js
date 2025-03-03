// This project is an experimental narrative exploring city lights.

// Global variables
let img;
let brightness = 50; // Default low brightness
let recognition;

// // Narrative object to hold experimental narrative text
let narrative = {
    lines: [
        "City image brightens as you say ON.",
        "Sound pulses through digital streets.",
        "An experimental narrative begins."
    ],
    currentLine: 0
};

function preload() {
    // User-supplied image
    img = loadImage('istockphoto-1405004417-2048x2048.jpg');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    startSpeechRecognition();
}

function draw() {
    background(0);
    tint(255, brightness); // Apply fading effect based on brightness
    image(img, 0, 0, width, height);

    // Display narrative text using a loop
    textSize(24);
    textAlign(LEFT, TOP);
    let y = 20;
    for (let i = 0; i < narrative.lines.length; i++) {
        // Highlight the current narrative line using a conditional
        if (i === narrative.currentLine) {
            fill(255, 100, 100);
        } else {
            fill(255);
        }
        text(narrative.lines[i], 20, y);
        y += 30;
    }
}

function startSpeechRecognition() {
    // Check for speech recognition support
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = function (event) {
            let transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
            console.log('Recognized:', transcript);

            // Use conditionals to adjust brightness based on spoken commands
            if (transcript === "on") {
                brightness = 255; // Max brightness
            } else if (transcript === "off") {
                brightness = 50; // Low brightness
            }
        };

        recognition.onerror = function (event) {
            console.error('Speech Recognition Error:', event.error);
        };

        recognition.start();
    } else {
        console.warn('Speech Recognition not supported in this browser');
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Event: keyPressed to cycle through narrative text
function keyPressed() {
    // When the 'n' key is pressed, move to the next narrative line
    if (key === 'n' || key === 'N') {
        narrative.currentLine = (narrative.currentLine + 1) % narrative.lines.length;
        console.log("Narrative updated:", narrative.lines[narrative.currentLine]);
    }
}
