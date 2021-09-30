const ControlTicket = require('../models/models-ticket-control');

const controlTicket = new ControlTicket();


const socketController = (socket) => {

    socket.emit('ultimo-ticket', controlTicket.ultimo)
    socket.emit('pantalla-publico', controlTicket.ultimos4);
    socket.emit('pendientes', controlTicket.tickets.length);
  
    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = controlTicket.siguiente();
        callback( siguiente );
        socket.broadcast.emit('pendientes', controlTicket.tickets.length)
    })

    socket.on('atender-ticket',( {escritorio}, callback )=>{

        if(!escritorio){
            return callback({
                ok: false,
                msg:'El escritorio es obligatorio'
            })
        }

        const ticket = controlTicket.atenderTicket(escritorio);
        socket.broadcast.emit('pantalla-publico', controlTicket.ultimos4);
        socket.emit('pendientes', controlTicket.tickets.length);
        socket.broadcast.emit('pendientes', controlTicket.tickets.length);

        if(!ticket){
            return callback({
                ok: false,
                msg:'No hay mas tickets para atender'
            })
        }else {
            callback({
                ok:true,
                ticket,
            });

        }

    })

 

}



module.exports = {
    socketController
}

