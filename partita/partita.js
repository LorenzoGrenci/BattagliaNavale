let canvas1 = document.getElementById("canvas1");
let ctx1 = canvas1.getContext("2d");
let canvas2 = document.getElementById("canvas2");
let ctx2 = canvas2.getContext("2d");
const bw = 600;
const bh = 600;
const cellSize = 60;

//Funzione per disegnare la prima griglia
const primaGriglia = (mio) => {
    ctx1.lineWidth = 5;
    ctx1.strokeStyle = "black";
    for (let x = 0; x < bw; x += cellSize) {
        for (let y = 0; y < bh; y += cellSize) {
            ctx1.strokeRect(x + 10, y + 10, cellSize, cellSize);
        }
    }
    for (let y = 0; y < bh; y++) {
        for (let x = 0; x < bw; x++) {
            if (mio[y][x] === 1) { 
                const cellX = x * cellSize + 10;
                const cellY = y * cellSize + 10;
                ctx1.beginPath();
                ctx1.arc(cellX + cellSize / 2, cellY + cellSize / 2, cellSize / 4, 0, Math.PI * 2);
                ctx1.fillStyle = "red";
                ctx1.fill();
                ctx1.closePath();
            }
        }
    }
};

// Funzione per disegnare la seconda griglia
const secondaGriglia = (avv) => {
    console.log("lista griglia", avv)
    ctx2.lineWidth = 5;
    ctx2.strokeStyle = "black";
    for (let x = 0; x < bw; x += cellSize) {
        for (let y = 0; y < bh; y += cellSize) {
            ctx2.strokeRect(x + 10, y + 10, cellSize, cellSize);
            canvas2.addEventListener("click", (event) => {
                const rect = canvas2.getBoundingClientRect();
                const clickX = event.clientX - rect.left;
                const clickY = event.clientY - rect.top;
                if (clickX >= x && clickX <= x + cellSize && clickY >= y && clickY <= y + cellSize) {
                    const xx = Math.floor(x / cellSize);
                    const yy = Math.floor(y / cellSize);
                    console.log("Cliccato sulla cella: ", xx, yy);
                    if (avv[yy] && avv[yy][xx] === 1) {
                        console.log("nave colpita");
                        alert("nave colpita")
                    } else {
                        console.log("nave mancata");
                        alert("nave mancata")
                    }
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
    let condizione=0;
    do {
        condizione=0;
        x1 = Math.floor(Math.random() * 10);
        y1 = Math.floor(Math.random() * 10);
        console.log(x1,y1)
        if (x1===9){
            if (x1===9 && y1===0){
                condizione=mio[y1+1][x1-1] && !mio[y1+1][x1-1] &&
                mio[y1+1][x1] && !mio[y1+1][x1] &&
                mio[y1][x1-1] && !mio[y1][x1-1]
            }else if (x1===9 && y1===9){
                condizione=mio[y1][x1-1] && !mio[y1][x1-1] &&
                mio[y1-1][x1] && !mio[y1-1][x1] &&
                mio[y1-1][x1-1] && !mio[y1-1][x1-1]
            }
        }else{
            condizione=mio[y1-1][x1] && !mio[y1-1][x1] &&
            mio[y1-1][x1-1] && !mio[y1-1][x1-1] &&
            mio[y1][x1-1] && !mio[y1][x1-1] &&
            mio[y1+1][x1-1] && !mio[y1+1][x1-1] &&
            mio[y1+1][x1] && !mio[y1+1][x1]
        }
        if (x1===0){
            if (x1===0 && y1===0){
                condizione=mio[y1][x1+1] && !mio[y1][x1+1] &&
                mio[y1+1][x1+1] && !mio[y1+1][x1+1] &&
                mio[y1+1][x1] && !mio[y1+1][x1] 
            }else if(x1===0 && y1===9){
                condizione=mio[y1][x1+1] && !mio[y1][x1+1] &&
                mio[y1-1][x1+1] && !mio[y1-1][x1+1] &&
                mio[y1-1][x1] && !mio[y1-1][x1] 
            }
        }else{
            condizione=mio[y1-1][x1] && !mio[y1-1][x1] &&
            mio[y1-1][x1+1] && !mio[y1-1][x1+1] &&
            mio[y1][x1+1] && !mio[y1][x1+1] &&
            mio[y1+1][x1+1] && !mio[y1+1][x1+1] &&
            mio[y1+1][x1] && !mio[y1+1][x1]
        }
        if (y1===0 && x1!==0 && x1!==9){
            condizione=mio[y1][x1+1] && !mio[y1][x1+1] &&
            mio[y1+1][x1+1] && !mio[y1+1][x1+1] &&
            mio[y1+1][x1] && !mio[y1+1][x1] &&
            mio[y1+1][x1-1] && !mio[y1+1][x1-1] &&
            mio[y1][x1-1] && !mio[y1][x1-1]
        }
        else if (y1===9 && x1!==0 && x1!==9){
            condizione=mio[y1][x1+1] && !mio[y1][x1+1] &&
            mio[y1-1][x1+1] && !mio[y1-1][x1+1] &&
            mio[y1-1][x1] && !mio[y1-1][x1] &&
            mio[y1-1][x1-1] && !mio[y1-1][x1-1] &&
            mio[y1][x1-1] && !mio[y1][x1-1]
        }

    } while (
        //Controllo se posso scegliere quel punto senza essere vicino ad altre navi
        mio[y1][x1] &&
        condizione
        );

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
            primaGriglia(mio);
        }
    }
}

creazioneGrigliaNavi(mio, n);
/*
function generaPunto(matrix) {
    let isValid = false;
    let x, y;
    while (!isValid) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      isValid = controllaintorni(matrix, x, y);
    }
    matrix[x][y] = 1;
    return matrix;
  }
  
function controllaintorni(matrix, x, y) {
    for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
        if (x + i >= 0 && x + i < 10 && y + j >= 0 && y + j < 10) {
        if (matrix[x + i][y + j] === 1) {
            return false;
        }
        }
    }
    }
    return true;
}

// Creazione di una matrice 10x10 con tutti gli elementi impostati su zero
let matrix = Array.from({ length: 10 }, () => Array(10).fill(0));

// Impostazione di un punto casuale a uno
matrix[Math.floor(Math.random() * 10)][Math.floor(Math.random() * 10)] = 1;

// Generazione di un nuovo punto
matrix = generaPunto(matrix);

console.log(matrix);*/

const avv = [];
for (let i = 0; i < 10; i++) {
    avv.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}
const controlloGrigliaAvv = (avv, n) => {
    let x1, y1;
    let condizione = "";
    do {
        condizione = "";
        x1 = Math.floor(Math.random() * 10);
        y1 = Math.floor(Math.random() * 10);
        console.log(x1, y1);
        if (x1 === 9) {
            if (x1 === 9 && y1 === 0) {
                condizione =
                    avv[y1 + 1][x1 - 1] &&
                    !avv[y1 + 1][x1 - 1] &&
                    avv[y1 + 1][x1] &&
                    !avv[y1 + 1][x1] &&
                    avv[y1][x1 - 1] &&
                    !avv[y1][x1 - 1];
            } else if (x1 === 9 && y1 === 9) {
                condizione =
                    avv[y1][x1 - 1] &&
                    !avv[y1][x1 - 1] &&
                    avv[y1 - 1][x1] &&
                    !avv[y1 - 1][x1] &&
                    avv[y1 - 1][x1 - 1] &&
                    !avv[y1 - 1][x1 - 1];
            }
        } else {
            condizione =
                avv[y1 - 1][x1] &&
                !avv[y1 - 1][x1] &&
                avv[y1 - 1][x1 - 1] &&
                !avv[y1 - 1][x1 - 1] &&
                avv[y1][x1 - 1] &&
                !avv[y1][x1 - 1] &&
                avv[y1 + 1][x1 - 1] &&
                !avv[y1 + 1][x1 - 1] &&
                avv[y1 + 1][x1] &&
                !avv[y1 + 1][x1];
        }
        if (x1 === 0) {
            if (x1 === 0 && y1 === 0) {
                condizione =
                    avv[y1][x1 + 1] &&
                    !avv[y1][x1 + 1] &&
                    avv[y1 + 1][x1 + 1] &&
                    !avv[y1 + 1][x1 + 1] &&
                    avv[y1 + 1][x1] &&
                    !avv[y1 + 1][x1];
            } else if (x1 === 0 && y1 === 9) {
                condizione =
                    avv[y1][x1 + 1] &&
                    !avv[y1][x1 + 1] &&
                    avv[y1 - 1][x1 + 1] &&
                    !avv[y1 - 1][x1 + 1] &&
                    avv[y1 - 1][x1] &&
                    !avv[y1 - 1][x1];
            }
        } else {
            condizione =
                avv[y1 - 1][x1] &&
                !avv[y1 - 1][x1] &&
                avv[y1 - 1][x1 + 1] &&
                !avv[y1 - 1][x1 + 1] &&
                avv[y1][x1 + 1] &&
                !avv[y1][x1 + 1] &&
                avv[y1 + 1][x1 + 1] &&
                !avv[y1 + 1][x1 + 1] &&
                avv[y1 + 1][x1] &&
                !avv[y1 + 1][x1];
        }
        if (y1 === 0 && x1 !== 0 && x1 !== 9) {
            condizione =
                avv[y1][x1 + 1] &&
                !avv[y1][x1 + 1] &&
                avv[y1 + 1][x1 + 1] &&
                !avv[y1 + 1][x1 + 1] &&
                avv[y1 + 1][x1] &&
                !avv[y1 + 1][x1] &&
                avv[y1 + 1][x1 - 1] &&
                !avv[y1 + 1][x1 - 1] &&
                avv[y1][x1 - 1] &&
                !avv[y1][x1 - 1];
        } else if (y1 === 9 && x1 !== 0 && x1 !== 9) {
            condizione =
                avv[y1][x1 + 1] &&
                !avv[y1][x1 + 1] &&
                avv[y1 - 1][x1 + 1] &&
                !avv[y1 - 1][x1 + 1] &&
                avv[y1 - 1][x1] &&
                !avv[y1 - 1][x1] &&
                avv[y1 - 1][x1 - 1] &&
                !avv[y1 - 1][x1 - 1] &&
                avv[y1][x1 - 1] &&
                !avv[y1][x1 - 1];
        }
    } while (
        //Controllo se posso scegliere quel punto senza essere vicino ad altre navi
        avv[y1][x1] &&
        condizione
    );

    //Controllo dov'è possibile posizionare le navi
    let possibilità = [];
    console.log("valori x e y", x1, y1)
    if (y1 + n < 10) {
        let canPlace = true;
        for (let j = 1; j <= n+1; j++) {
            if (avv[y1 + j]=== undefined || avv[y1 + j][x1] === 1 || avv[y1 + j][x1] === undefined || avv[y1+j][x1+1] === 1 || avv[y1+j][x1-1] === 1) {
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
            if (avv[y1 - j]=== undefined || avv[y1 - j][x1] === 1 || avv[y1 - j][x1] === undefined || avv[y1-j][x1+1] === 1 || avv[y1-j][x1-1] === 1) {
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
            if (avv[x1 + j] === undefined || avv[y1][x1 + j] === 1 || avv[y1][x1 + j] === undefined || avv[y1+1][x1+j]===1 || avv[y1-1][x1+j]===1) {
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
            if (avv[x1 - j] === undefined || avv[y1][x1 - j] === 1 || avv[y1][x1 - j] === undefined || avv[y1+1][x1-j]===1 || avv[y1-1][x1-j]===1) {
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
            avv[y1 + l][x1] = 1;
        }
        console.log("verso il basso");
    } else if (possibilità[index] === "alto") {
        for (let l = 0; l <= n; l++) {
            avv[y1 - l][x1] = 1;
        }
        console.log("verso l'alto");
    } else if (possibilità[index] === "destra") {
        for (let l = 0; l <= n; l++) {
            avv[y1][x1 + l] = 1;
        }
        console.log("verso destra");
    } else if (possibilità[index] === "sinistra") {
        for (let l = 0; l <= n; l++) {
            avv[y1][x1 - l] = 1;
        }
        console.log("verso sinistra");
    }
}

const creazioneGrigliaNaviAvv = (avv, n) => {
    let nTemp = n;
    for (let i = 0; i < 5; i++) {
        if (nTemp !== 1) {
            if (nTemp === 2) {
                controlloGrigliaAvv(avv, nTemp);
                n_navi++
                controlloGrigliaAvv(avv, nTemp);
                n_navi++
                nTemp --;
            } else {
                controlloGrigliaAvv(avv, nTemp);
                n_navi++
                nTemp--;
            }
        } else {
            console.log("disposizione completata");
            console.log(avv, n_navi);
            secondaGriglia(avv);
        }
    }
}