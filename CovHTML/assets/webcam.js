let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/aPSpyFikQ/model.json';
// let imageModelURL = 'model/model.json';
let video;
let flippedVideo;
let label = "";
let label2 = "";


function preload() {
    classifier = ml5.imageClassifier(imageModelURL);
}

function setup() {
    var cnv = createCanvas(320,280);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 4;
    cnv.position(x, y);
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();

    flippedVideo = ml5.flipImage(cnv)
    classifyVideo();
}

function draw() {
    background(0);
    image(flippedVideo, 0, 0);
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text("Position your face close to the camera.", width / 2, height - 23.5);
    text("Results may flicker.", width / 2, height - 3.5);
}

function classifyVideo() {
    flippedVideo = ml5.flipImage(video);
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();
}

function gotResult(error, results) {
    if (error) {
        return;
    }
    console.log(results[0]);
    label = results[0].label;
    label2 = Math.ceil(results[0].confidence * 100) + "%"
    if (Number.isInteger(label)) {
        classifyVideo();
    }

    document.getElementById("diagl").innerHTML = label;
    if (label != "On") {
        document.getElementById("rem").innerHTML = "Wear your mask!";
        document.getElementById("rem").style="color:red"
    } else {
        document.getElementById("rem").innerHTML = "Good job!";
        document.getElementById("rem").style="color:green"
    }
    document.getElementById("diagp").innerHTML = label2;
    classifyVideo();

}