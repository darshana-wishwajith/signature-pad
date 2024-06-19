//functioanlity for signature pad

//canvas & preview
const canvas = document.getElementById("signaturePad");
const preview = document.getElementById("preview");

//controls
const submitBtn = document.getElementById("submitBtn");
const clearBtn = document.getElementById("clearBtn");
const saveJpgBtn = document.getElementById("saveJpgBtn");
const savePngBtn = document.getElementById("savePngBtn");
const printBtn = document.getElementById("printBtn");

//get 2d rending context for canvas drawings
const ctx = canvas.getContext("2d");
//configure the redering context
ctx.strokeStyle = "#191919";
ctx.lineWidth = 2;
ctx.lineJoin = "round";
ctx.lineCap = "round";

//initailze global variables
let drawing = false;
let lastX = 0;
// let lastY = 0;
// backagroundIntializer("image/jpeg");

//add event listeners for handle the mouse & touch events

//mouse events
canvas.addEventListener("mousedown", event => {
    drawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
    draw(event);
})

canvas.addEventListener("mouseup", event => {
    drawing = false;
})

canvas.addEventListener("mouseout", event => {
    drawing = false;
})

canvas.addEventListener("mousemove", event => {
    draw(event);
})

//touch events
canvas.addEventListener("touchstart", event => {
    drawing = true;

    //position of canvas relative to viewport
    rect = canvas.getBoundingClientRect();

    lastX = event.touches[0].clientX - rect.left;
    lastY = event.touches[0].clientY - rect.top; 

    draw(event);
})

canvas.addEventListener("touchend", event => {
    drawing = false;
})

canvas.addEventListener("touchcancel", event => {
    drawing = false;
})

canvas.addEventListener("touchmove", event => {

    //position of canvas relative to viewport
    rect = canvas.getBoundingClientRect();

    draw({offsetX: event.touches[0].clientX - rect.left, offsetY: event.touches[0].clientY - rect.top});
})

//add event listeners to control butons

clearBtn.addEventListener("click", () => {
    ctx.clearRect(0,0, canvas.offsetWidth, canvas.offsetHeight);
    preview.classList.add("hidden");
})

submitBtn.addEventListener("click", () => {
    const dataURL = canvas.toDataURL();
    preview.src = dataURL;
    preview.classList.remove("hidden");
    // ctx.clearRect(0,0, canvas.offsetWidth, canvas.offsetHeight);

})

saveJpgBtn.addEventListener("click", () => {
    const imageType = "image/jpeg";
    downloadSignature(imageType);
})

savePngBtn.addEventListener("click", () => {
    const imageType = "image/png";
    backagroundIntializer(imageType);
    downloadSignature(imageType);
})

printBtn.addEventListener("click", () => {
    const dataURL = canvas.toDataURL("image/png");
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
        `<div style="display:flex; justify-content:center; align-items:center; height: 100%"><img src = "${dataURL}" onload = "window.print();"/><div>`
    );
    printWindow.document.close();
})


//draw signature on canvas
function draw(event){

    if(!drawing){
        return;
    }

    ctx.beginPath(); //start drawing
    ctx.moveTo(lastX, lastY); //last point
    ctx.lineTo(event.offsetX, event.offsetY); // current point
    ctx.stroke(); //draw the line between last line to current line

    lastX = event.offsetX;
    lastY = event.offsetY;
}

function downloadSignature(imageType){
    const dataURL = canvas.toDataURL(imageType);
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `signature.${imageType.split("/")[1]}`;
    link.click();
}

// function backagroundIntializer(imageType) {
//     if(imageType == "image/jpeg"){
//         ctx.fillStyle = '#fff';
//         ctx.fillRect(0, 0, canvas.width, canvas.height);
//     }
//     else if(imageType == "image/png"){
//         ctx.fillStyle = '#ffffff00';
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//     }
    
    
// }