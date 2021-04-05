let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/aPSpyFikQ/model.json';
// let imageModelURL = 'https://api.github.com/repos/PratyushKore/MaskDetect/contents/ml5/'
let video;
let flippedVideo;
let label = "";
let label2 = "";

function preload() {
    classifier = ml5.imageClassifier(imageModelURL);
}

function setup() {
    var cnv = createCanvas(320, 280);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 4;
    cnv.position(x, y);
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();

    flippedVideo = ml5.flipImage(video)
    classifyVideo();
}

function draw() {
    background(0);
    image(flippedVideo, 0, 0);
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2, height - 20);
    text(label2, width / 2, height - 4);
}

function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
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

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}