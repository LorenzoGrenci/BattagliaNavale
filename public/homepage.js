const div_homepage = document.getElementById("tabella_giocatori")
let giocatoreCorrente="alleato"
let giocatoreNum=0
let pronto=false
let nemicoPronto=false
let colpiSparati=-1
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
})