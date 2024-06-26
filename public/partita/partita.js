const bw = 600;
const bh = 600;
const cellSize = 60;

// Funzione per disegnare la prima griglia
export const primaGriglia = (mio, ctx1) => {
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
                ctx1.fillStyle = "green";
                ctx1.fill();
                ctx1.closePath();
            }
        }  
    }
};

// Funzione per disegnare la seconda griglia
 export const secondaGriglia = (ctx2) => {
    console.log("lista griglia");
    ctx2.lineWidth = 5;
    ctx2.strokeStyle = "black";
    for (let x = 0; x < bw; x += cellSize) {
        for (let y = 0; y < bh; y += cellSize) {
            ctx2.strokeRect(x + 10, y + 10, cellSize, cellSize);
        }
    }
};

export const caricaRisultato = (ctx2, x, y, state) => {
    let color;
    if (state) {
        color = "red";
    } else {
        color = "blue";
    }
    
    const cellX = x * cellSize + 10;
    const cellY = y * cellSize + 10;
    
    ctx2.beginPath();
    ctx2.moveTo((cellX + cellSize / 2) - 10, (cellY + cellSize / 2) - 10);
    ctx2.lineTo((cellX + cellSize / 2) + 10, (cellY + cellSize / 2) + 10);
    ctx2.moveTo((cellX + cellSize / 2) + 10, (cellY + cellSize / 2) - 10);
    ctx2.lineTo((cellX + cellSize / 2) - 10, (cellY + cellSize / 2) + 10);
    ctx2.stroke();
    ctx2.closePath();
    
    setTimeout(() => {
        ctx2.arc(cellX + cellSize / 2, cellY + cellSize / 2, cellSize / 4, 0, Math.PI * 2);
        ctx2.fillStyle = color;
        ctx2.fill();
        ctx2.closePath();
    }, 1000);
};


export const visualizzaColpo = (ctx1, x, y, state) => {
    let color;
    if (state) {
        color = "red";
    } else {
        color = "blue";
    }
    
    const cellX = x * cellSize + 10;
    const cellY = y * cellSize + 10;
    
    ctx1.beginPath();
    ctx1.moveTo((cellX + cellSize / 2) - 10, (cellY + cellSize / 2) - 10);
    ctx1.lineTo((cellX + cellSize / 2) + 10, (cellY + cellSize / 2) + 10);
    ctx1.moveTo((cellX + cellSize / 2) + 10, (cellY + cellSize / 2) - 10);
    ctx1.lineTo((cellX + cellSize / 2) - 10, (cellY + cellSize / 2) + 10);
    ctx1.stroke();
    ctx1.closePath();
    
    setTimeout(() => {
        ctx1.arc(cellX + cellSize / 2, cellY + cellSize / 2, cellSize / 4, 0, Math.PI * 2);
        ctx1.fillStyle = color;
        ctx1.fill();
        ctx1.closePath();
    }, 1000);
};
