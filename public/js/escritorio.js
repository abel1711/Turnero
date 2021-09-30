
const socket = io();
//Ref al html
const h1Escritorio = document.querySelector('h1');
const btnAtender   = document.querySelector('button');
const atendiendoA  = document.querySelector('small');
const divAlerta    = document.querySelector('.alert');
const ticketsPendientes   = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams ( window.location.search );

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('el parametro escritorio es obligatorio')
}

const escritorio = searchParams.get('escritorio');
h1Escritorio.innerText = escritorio;
divAlerta.style.display = 'none';

socket.on('connect', () => {

    btnAtender.disabled = false;

});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

socket.on('ultimo-ticket',( ultimoTicket )=>{
    
    // nuevoTicket.innerText = 'Ticket ' + ultimoTicket;

})

socket.on('pendientes', (pendientes, callback)=>{

    if(!pendientes){
        divAlerta.style.display = '';
        atendiendoA.innerText = 'Nadie para atender';
        ticketsPendientes.style.display = 'none';
    }else{
        ticketsPendientes.style.display = '';
        ticketsPendientes.innerText = pendientes;
        divAlerta.style.display = 'none';
    }
})

socket.on('siguiente-ticket', (arg , callback )=>{
    console.log('hay nuevo tickes')
})

btnAtender.addEventListener( 'click', () => {

    socket.emit( 'atender-ticket',  {escritorio} , ( {ok, ticket} ) => {

        // ticketsPendientes.innerText = pendientes;

        if(!ok){
            divAlerta.style.display = '';
            atendiendoA.innerText = 'Nadie para atender';
            return;            
        }else{
            atendiendoA.innerText = 'Ticket '+ ticket.numero;
        }

    });

  
});