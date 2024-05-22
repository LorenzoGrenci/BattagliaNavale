const div_homepage = document.getElementById("tabella_giocatori");
const cercaPartita = document.getElementById("btn_partita");
const paginaPartita = document.getElementById("pagina_partita");

let canvas1 = document.getElementById("canvas1");
let ctx1 = canvas1.getContext("2d");
let canvas2 = document.getElementById("canvas2");
let ctx2 = canvas2.getContext("2d");

const mio = [];


let giocatoreCorrente="alleato";
let giocatoreNum=0;
let pronto=false;
let nemicoPronto=false;
let colpiSparati=-1;
const socket=io();

cercaPartita.addEventListener("click", startCercaPartita);


//cercare la partita
function startCercaPartita(){
    
    socket.emit("join room")

    //prendere il proprio numero di giocatore
    

    function giocatoreConnessoODisconnesso(num) {
        let giocatore = `.p${parseInt(num) + 1}`;
        console.log(giocatore);
        document.querySelector(`${giocatore} .connesso span`).classList.toggle('green');
        if(parseInt(num) == giocatoreNum) document.querySelector(giocatore).style.
        fontWeight = 'bold';
    };
};

socket.on("start game",()=>{
    console.log("dio")
    paginaPartita.classList.remove("d-none")
    paginaPartita.classList.add("d-block")
})
socket.on("solo un giocatore connesso", ()=>{
    console.log("1")
    cercaPartita.innerHTML=`<div class="spinner"></div>`
})
socket.on("partita già in corso", ()=>{
    console.log("2")
    alert("server pieno")
})