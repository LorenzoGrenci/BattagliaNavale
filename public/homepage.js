const div_homepage = document.getElementById("tabella_giocatori")
const cercaPartita = document.getElementById("btn_partita")
let giocatoreCorrente="alleato"
let giocatoreNum=0
let pronto=false
let nemicoPronto=false
let colpiSparati=-1

cercaPartita.addEventListener("click", startCercaPartita);


//cercare la partita
function startCercaPartita(){
    const socket=io();

    //prendere il proprio numero di giocatore
    socket.on("giocatore-numero", num=>{
        if(num==-1){
            div_homepage.innerHTML = "Il server è pieno"
        }else{
            giocatoreNum=parseInt(num);
            if(giocatoreNum==1) giocatoreCorrente="nemico"
            console.log(giocatoreNum)
        }
    });
    //un altro giocatore si è connesso o disconnesso
    socket.on('giocatore-connesso', num =>{
        console.log(`Giocatore numero ${num} si è connesso o disconnesso`);
        giocatoreConnessoODisconnesso(num)
    });

    function giocatoreConnessoODisconnesso(num) {
        let giocatore = `.p${parseInt(num) + 1}`;
        console.log(giocatore);
        document.querySelector(`${giocatore} .connesso span`).classList.toggle('green');
        if(parseInt(num) == giocatoreNum) document.querySelector(giocatore).style.
        fontWeight = 'bold';
    };
}