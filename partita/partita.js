let canvas1 = document.getElementById("canvas1");
let ctx1 = canvas1.getContext("2d");
let canvas2 = document.getElementById("canvas2");
let ctx2 = canvas2.getContext("2d");
let bw = 600;
let bh = 600;

const primaGriglia=()=>{
    ctx1.lineWidth = 5;
    ctx1.strokeStyle = "black";
    for (let x = 0; x < bw; x += 60) {
        for (let y = 0; y < bh; y += 60) {
            ctx1.strokeRect(x + 10, y + 10, 60, 60);
        }
    }
}

const secondaGriglia=()=>{
    ctx2.lineWidth = 5;
    ctx2.strokeStyle = "black";
    for (let x = 0; x < bw; x += 60) {
        for (let y = 0; y < bh; y += 60) {
            ctx2.strokeRect(x + 10, y + 10, 60, 60);
        }
    }
}
const Fcanvas1 =(xx,yy)=>{
    if (0<xx<20 && 0<yy<600) {
        console.log("10")
    }
    else{
        console.log("20")
    }
}

const Fcanvas2 =(xx,yy)=>{
    if (0<xx<20 && 0<yy<600) {
        console.log("10")
    }
    else{
        console.log("20")
    }
}

canvas1.addEventListener("click", (event)=>{Fcanvas1(event.x,event.y)});
canvas2.addEventListener("click", (event)=>{Fcanvas2(event.x,event.y)});
primaGriglia();
secondaGriglia();
