// Definizione dei canvas e dei contesti
let canvas1 = document.getElementById("canvas1");
let ctx1 = canvas1.getContext("2d");
let canvas2 = document.getElementById("canvas2");
let ctx2 = canvas2.getContext("2d");

// Dimensioni della griglia e delle celle
const bw = 600;
const bh = 600;
const cellSize = 60;

// Funzione per disegnare la prima griglia
const primaGriglia = () => {
    ctx1.lineWidth = 5;
    ctx1.strokeStyle = "black";
    for (let x = 0; x < bw; x += cellSize) {
        for (let y = 0; y < bh; y += cellSize) {
            // Disegna la cella
            ctx1.strokeRect(x + 10, y + 10, cellSize, cellSize);

            // Aggiungi un gestore di eventi click alla cella
            canvas1.addEventListener("click", (event) => {
                const rect = canvas1.getBoundingClientRect();
                const clickX = event.clientX - rect.left;
                const clickY = event.clientY - rect.top;
                if (clickX >= x && clickX <= x + cellSize && clickY >= y && clickY <= y + cellSize) {
                    xx=x / cellSize
                    yy= y / cellSize
                    console.log("Cliccato sulla cella: ", xx, yy);
                    if ((xx === 9 && yy === 9) || (xx === 3 && yy === 2)) {
                        // Disegna un cerchio
                        ctx1.beginPath();
                        ctx1.arc(x + cellSize / 2+10, y + cellSize/2 +10, cellSize/2, 0, 2 * Math.PI);
                        ctx1.fillStyle = "red";
                        ctx1.fill();
                        ctx1.closePath();
                    } else if ((xx === 8 && yy === 7) || (xx === 0 && yy === 0)) {
                        // Disegna un quadrato
                        ctx1.fillStyle = "blue";
                        ctx1.fillRect(x + cellSize/ 2-20, y + cellSize/ 2-20, cellSize, cellSize);
                    }
                }
            });
        }
    }
};

// Funzione per disegnare la seconda griglia
const secondaGriglia = () => {
    ctx2.lineWidth = 5;
    ctx2.strokeStyle = "black";
    for (let x = 0; x < bw; x += cellSize) {
        for (let y = 0; y < bh; y += cellSize) {
            // Disegna la cella
            ctx2.strokeRect(x + 10, y + 10, cellSize, cellSize);

            // Aggiungi un gestore di eventi click alla cella
            canvas2.addEventListener("click", (event) => {
                const rect = canvas2.getBoundingClientRect();
                const clickX = event.clientX - rect.left;
                const clickY = event.clientY - rect.top;
                if (clickX >= x && clickX <= x + cellSize && clickY >= y && clickY <= y + cellSize) {
                    xx=x / cellSize
                    yy= y / cellSize
                    console.log("Cliccato sulla cella: ", xx, yy);
                    // Esegui l'azione desiderata per il click sulla cella
                }
            });
        }
    }
};

// Aggiungi le griglie ai canvas
primaGriglia();
secondaGriglia();


/*const Fcanvas1 =(xx,yy)=>{
    if (0<xx && xx<20 && 0<yy && yy<600) {
        console.log("10")
    }
    else{
        console.log("20")
    }
}

const Fcanvas2 =(xx,yy)=>{
    if (0<xx && xx<20 && 0<yy && yy<600) {
        console.log("10")
    }
    else{
        console.log("20")
    }
}

canvas1.addEventListener("click", (event)=>{Fcanvas1(event.x,event.y)});
canvas2.addEventListener("click", (event)=>{Fcanvas2(event.x,event.y)});
*/
