//const div_homepage = document.getElementById("tabella_giocatori");
const cercaPartita = document.getElementById("btn_partita");
const jannikSpinner = document.getElementById("div_spinner");
const paginaPartita = document.getElementById("pagina_partita");
const modalità = document.getElementById("btn_modalita");
const div_timer = document.getElementById("timer");
const div_turno = document.getElementById("turno");
const finePartita = document.getElementById("fine_partita");
import {primaGriglia, secondaGriglia, caricaRisultato, visualizzaColpo} from "./partita/partita.js"
let timer

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
        clearInterval(timer);
        div_timer.innerHTML=`<h2><strong>0 SEC</strong></h2>`;
        const rect = canvas2.getBoundingClientRect();
        const clickX = event.clientX-rect.left;
        const clickY = event.clientY-rect.top;
        const xx = Math.floor(clickX/cellSize);
        const yy = Math.floor(clickY/cellSize);
        if (ciccio){
            console.log("Cliccato sulla cella: ", xx, yy);
            socket.emit("colpo", {x: xx , y: yy})
            ciccio = false
        };
    });
};

socket.on("start game",(data)=>{
    primaGriglia(data.combinazione, ctx1)
    secondaGriglia(ctx2)
    paginaPartita.classList.remove("d-none")
    paginaPartita.classList.add("d-block")
    modalità.classList.remove("d-flex")
    modalità.classList.add("d-none")
    console.log("fatto")
});

socket.on("solo un giocatore connesso", ()=>{
    console.log("1");
    jannikSpinner.innerHTML=`<div class="spinner"></div>`;
});

socket.on("partita già in corso", ()=>{
    console.log("2");
    alert("server pieno");
});

socket.on("start turn", ()=>{
    let ciccio = true;
    //alert("è il tuo turno");
    div_turno.innerHTML=`<h2><strong>E'IL TUO TURNO!</strong></h2>`;
    console.log("è il tuo turno");
    controllaColpo(ciccio);
    let time=0;
    const maxTime=20;
    timer = setInterval(()=>{
        if(time < maxTime){
            time += 1;
            div_timer.innerHTML = `<h2><strong>${time} SEC</strong></h2>`;
        }else{
            console.log("timer piscio");
            div_timer.innerHTML = ``;
            socket.emit("timer",);
        };
    }, 1000);// 1 secondo
});

socket.on("disc_inattivita",()=>{
    paginaPartita.classList.remove('d-flex');
    paginaPartita.classList.add('d-none');
    finePartita.innerHTML=`
    <h1><strong>UN GIOCATORE E' STATO DISCONNESSO PER INATTIVITA'</strong></h1>
    <p><strong>VERRAI REINDIRIZZATO ALLA PAGINA PRINCIPALE</strong></p>`;
    setTimeout(()=>{
        window.location.href="./homepage.html";
    },5000);

});

socket.on("hit", (data)=>{
    if (data.num===1){
        visualizzaColpo(ctx1, data.x, data.y, true);
    }else{
        visualizzaColpo(ctx1, data.x, data.y, false);
    }
});
socket.on("risultato", (data)=>{
    if (data.num===1){
        caricaRisultato(ctx2, data.x, data.y, true);
        console.log("hai colpito la navicella");
        div_turno.innerHTML=``;
        div_turno.innerHTML=`<h2><strong>TURNO DELL'AVVERSARIO!</strong></h2>`;
    }else{
        caricaRisultato(ctx2, data.x, data.y, false);
        console.log("non hai colpito niente");
        div_turno.innerHTML="";
        div_turno.innerHTML=`<h2><strong>TURNO DELL'AVVERSARIO!</strong></h2>`;
    }
})

socket.on("fine partita", (data)=>{
    if (data === 1){
        //alert("hai vinto");
        setInterval(()=>{
            paginaPartita.classList.remove('d-flex');
            paginaPartita.classList.add('d-none');
            finePartita.innerHTML=`<h1><strong>HAI VINTO!</strong></h1>`;
        },1000);
        setInterval(()=>{
            window.location.href="./homepage.html";
        },5000);
    }else{
        //alert("hai perso");
        setInterval(()=>{
            paginaPartita.classList.remove('d-flex');
            paginaPartita.classList.add('d-none');
            finePartita.innerHTML=`<h1><strong>HAI PERSO!</strong></h1>`;
        },1000);
        setInterval(()=>{
            window.location.href="./homepage.html";
        },5000);
    };
    //window.location.href="./homepage.html";
});

/*function resizeCanvas(canvas) {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
};
window.addEventListener('resize', function(){
    resizeCanvas(primaGriglia);
    resizeCanvas(secondaGriglia);
})*/
