const nuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');

const socket = io();


socket.on('connect', () => {

    btnCrear.disabled = false;

});

socket.on('disconnect', () => {
    
    btnCrear.disabled = true;
});

socket.on('ultimo-ticket',( ultimoTicket )=>{
    
    nuevoTicket.innerText = 'Ticket ' + ultimoTicket;

})


btnCrear.addEventListener( 'click', () => {

    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        nuevoTicket.innerText = ticket;
    });

});