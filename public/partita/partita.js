let canvas1 = document.getElementById("canvas1");
let ctx1 = canvas1.getContext("2d");
let canvas2 = document.getElementById("canvas2");
let ctx2 = canvas2.getContext("2d");
const bw = 600;
const bh = 600;
const cellSize = 60;
/*
const avv = [];
for (let i = 0; i < 10; i++) {
    avv.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}*/

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
            const cellX = xx*cellSize + 10;
            const cellY = yy*cellSize + 10;
            ctx2.beginPath();
            ctx2.arc(cellX + cellSize/2, cellY + cellSize/2, cellSize/ 4, 0, Math.PI*2);
            ctx2.fillStyle = "red";
            ctx2.fill();
            ctx2.closePath();
        } else {
            console.log("nave mancata");
            const cellX = xx*cellSize + 10;
            const cellY = yy*cellSize + 10;
            ctx2.beginPath();
            ctx2.arc(cellX + cellSize/2, cellY + cellSize/2, cellSize/ 4, 0, Math.PI*2);
            ctx2.fillStyle = "blue";
            ctx2.fill();
            ctx2.closePath();
        }
    });
};


const mio = [];
for (let i = 0; i < 10; i++) {
    mio.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}

const aggiornaCelle = (y, x) => {
    if (y >= 0 && y < 10 && x >= 0 && x < 10) {
        mio[y][x] = 1;
    }
};

const posizionamentoNavi = (x1, y1, possibilità, n) => {
    console.log(possibilità)
    let index = Math.floor(Math.random() * possibilità.length);
    console.log("valore", possibilità[index]);
    if (possibilità[index]=== "basso") {
        for (let l = 1; l <= n; l++) {
            aggiornaCelle(y1 + l, x1);
        }
        console.log("verso il basso");
    }
    if (possibilità[index]=== "alto") {
        for (let l = 1; l <= n; l++) {
            aggiornaCelle(y1 - l, x1);
        }
        console.log("verso l'alto");
    }
    if (possibilità[index]=== "destra") {
        for (let l = 1; l <= n; l++) {
            aggiornaCelle(y1, x1 + l);
        }
        console.log("verso destra");
    }
    if (possibilità[index] === "sinistra") {
        for (let l = 1; l <= n; l++) {
            aggiornaCelle(y1, x1 - l);
        }
        console.log("verso sinistra");
    } else {
        console.log("impossibile piazzare la nave");
        //generaPunto(mio, n)
    }
};

