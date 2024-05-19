let canvas1 = document.getElementById("canvas1");
let ctx1 = canvas1.getContext("2d");
let canvas2 = document.getElementById("canvas2");
let ctx2 = canvas2.getContext("2d");
const bw = 600;
const bh = 600;
const cellSize = 60;

const avv = [];
for (let i = 0; i < 10; i++) {
    avv.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}

// Funzione per disegnare la prima griglia
const primaGriglia = (mio) => {
    ctx1.lineWidth = 5;
    ctx1.strokeStyle = "black";
    for (let x = 0; x < bw; x += cellSize) {
        for (let y = 0; y < bh; y += cellSize) {
            ctx1.strokeRect(x + 10, y + 10, cellSize, cellSize);
        }
    }
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            if (mio[y][x]=== 1) { 
                const cellX = x*cellSize + 10;
                const cellY = y*cellSize + 10;
                ctx1.beginPath();
                ctx1.arc(cellX + cellSize/2, cellY + cellSize/2, cellSize/ 4, 0, Math.PI*2);
                ctx1.fillStyle = "red";
                ctx1.fill();
                ctx1.closePath();
            }
        }  
    }
};

// Funzione per disegnare la seconda griglia
const secondaGriglia = (avv) => {
    console.log("lista griglia", avv);
    ctx2.lineWidth = 5;
    ctx2.strokeStyle = "black";
    for (let x = 0; x < bw; x += cellSize) {
        for (let y = 0; y < bh; y += cellSize) {
            ctx2.strokeRect(x + 10, y + 10, cellSize, cellSize);
        }
    }

    canvas2.addEventListener("click", (event) => {
        const rect = canvas2.getBoundingClientRect();
        const clickX = event.clientX-rect.left;
        const clickY = event.clientY-rect.top;
        const xx = Math.floor(clickX/cellSize);
        const yy = Math.floor(clickY/cellSize);
        console.log("Cliccato sulla cella: ", xx, yy);
        if (avv[yy] && avv[yy][xx] === 1) {
            console.log("nave colpita");
            alert("nave colpita");
        } else {
            console.log("nave mancata");
            alert("nave mancata");
        }
    });
};

let n = 5;
let n_navi = 0;
const mio = [];
for (let i = 0; i < 10; i++) {
    mio.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}

const posizionamentoNavi = (mio, x1, y1, possibilità) => {
    let index = Math.floor(Math.random() * possibilità.length);
    console.log("valore", possibilità[index]);
    if (possibilità[index]=== "basso") {
        for (let l = 1; l <= n; l++) {
            aggiornaCelle(mio, y1 + l, x1);
        }
        console.log("verso il basso");
    }
    if (possibilità[index]=== "alto") {
        for (let l = 1; l <= n; l++) {
            aggiornaCelle(mio, y1 - l, x1);
        }
        console.log("verso l'alto");
    }
    if (possibilità[index]=== "destra") {
        for (let l = 1; l <= n; l++) {
            aggiornaCelle(mio, y1, x1 + l);
        }
        console.log("verso destra");
    }
    if (possibilità[index] === "sinistra") {
        for (let l = 1; l <= n; l++) {
            aggiornaCelle(mio, y1, x1 - l);
        }
        console.log("verso sinistra");
    } else {
        console.log("impossibile piazzare la nave");
        generaPunto(mio, n)
    }
};

const controllaPosizione = (mio, x1, y1, n) => {
    let possibilità = [];
    console.log("valori x e y", x1, y1);

    // Controllo posizione verso il basso
    if (y1 + n < 10) {
        let canPlace = true;
        for (let j = 0; j < n; j++) {
            if (mio[y1+j][x1] === undefined || mio[y1+j][x1] === 1 || mio[y1+j][x1+1] === 1 || mio[y1+j][x1-1] === 1) {
                canPlace = false;
                break;
            }
        }
        if (canPlace) {
            console.log("è possibile posizionare la nave verso il basso");
            possibilità.push("basso");
        }
    }

    // Controllo posizione verso l'alto
    if (y1 - n >= 0) {
        let canPlace = true;
        for (let j = 0; j < n; j++) {
            if (mio[y1-j][x1] === undefined || mio[y1-j][x1] === 1 || mio[y1-j][x1+1] === 1 || mio[y1-j][x1-1] === 1) {
                canPlace = false;
                break;
            }
        }
        if (canPlace) {
            console.log("è possibile posizionare la nave verso l'alto");
            possibilità.push("alto");
        }
    }

    // Controllo posizione verso destra
    if (x1 + n < 10) {
        let canPlace = true;
        for (let j = 0; j < n; j++) {
            if (mio[y1][x1+j] === undefined || mio[y1][x1+j] === 1 || mio[y1+1][x1+j] === 1 ||mio[y1-1][x1+j] === 1) {
                canPlace = false;
                break;
            }
        }
        if (canPlace) {
            console.log("è possibile posizionare la nave verso destra");
            possibilità.push("destra");
        }
    }

    // Controllo posizione verso sinistra
    if (x1 - n >= 0) {
        let canPlace = true;
        for (let j = 0; j < n; j++) {
            if (mio[y1][x1-j] === undefined ||
                mio[y1][x1-j] === 1 ||
                mio[y1+1][x1-j] === 1 ||
                mio[y1-1][x1-j] === 1
            ) {
                canPlace = false;
                break;
            }
        }
        if (canPlace) {
            console.log("è possibile posizionare la nave verso sinistra");
            possibilità.push("sinistra");
        }
    }

    if (possibilità.length > 0) {
        posizionamentoNavi(mio, x1, y1, possibilità);
    } else {
        console.log("nave impossibile da piazzare");
        generaPunto(mio, n);
    }
};

