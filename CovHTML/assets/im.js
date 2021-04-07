let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/aPSpyFikQ/model.json';
// let imageModelURL = 'modeljson/model.json'
let img;
let label = "";
let label2 = "";

window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            // var img = document.querySelector('img'); 
            var img = document.getElementById("imm");
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
            img.onload = imageIsLoaded;
        }
    });
});

function imageIsLoaded() {
    document.getElementById("sb").innerHTML = "Now press the submit button below!";
}

function mainpred() {
    document.getElementById("sb").innerHTML = "Wait a few seconds...";
    classifier = ml5.imageClassifier(imageModelURL);
    classifyVideo();
}

function classifyVideo() {
    img = document.getElementById("imm");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    
    if (error) {
        console.log(error);
        return;
    }
    console.log(results[0]);
    label = results[0].label;
    if (Number.isInteger(label)) {
        classifyVideo();
    }

    label2 = Math.ceil(results[0].confidence * 100) + "%";
    document.getElementById("diagl").innerHTML = label;
    if (label != "On") {
        document.getElementById("rem").innerHTML = "Wear your mask!";
        document.getElementById("rem").style="color:red"
    } else {
        document.getElementById("rem").innerHTML = "Good job!";
        document.getElementById("rem").style="color:green"
    }
    document.getElementById("diagp").innerHTML = label2;

}