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
                //console.log(n)
            }
        } else {
            //console.log("disposizione completata");
            //console.log(mio, n_navi);
            return mio
        }
    }
};


const aggiornaCelle = (mio, y, x) => {
    if (y >= 0 && y < 10 && x >= 0 && x < 10) {
        mio[y][x] = 1;
    }
};

const posizionamentoNavi = (mio, x1, y1, possibilità, n) => {
    //console.log(possibilità)
    let index = Math.floor(Math.random() * possibilità.length);
    //console.log("valore", possibilità[index]);
    if (possibilità[index]=== "basso") {
        for (let l = 1; l <= n; l++) {
            aggiornaCelle(mio, y1 + l, x1);
        }
        //console.log("verso il basso");
    }
    if (possibilità[index]=== "alto") {
        for (let l = 1; l <= n; l++) {
            aggiornaCelle(mio, y1 - l, x1);
        }
        //console.log("verso l'alto");
    }
    if (possibilità[index]=== "destra") {
        for (let l = 1; l <= n; l++) {
            aggiornaCelle(mio, y1, x1 + l);
        }
        //console.log("verso destra");
    }
    if (possibilità[index] === "sinistra") {
        for (let l = 1; l <= n; l++) {
            aggiornaCelle(mio, y1, x1 - l);
        }
        //console.log("verso sinistra");
    } else {
        //console.log("impossibile piazzare la nave");
        //generaPunto(mio, n)
    }
};

const controllaPosizione = (mio, x1, y1, n) => {
    let possibilità = [];
    //console.log("valori x e y", x1, y1);

    // Controllo posizione verso il basso
    if (y1 + n < 10) {
        //console.log("controllo verso il basso")
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
            //console.log("è possibile posizionare la nave verso il basso");
            possibilità.push("basso");
        }
    }

    // Controllo posizione verso l'alto
    if (y1 - n >= 0) {
        //console.log("controllo verso l'alto")
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
            //console.log("è possibile posizionare la nave verso l'alto");
            possibilità.push("alto");
        }
    }

    // Controllo posizione verso destra
    if (x1 + n < 10) {
        //console.log("controllo verso destra")
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
            //console.log("è possibile posizionare la nave verso destra");
            possibilità.push("destra");
        }
    }

    // Controllo posizione verso sinistra
    if (x1 - n >= 0) {
        //console.log("controllo verso sinistra")
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
            //console.log("è possibile posizionare la nave verso sinistra");
            possibilità.push("sinistra");
        }
    }

    if (possibilità.length > 0) {
        posizionamentoNavi(mio, x1, y1, possibilità, n);
        return true;
    } else {
        //console.log("nave impossibile da piazzare");
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


module.exports={
    creaComp:creazioneGrigliaNavi
}