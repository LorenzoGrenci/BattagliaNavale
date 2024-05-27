//const div_homepage = document.getElementById("tabella_giocatori");
const cercaPartita = document.getElementById("btn_partita");
const jannikSpinner = document.getElementById("div_spinner")
const paginaPartita = document.getElementById("pagina_partita");
const modalità = document.getElementById("btn_modalita")
import {primaGriglia, secondaGriglia, caricaRisultato, visualizzaColpo} from "./partita/partita.js"
 
let canvas1 = document.getElementById("canvas1");
let ctx1 = canvas1.getContext("2d");
let canvas2 = document.getElementById("canvas2");
let ctx2 = canvas2.getContext("2d");
const cellSize = 60;

const socket=io();

cercaPartita.addEventListener("click", startCercaPartita);


//cercare la partita
function startCercaPartita(){
    socket.emit("join room")
};

const controllaColpo = (ciccio) =>{
    canvas2.addEventListener("click", (event) => {
        const rect = canvas2.getBoundingClientRect();
        const clickX = event.clientX-rect.left;
        const clickY = event.clientY-rect.top;
        const xx = Math.floor(clickX/cellSize);
        const yy = Math.floor(clickY/cellSize);
        if (ciccio){
            console.log("Cliccato sulla cella: ", xx, yy);
            socket.emit("colpo", {x: xx , y: yy})
            ciccio = false
        }
    });
}

socket.on("start game",(data)=>{
    primaGriglia(data.combinazione, ctx1)
    secondaGriglia(ctx2)
    paginaPartita.classList.remove("d-none")
    paginaPartita.classList.add("d-block")
    modalità.classList.remove("d-flex")
    modalità.classList.add("d-none")
    console.log("fatto")
})

socket.on("solo un giocatore connesso", ()=>{
    console.log("1")
    jannikSpinner.innerHTML=`<div class="spinner"></div>`
})

socket.on("partita già in corso", ()=>{
    console.log("2")
    alert("server pieno")
})

socket.on("start turn", ()=>{
    let ciccio = true
    alert("è il tuo turno")
    console.log("è il tuo turno")
    controllaColpo(ciccio)
})

socket.on("hit", (data)=>{
    if (data.num===1){
        visualizzaColpo(ctx1, data.x, data.y, true)
    }else{
        visualizzaColpo(ctx1, data.x, data.y, false)
    }
})
socket.on("risultato", (data)=>{
    if (data.num===1){
        caricaRisultato(ctx2, data.x, data.y, true)
        console.log("hai colpito la navicella")
    }else{
        caricaRisultato(ctx2, data.x, data.y, false)
        console.log("non hai colpito niente")
    }
})

socket.on("fine partita", (data)=>{
    if (data === 1){
        alert("hai vinto")
    }else{
        alert("hai perso")
    }
    window.location.href="./homepage.html"
})

/*function resizeCanvas(canvas) {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
};
window.addEventListener('resize', function(){
    resizeCanvas(primaGriglia);
    resizeCanvas(secondaGriglia);
})*/