const controllaPosizione = (mio, x1, y1, n) => {
    let possibilità = [];
    console.log("valori x e y", x1, y1);

    // Controllo posizione verso il basso
    if (y1 + n < 10) {
        console.log("controllo verso il basso")
        let canPlace = true;
        if (x1===0){
            for (let j = 0; j <= n; j++) {
                if (mio[y1+j][x1] !== undefined) {
                    if (mio[y1+(j+1)] !== undefined){
                        if (mio[y1+(j+1)][x1] === 1 || mio[y1+j][x1+1] === 1) {
                            canPlace = false;
                            break;
                        }
                    }else{
                        if (mio[y1+j]===undefined){
                            canPlace = false;
                            break;
                        }else{
                            if (mio[y1+j][x1+1] === 1) {
                                canPlace = false;
                                break;
                            }
                        }
                    }
                }else{
                    canPlace = false;
                    break;
                }
            }
        }
        if (x1===9){
            for (let j = 0; j <= n; j++) {
                if (mio[y1+j][x1] !== undefined) {
                    if (mio[y1+(j+1)] !== undefined){
                        if (mio[y1+(j+1)][x1] === 1 || mio[y1+j][x1-1] === 1) {
                            canPlace = false;
                            break;
                        }
                    }else{
                        if (mio[y1+j]===undefined){
                            canPlace = false;
                            break;
                        }else{
                            if (mio[y1+j][x1-1] === 1) {
                                canPlace = false;
                                break;
                            }
                        }
                    }
                }else{
                    canPlace = false;
                    break;
                }
            }
        }
        if (x1!==0 && x1!==9){
            for (let j = 0; j <= n; j++) {
                if (mio[y1+j][x1] !== undefined) {
                    if (mio[y1+(j+1)] !== undefined){
                        if (mio[y1+(j+1)][x1] === 1 || mio[y1+j][x1+1] === 1 || mio[y1+j][x1-1] === 1) {
                            canPlace = false;
                            break;
                        }
                    }else{
                        if (mio[y1+j]===undefined){
                            canPlace = false;
                            break;
                        }else{
                            if (mio[y1+j][x1+1] === 1 || mio[y1+j][x1-1] === 1) {
                                canPlace = false;
                                break;
                            }
                        }
                    }
                }else{
                    canPlace = false;
                    break;
                }
            }
        }
        if (canPlace) {
            console.log("è possibile posizionare la nave verso il basso");
            possibilità.push("basso");
        }
    }

    // Controllo posizione verso l'alto
    if (y1 - n >= 0) {
        console.log("controllo verso l'alto")
        let canPlace = true;
        if (x1===0){
            for (let j = 0; j <= n; j++) {
                if (mio[y1-j][x1] !== undefined) {
                    if (mio[y1-(j+1)] !== undefined){
                        if (mio[y1-(j+1)][x1] === 1 || mio[y1-j][x1+1] === 1 ) {
                            canPlace = false;
                            break;
                        }
                    }else{
                        if (mio[y1-j]===undefined){
                            canPlace = false;
                            break;
                        }else{
                            if (mio[y1-j][x1+1] === 1) {
                                canPlace = false;
                                break;
                            }
                        }
                    }
                }else{
                    canPlace = false;
                    break;
                }
            }
        }
        if (x1===9){
            for (let j = 0; j <= n; j++) {
                if (mio[y1-j][x1] !== undefined) {
                    if (mio[y1-(j+1)] !== undefined){
                        if (mio[y1-(j+1)][x1] === 1 || mio[y1-j][x1-1] === 1) {
                            canPlace = false;
                            break;
                        }
                    }else{
                        if (mio[y1-j]===undefined){
                            canPlace = false;
                            break;
                        }else{
                            if (mio[y1-j][x1-1] === 1) {
                                canPlace = false;
                                break;
                            }
                        }
                    }
                }else{
                    canPlace = false;
                    break;
                }
            }
        }
        if (x1!==0 && x1!==9) {
            for (let j = 0; j <= n; j++) {
                if (mio[y1-j][x1] !== undefined) {
                    if (mio[y1-(j+1)] !== undefined){
                        if (mio[y1-(j+1)][x1] === 1 || mio[y1-j][x1+1] === 1 || mio[y1-j][x1-1] === 1) {
                            canPlace = false;
                            break;
                        }
                    }else{
                        if (mio[y1-j]===undefined){
                            canPlace = false;
                            break;
                        }else{
                            if (mio[y1-j][x1+1] === 1 || mio[y1-j][x1-1] === 1) {
                                canPlace = false;
                                break;
                            }
                        }
                    }
                }else{
                    canPlace = false;
                    break;
                }
            }
        }
        if (canPlace) {
            console.log("è possibile posizionare la nave verso l'alto");
            possibilità.push("alto");
        }
    }

    // Controllo posizione verso destra
    if (x1 + n < 10) {
        console.log("controllo verso destra")
        let canPlace = true;
        if (y1===0){
            for (let j = 0; j <= n; j++) {
                if (mio[y1][x1+j] !== undefined) {
                    if (mio[x1+(j+1)] !== undefined){
                        if (mio[y1][x1+(j+1)] === 1 || mio[y1+1][x1+j] === 1) {
                            canPlace = false;
                            break;
                        }
                    }else{
                        if (mio[x1+j]===undefined){
                            canPlace = false;
                            break;
                        }else{
                            if (mio[y1+1][x1+j] === 1) {
                                canPlace = false;
                                break;
                            }
                        }
                    }
                }else{
                    canPlace = false;
                    break;
                }
            }
        }
        if (y1===9){
            for (let j = 0; j <= n; j++) {
                if (mio[y1][x1+j] !== undefined) {
                    if (mio[x1+(j+1)] !== undefined){
                        if (mio[y1][x1+(j+1)] === 1 || mio[y1-1][x1+j] === 1) {
                            canPlace = false;
                            break;
                        }
                    }else{
                        if (mio[x1+j]===undefined){
                            canPlace = false;
                            break;
                        }else{
                            if (mio[y1-1][x1+j] === 1) {
                                canPlace = false;
                                break;
                            }
                        }
                    }
                }else{
                    canPlace = false;
                    break;
                }
            }
        }
        if (y1!==0 && y1!==9){
            for (let j = 0; j <= n; j++) {
                if (mio[y1][x1+j] !== undefined) {
                    if (mio[x1+(j+1)] !== undefined){
                        if (mio[y1][x1+(j+1)] === 1 || mio[y1+1][x1+j] === 1 || mio[y1-1][x1+j] === 1) {
                            canPlace = false;
                            break;
                        }
                    }else{
                        if (mio[x1+j]===undefined){
                            canPlace = false;
                            break;
                        }else{
                            if (mio[y1+1][x1+j] === 1 || mio[y1-1][x1+j] === 1) {
                                canPlace = false;
                                break;
                            }
                        }
                    }
                }else{
                    canPlace = false;
                    break;
                }
            }
        }
        if (canPlace) {
            console.log("è possibile posizionare la nave verso destra");
            possibilità.push("destra");
        }
    }

    // Controllo posizione verso sinistra
    if (x1 - n >= 0) {
        console.log("controllo verso sinistra")
        let canPlace = true;
        if (y1===0){
            for (let j = 0; j <= n; j++) {
                if (mio[y1][x1-j] !== undefined) {
                    if (mio[x1-(j+1)] !== undefined){
                        if (mio[y1][x1-(j+1)] === 1 || mio[y1+1][x1-j] === 1) {
                            canPlace = false;
                            break;
                        }
                    }else{
                        if (mio[x1-j]===undefined){
                            canPlace = false;
                            break;
                        }{
                            if (mio[y1+1][x1-j] === 1) {
                                canPlace = false;
                                break;
                            }
                        }
                    }
                }else{
                    canPlace = false;
                    break;
                }
            }
        }
        if (y1===9){
            for (let j = 0; j <= n; j++) {
                if (mio[y1][x1-j] !== undefined) {
                    if (mio[x1-(j+1)] !== undefined){
                        if (mio[y1][x1-(j+1)] === 1 || mio[y1-1][x1-j] === 1) {
                            canPlace = false;
                            break;
                        }
                    }else{
                        if (mio[x1-j]===undefined){
                            canPlace = false;
                            break;
                        }{
                            if (mio[y1-1][x1-j] === 1) {
                                canPlace = false;
                                break;
                            }
                        }
                    }
                }else{
                    canPlace = false;
                    break;
                }
            }
        }
        if (y1!==0 && y1!==9){
            for (let j = 0; j <= n; j++) {
                if (mio[y1][x1-j] !== undefined) {
                    if (mio[x1-(j+1)] !== undefined){
                        if (mio[y1][x1-(j+1)] === 1 || mio[y1+1][x1-j] === 1 || mio[y1-1][x1-j] === 1) {
                            canPlace = false;
                            break;
                        }
                    }else{
                        if (mio[x1-j]===undefined){
                            canPlace = false;
                            break;
                        }else{
                            if (mio[y1+1][x1-j] === 1 || mio[y1-1][x1-j] === 1) {
                                canPlace = false;
                                break;
                            }
                        }
                    }
                }else{
                    canPlace = false;
                    break;
                }
            }
        }
        if (canPlace) {
            console.log("è possibile posizionare la nave verso sinistra");
            possibilità.push("sinistra");
        }
    }

    if (possibilità.length > 0) {
        posizionamentoNavi(x1, y1, possibilità, n);
        return true;
    } else {
        console.log("nave impossibile da piazzare");
        return false;
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
    let f = controllaPosizione(mio, x1, y1, n);
    if (!f){
        mio[y1][x1] = 0;
        generaPunto(mio, n)
    }
};

const creazioneGrigliaNavi = (mio) => {
    let n = 5;
    let n_navi = 0;
    for (let i = 0; i < 5; i++) {
        if (n !== 1) {
            if (n === 2) {
                generaPunto(mio, n);
                n_navi++;
                generaPunto(mio, n);
                n_navi++;
                n--;
            } else {
                generaPunto(mio, n);
                n_navi++;
                n--;
                console.log(n)
            }
        } else {
            console.log("disposizione completata");
            console.log(mio, n_navi);
            primaGriglia(mio);
        }
    }
};

const avv = [];
for (let i = 0; i < 10; i++) {
    avv.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}

const aggiornaCelleAvv = (y, x) => {
    if (y >= 0 && y < 10 && x >= 0 && x < 10) {
        avv[y][x] = 1;
    }
};

const posizionamentoNaviAvv = (x1, y1, possibilità, n) => {
    console.log(possibilità)
    let index = Math.floor(Math.random() * possibilità.length);
    console.log("valore", possibilità[index]);
    if (possibilità[index]=== "basso") {
        for (let l = 1; l <= n; l++) {
            aggiornaCelleAvv(y1 + l, x1);
        }
        console.log("verso il basso");
    }
    if (possibilità[index]=== "alto") {
        for (let l = 1; l <= n; l++) {
            aggiornaCelleAvv(y1 - l, x1);
        }
        console.log("verso l'alto");
    }
    if (possibilità[index]=== "destra") {
        for (let l = 1; l <= n; l++) {
            aggiornaCelleAvv(y1, x1 + l);
        }
        console.log("verso destra");
    }
    if (possibilità[index] === "sinistra") {
        for (let l = 1; l <= n; l++) {
            aggiornaCelleAvv(y1, x1 - l);
        }
        console.log("verso sinistra");
    } else {
        console.log("impossibile piazzare la nave");
    }
};

const controllaPosizioneAvv = (avv, x1, y1, n) => {
    let possibilità = [];
    console.log("valori x e y", x1, y1);

    // Controllo posizione verso il basso
    if (y1 + n < 10) {
        console.log("controllo verso il basso")
        let canPlace = true;
        if (x1===0){
            for (let j = 0; j <= n; j++) {
                if (avv[y1+j][x1] !== undefined) {
                    if (avv[y1+(j+1)] !== undefined){
                        if (avv[y1+(j+1)][x1] === 1 || avv[y1+j][x1+1] === 1) {
                            canPlace = false;
                            break;
                        }
                    }else{
                        if (avv[y1+j]===undefined){
                            canPlace = false;
                            break;
                        }else{
                            if (avv[y1+j][x1+1] === 1) {
                                canPlace = false;
                                break;
                            }
                        }
                    }
                }else{
                    canPlace = false;
                    break;
                }
            }
        }
        if (x1===9){
            for (let j = 0; j <= n; j++) {
                if (avv[y1+j][x1] !== undefined) {
                    if (avv[y1+(j+1)] !== undefined){
                        if (avv[y1+(j+1)][x1] === 1 || avv[y1+j][x1-1] === 1) {
                            canPlace = false;
                            break;
                        }
                    }else{
                        if (avv[y1+j]===undefined){
                            canPlace = false;
                            break;
                        }else{
                            if (avv[y1+j][x1-1] === 1) {
                                canPlace = false;
                                break;
                            }
                        }
                    }
                }else{
                    canPlace = false;
                    break;
                }
            }
        }
        if (x1!==0 && x1!==9){
            for (let j = 0; j <= n; j++) {
                if (avv[y1+j][x1] !== undefined) {
                    if (avv[y1+(j+1)] !== undefined){
                        if (avv[y1+(j+1)][x1] === 1 || avv[y1+j][x1+1] === 1 || avv[y1+j][x1-1] === 1) {
                            canPlace = false;
                            break;
                        }
                    }else{
                        if (avv[y1+j]===undefined){
                            canPlace = false;
                            break;
                        }else{
                            if (avv[y1+j][x1+1] === 1 || avv[y1+j][x1-1] === 1) {
                                canPlace = false;
                                break;
                            }
                        }
                    }
                }else{
                    canPlace = false;
                    break;
                }
            }
        }
        if (canPlace) {
            console.log("è possibile posizionare la nave verso il basso");
            possibilità.push("basso");
        }
    }

    // Controllo posizione verso l'alto
    if (y1 - n >= 0) {
        console.log("controllo verso l'alto")
        let canPlace = true;
        if (x1===0){
            for (let j = 0; j <= n; j++) {
                if (avv[y1-j][x1] !== undefined) {
                    if (avv[y1-(j+1)] !== undefined){
                        if (avv[y1-(j+1)][x1] === 1 || avv[y1-j][x1+1] === 1 ) {
                            canPlace = false;
                            break;
                        }
                    }else{
                        if (avv[y1-j]===undefined){
                            canPlace = false;
                            break;
                        }else{
                            if (avv[y1-j][x1+1] === 1) {
                                canPlace = false;
                                break;
                            }
                        }
                    }
                }else{
                    canPlace = false;
                    break;
                }
            }
        }
        if (x1===9){
            for (let j = 0; j <= n; j++) {
                if (avv[y1-j][x1] !== undefined) {
                    if (avv[y1-(j+1)] !== undefined){
                        if (avv[y1-(j+1)][x1] === 1 || avv[y1-j][x1-1] === 1) {
                            canPlace = false;
                            break;
                        }
                    }else{
                        if (avv[y1-j]===undefined){
                            canPlace = false;
                            break;
                        }else{
                            if (avv[y1-j][x1-1] === 1) {
                                canPlace = false;
                                break;
                            }
                        }
                    }
                }else{
                    canPlace = false;
                    break;
                }
            }
        }
        if (x1!==0 && x1!==9) {
            for (let j = 0; j <= n; j++) {
                if (avv[y1-j][x1] !== undefined) {
                    if (avv[y1-(j+1)] !== undefined){
                        if (avv[y1-(j+1)][x1] === 1 || avv[y1-j][x1+1] === 1 || avv[y1-j][x1-1] === 1) {
                            canPlace = false;
                            break;
                        }
                    }else{
                        if (avv[y1-j]===undefined){
                            canPlace = false;
                            break;
                        }else{
                            if (avv[y1-j][x1+1] === 1 || avv[y1-j][x1-1] === 1) {
                                canPlace = false;
                                break;
                            }
                        }
                    }
                }else{
                    canPlace = false;
                    break;
                }
            }
        }
        if (canPlace) {
            console.log("è possibile posizionare la nave verso l'alto");
            possibilità.push("alto");
        }
    }

    // Controllo posizione verso destra
    if (x1 + n < 10) {
        console.log("controllo verso destra")
        let canPlace = true;
        if (y1===0){
            for (let j = 0; j <= n; j++) {
                if (avv[y1][x1+j] !== undefined) {
                    if (avv[x1+(j+1)] !== undefined){
                        if (avv[y1][x1+(j+1)] === 1 || avv[y1+1][x1+j] === 1) {
                            canPlace = false;
                            break;
                        }
                    }else{
                        if (avv[x1+j]===undefined){
                            canPlace = false;
                            break;
                        }else{
                            if (avv[y1+1][x1+j] === 1) {
                                canPlace = false;
                                break;
                            }
                        }
                    }
                }else{
                    canPlace = false;
                    break;
                }
            }
        }
        if (y1===9){
            for (let j = 0; j <= n; j++) {
                if (avv[y1][x1+j] !== undefined) {
                    if (avv[x1+(j+1)] !== undefined){
                        if (avv[y1][x1+(j+1)] === 1 || avv[y1-1][x1+j] === 1) {
                            canPlace = false;
                            break;
                        }
                    }else{
                        if (avv[x1+j]===undefined){
                            canPlace = false;
                            break;
                        }else{
                            if (avv[y1-1][x1+j] === 1) {
                                canPlace = false;
                                break;
                            }
                        }
                    }
                }else{
                    canPlace = false;
                    break;
                }
            }
        }
        if (y1!==0 && y1!==9){
            for (let j = 0; j <= n; j++) {
                if (avv[y1][x1+j] !== undefined) {
                    if (avv[x1+(j+1)] !== undefined){
                        if (avv[y1][x1+(j+1)] === 1 || avv[y1+1][x1+j] === 1 || avv[y1-1][x1+j] === 1) {
                            canPlace = false;
                            break;
                        }
                    }else{
                        if (avv[x1+j]===undefined){
                            canPlace = false;
                            break;
                        }else{
                            if (avv[y1+1][x1+j] === 1 || avv[y1-1][x1+j] === 1) {
                                canPlace = false;
                                break;
                            }
                        }
                    }
                }else{
                    canPlace = false;
                    break;
                }
            }
        }
        if (canPlace) {
            console.log("è possibile posizionare la nave verso destra");
            possibilità.push("destra");
        }
    }

    // Controllo posizione verso sinistra
    if (x1 - n >= 0) {
        console.log("controllo verso sinistra")
        let canPlace = true;
        if (y1===0){
            for (let j = 0; j <= n; j++) {
                if (avv[y1][x1-j] !== undefined) {
                    if (avv[x1-(j+1)] !== undefined){
                        if (avv[y1][x1-(j+1)] === 1 || avv[y1+1][x1-j] === 1) {
                            canPlace = false;
                            break;
                        }
                    }else{
                        if (avv[x1-j]===undefined){
                            canPlace = false;
                            break;
                        }{
                            if (avv[y1+1][x1-j] === 1) {
                                canPlace = false;
                                break;
                            }
                        }
                    }
                }else{
                    canPlace = false;
                    break;
                }
            }
        }
        if (y1===9){
            for (let j = 0; j <= n; j++) {
                if (avv[y1][x1-j] !== undefined) {
                    if (avv[x1-(j+1)] !== undefined){
                        if (avv[y1][x1-(j+1)] === 1 || avv[y1-1][x1-j] === 1) {
                            canPlace = false;
                            break;
                        }
                    }else{
                        if (avv[x1-j]===undefined){
                            canPlace = false;
                            break;
                        }{
                            if (avv[y1-1][x1-j] === 1) {
                                canPlace = false;
                                break;
                            }
                        }
                    }
                }else{
                    canPlace = false;
                    break;
                }
            }
        }
        if (y1!==0 && y1!==9){
            for (let j = 0; j <= n; j++) {
                if (avv[y1][x1-j] !== undefined) {
                    if (avv[x1-(j+1)] !== undefined){
                        if (avv[y1][x1-(j+1)] === 1 || avv[y1+1][x1-j] === 1 || avv[y1-1][x1-j] === 1) {
                            canPlace = false;
                            break;
                        }
                    }else{
                        if (avv[x1-j]===undefined){
                            canPlace = false;
                            break;
                        }else{
                            if (avv[y1+1][x1-j] === 1 || avv[y1-1][x1-j] === 1) {
                                canPlace = false;
                                break;
                            }
                        }
                    }
                }else{
                    canPlace = false;
                    break;
                }
            }
        }
        if (canPlace) {
            console.log("è possibile posizionare la nave verso sinistra");
            possibilità.push("sinistra");
        }
    }

    if (possibilità.length > 0) {
        posizionamentoNaviAvv(x1, y1, possibilità, n);
        return true;
    } else {
        console.log("nave impossibile da piazzare");
        return false;
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
    let f = controllaPosizioneAvv(avv, x1, y1, n);
    if (!f){
        avv[y1][x1] = 0;
        generaPuntoAvv(avv, n)
    }
};

const creazioneGrigliaNaviAvv = (avv) => {
    let n = 5;
    let n_navi = 0;
    for (let i = 0; i < 5; i++) {
        if (n !== 1) {
            if (n === 2) {
                generaPuntoAvv(avv, n);
                n_navi++;
                generaPuntoAvv(avv, n);
                n_navi++;
                n--;
            } else {
                generaPuntoAvv(avv, n);
                n_navi++;
                n--;
                console.log(n)
            }
        } else {
            console.log("disposizione completata");
            console.log(avv, n_navi);
            secondaGriglia(avv);
        }
    }
};

creazioneGrigliaNaviAvv(avv);
creazioneGrigliaNavi(mio);
