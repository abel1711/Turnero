

const socket = io();


socket.on('pantalla-publico', ( ult4 = [] )=>{
    const audio = new Audio('../audio/new-ticket.mp3')
    audio.play();

    for( let i = 0; i<=ult4.length-1 ; i++){
        document.querySelector(`#lblTicket${i+1}`).innerText = `Ticket ${ult4[i].numero}`       
        document.querySelector(`#lblEscritorio${i+1}`).innerText = `${ult4[i].escritorio}`       
    }

})