const aggiornaCelle = (y, x) => {
    if (y >= 0 && y < 10 && x >= 0 && x < 10) {
        mio[y][x] = 1;
    }
};

const controllaIntorni = (mio, x1, y1) => {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            let x2 = x1+i;
            let y2 = y1+j;
            if (x2 >= 0 && x2 < 10 && y2 >= 0 && y2 < 10) {
                if (mio[y2][x2] === 1) {
                    return true;
                }
            }
        }
    }
    return false;
};

const generaPunto = (mio, n) => {
    let isValid = true;
    let x1, y1;
    while (isValid) {
        x1 = Math.floor(Math.random() * 10);
        y1 = Math.floor(Math.random() * 10);
        isValid = controllaIntorni(mio, x1, y1);
    }
    mio[y1][x1] = 1;
    controllaPosizione(mio, x1, y1, n);
};

const creazioneGrigliaNavi = (mio, n) => {
    let nTemp = n;
    for (let i = 0; i < 5; i++) {
        if (nTemp !== 1) {
            if (nTemp === 2) {
                generaPunto(mio, nTemp);
                n_navi++;
                generaPunto(mio, nTemp);
                n_navi++;
                nTemp--;
            } else {
                generaPunto(mio, nTemp);
                n_navi++;
                nTemp--;
            }
        } else {
            console.log("disposizione completata");
            console.log(mio, n_navi);
            primaGriglia(mio);
        }
    }
};

/*
const creazioneGrigliaNaviAvv = (avv, n) => {
    let nTemp = n;
    for (let i = 0; i < 5; i++) {
        if (nTemp !== 1) {
            if (nTemp === 2) {
                generaPunto(avv, nTemp);
                n_navi++
                generaPunto(avv, nTemp);
                n_navi++
                nTemp --;
            } else {
                generaPunto(avv, nTemp);
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

const posizionamentoNaviAvv = (avv, x1, y1, possibilità) => {
    let index = Math.floor(Math.random() * possibilità.length);
    console.log("valore", possibilità[index]);
    if (possibilità[index] === "basso") {
        for (let l = 1; l <= n; l++) {
            aggiornaCelleAvv(avv, y1 + l, x1);
        }
        console.log("verso il basso");
    } else if (possibilità[index] === "alto") {
        for (let l = 1; l <= n; l++) {
            aggiornaCelleAvv(avv, y1 - l, x1);
        }
        console.log("verso l'alto");
    } else if (possibilità[index] === "destra") {
        for (let l = 1; l <= n; l++) {
            aggiornaCelleAvv(avv, y1, x1 + l);
        }
        console.log("verso destra");
    } else if (possibilità[index] === "sinistra") {
        for (let l = 1; l <= n; l++) {
            aggiornaCelleAvv(avv, y1, x1 - l);
        }
        console.log("verso sinistra");
    } else {
        console.log("impossibile piazzare la nave");
    }
};

const controllaPosizioneAvv = (avv, x1, y1, n) => {
    let possibilità = [];
    console.log("valori x e y", x1, y1);
    if (y1 + n < 10) {
        let canPlace = true;
        for (let j = 1; j <= n; j++) {
            if (avv[y1 + j][x1] === undefined || avv[y1+j][x1] === 1 || avv[y1+j][x1+1] === 1 || avv[y1+j][x1-1] === 1) {
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
        for (let j = 1; j <= n; j++) {
            if (avv[y1-j][x1] === undefined || avv[y1-j][x1] === 1 || avv[y1-j][x1+1] === 1 || avv[y1-j][x1-1] === 1) {
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
        for (let j = 1; j <= n; j++) {
            if (avv[y1][x1+j] === undefined || avv[y1][x1+j] === 1 || avv[y1+1][x1+j] === 1 || avv[y1-1][x1+j] === 1) {
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
        for (let j = 1; j <= n; j++) {
            if (avv[y1][x1-j] === undefined || avv[y1][x1-j] === 1 || avv[y1+1][x1-j] === 1 || avv[y1-1][x1-j] === 1) {
                canPlace = false;
                break;
            }
        }
        if (canPlace) {
            console.log("è possibile posizionare la nave verso sinistra");
            possibilità.push("sinistra");
        }
    }
    if (possibilità.length > 0) {
        posizionamentoNaviAvv(avv, x1, y1, possibilità);
    } else {
        console.log("nave impossibile da piazzare");
        generaPuntoAvv(avv, n);
    }
};

const aggiornaCelleAvv = (avv, y, x) => {
    if (y >= 0 && y < 10 && x >= 0 && x < 10) {
        avv[y][x] = 1;
    }
};

const controllaIntorniAvv = (avv, x1, y1) => {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            let x2 = x1+i;
            let y2 = y1+j;
            if (x2 >= 0 && x2 < 10 && y2 >= 0 && y2 < 10) {
                if (avv[y2][x2] === 1) {
                    return true;
                }
            }
        }
    }
    return false;
};

const generaPuntoAvv = (avv, n) => {
    let isValid = true;
    let x1, y1;
    while (isValid) {
        x1 = Math.floor(Math.random() * 10);
        y1 = Math.floor(Math.random() * 10);
        isValid = controllaIntorniAvv(avv, x1, y1);
    }
    avv[y1][x1] = 1;
    controllaPosizioneAvv(avv, x1, y1, n);
};
*/
creazioneGrigliaNavi(mio, n);
//creazioneGrigliaNaviAvv(mio, n);

/*const controlloGriglia = (mio, n) => {
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
        }else if (x1===9 && x1!==0 && x1!==9){
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
        );*/
