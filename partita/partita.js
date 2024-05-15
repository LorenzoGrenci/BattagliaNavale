let canvas1 = document.getElementById("canvas1");
let ctx1 = canvas1.getContext("2d");
let canvas2 = document.getElementById("canvas2");
let ctx2 = canvas2.getContext("2d");
const bw = 600;
const bh = 600;
const cellSize = 60;

const primaGriglia = () => {
    ctx1.lineWidth = 5;
    ctx1.strokeStyle = "black";
    for (let x = 0; x < bw; x += cellSize) {
        for (let y = 0; y < bh; y += cellSize) {
            // Disegna la cella
            ctx1.strokeRect(x + 10, y + 10, cellSize, cellSize);

            // Aggiunge un gestore di eventi click alla cella
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

let n=5
let n_navi=0
const mio = [];
for (let i = 0; i < 10; i++) {
    mio.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}
const controlloGriglia = (mio, n) => {
    let x1, y1;
    do {
        x1 = Math.floor(Math.random() * 10);
        y1 = Math.floor(Math.random() * 10);
    } while (
        //Controllo se posso scegliere quel punto senza essere vicino ad altre navi
        mio[y1][x1] === 1 ||  
        mio[y1+1][x1] === 1 || mio[y1+1][x1] === undefined || 
        mio[y1-1][x1] === 1 || mio[y1-1][x1] === undefined || 
        mio[y1][x1+1] === 1 || mio[y1][x1+1] === undefined || 
        mio[y1][x1-1] === 1 || mio[y1][x1-1] === undefined ||
        mio[y1+1][x1+1] === 1 || mio[y1+1][x1+1] === undefined ||
        mio[y1+1][x1-1] === 1 || mio[y1+1][x1-1] === undefined ||
        mio[y1-1][x1+1] === 1 || mio[y1-1][x1+1] === undefined ||
        mio[y1-1][x1-1] === 1 || mio[y1-1][x1-1] === undefined 
        )

    //Controllo dov'è possibile posizionare le navi
    let possibilità = [];
    console.log("valori x e y", x1, y1)
    if (y1 + n < 10) {
        let canPlace = true;
        for (let j = 1; j <= n+1; j++) {
            if (mio[y1 + j]=== undefined || mio[y1 + j][x1] === 1 || mio[y1 + j][x1] === undefined || mio[y1+j][x1+1] === 1 || mio[y1+j][x1-1] === 1) {
                canPlace = false;
                break;
            }
        }
        if (canPlace) {
            console.log("è possibile posizionare la nave verso il basso");
            possibilità.push("basso");
        }
    }    
    if (y1 - n >= 0) {
        let canPlace = true;
        for (let j = 1; j <= n+1; j++) {
            if (mio[y1 - j]=== undefined || mio[y1 - j][x1] === 1 || mio[y1 - j][x1] === undefined || mio[y1-j][x1+1] === 1 || mio[y1-j][x1-1] === 1) {
                canPlace = false;
                break;
            }
        }
        if (canPlace) {
            console.log("è possibile posizionare la nave verso l'alto");
            possibilità.push("alto");
        }
    }
    if (x1 + n < 10) {
        let canPlace = true;
        for (let j = 1; j <= n+1; j++) {
            if (mio[x1 + j] === undefined || mio[y1][x1 + j] === 1 || mio[y1][x1 + j] === undefined || mio[y1+1][x1+j]===1 || mio[y1-1][x1+j]===1) {
                canPlace = false;
                break;
            }
        }
        if (canPlace) {
            console.log("è possibile posizionare la nave verso destra");
            possibilità.push("destra");
        }
    }
    if (x1 - n >= 0) {
        let canPlace = true;
        for (let j = 1; j <= n+1; j++) {
            if (mio[x1 - j] === undefined || mio[y1][x1 - j] === 1 || mio[y1][x1 - j] === undefined || mio[y1+1][x1-j]===1 || mio[y1-1][x1-j]===1) {
                canPlace = false;
                break;
            }
        }
        if (canPlace) {
            console.log("è possibile posizionare la nave verso sinistra");
            possibilità.push("sinistra");
        }
    }else{
        console.log("Impossibile posizionare la nave in questa zona");
    }

    let index = Math.floor(Math.random() * possibilità.length);
    console.log("valore", possibilità[index]);

    //Posizionamento navi
    if (possibilità[index] === "basso") {
        for (let l = 0; l <= n; l++) {
            mio[y1 + l][x1] = 1;
        }
        console.log("verso il basso");
    } else if (possibilità[index] === "alto") {
        for (let l = 0; l <= n; l++) {
            mio[y1 - l][x1] = 1;
        }
        console.log("verso l'alto");
    } else if (possibilità[index] === "destra") {
        for (let l = 0; l <= n; l++) {
            mio[y1][x1 + l] = 1;
        }
        console.log("verso destra");
    } else if (possibilità[index] === "sinistra") {
        for (let l = 0; l <= n; l++) {
            mio[y1][x1 - l] = 1;
        }
        console.log("verso sinistra");
    }
}

const creazioneGrigliaNavi = (mio, n) => {
    let nTemp = n;
    for (let i = 0; i < 5; i++) {
        if (nTemp !== 1) {
            if (nTemp === 2) {
                controlloGriglia(mio, nTemp);
                n_navi++
                controlloGriglia(mio, nTemp);
                n_navi++
                nTemp --;
            } else {
                controlloGriglia(mio, nTemp);
                n_navi++
                nTemp--;
            }
        } else {
            console.log("disposizione completata");
            console.log(mio, n_navi);
            return; 
        }
    }
}

primaGriglia();
secondaGriglia();
creazioneGrigliaNavi(mio, n);
