const path = require('path');
const fs = require('fs');

class Ticket {
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class ControlTicket {


    constructor(){

        this.ultimo   = 0;
        this.hoy      = new Date().getDate();
        this.tickets  = [];
        this.ultimos4 = [];
       
        this.init();
    }

    get toJson(){
        return {

            ultimo : this.ultimo,
            hoy : this.hoy,
            tickets : this.tickets,
            ultimos4 : this.ultimos4

        }
    }

    init (){
       
        const {hoy, tickets, ultimo, ultimos4} = require('../db/db.data.json');

        if(hoy === this.hoy){
            this.ultimo = ultimo;
            this.hoy = hoy;
            this.tickets = tickets;
            this.ultimos4 = ultimos4
        }else {
            this.guardarDB();
        }
    }

    guardarDB(){
        
        const pathArchivo = path.join(__dirname,'../db/db.data.json');
        fs.writeFileSync(pathArchivo, JSON.stringify(this.toJson));

    }

    siguiente(){
        this.ultimo += 1;
        const ticket = new Ticket( this.ultimo, null);
        this.tickets.push(ticket);

        this.guardarDB();

        return 'Ticket' +' '+ ticket.numero;
    }

    atenderTicket( escritorio){

        if(this.tickets.length === 0){
            return null;
        }

        const ticket = this.tickets.shift();//retiro el primer ticket del arreglo de tickes
        ticket.escritorio = escritorio;//le asigno el escritorio que quiere atenderlo

        this.ultimos4.unshift(ticket);//ingreso el ticket al inicio del arreglo para poder mostrarlo por la pantalla
        
        if(this.ultimos4.length > 4){
            this.ultimos4.pop();//booro el ultimo elemento del array
            // this.tickets.slice(-1,1) de esta forma es lo mismo, le indico el ultima posicion del arreglo y que quiero eliminar uno
        }
        
        this.guardarDB();

        return ticket;
    }
}


module.exports = ControlTicket;