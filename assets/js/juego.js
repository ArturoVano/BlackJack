
const modulo = (() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J','Q', 'K'];

    let puntosJugadores = [];

    // Referencias HTML
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo'),
          divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');

    
    const inicializarJuego = ( numJugadores = 2 ) => {
        
        deck = crearDeck(); 
        puntosJugadores = [];

        for (let i = 0; i < numJugadores; i++ ) {
             puntosJugadores.push(0);
        }

        puntosHTML.forEach( small => small.innerText = 0 );
        divCartasJugadores.forEach( div => div.innerHTML = '' );

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    }

    // Función que crea una nueva baraja:
    const crearDeck = () => {

        deck = [];

        for ( let i = 2; i <= 10; i++ ) {
            for ( let tipo of tipos ) {
                deck.push( i + tipo );
            } 
        }
        for ( let tipo of tipos ) {
            for ( let esp of especiales ) {
                deck.push( esp + tipo );
            }
        }
        
        return _.shuffle( deck );
    }

    // Función para tomar una carta:
    const pedirCarta = () => {
        if ( deck.length === 0 ) {
            throw 'No quedan cartas';
        }       
        return deck.pop();
    }

    // Función para tomar una carta aleatoria:
    const pedirCartaAleatoria = () => {
        if ( deck.length === 0 ) {
            throw 'No quedan cartas';
        }
        return deck[ Math.floor( Math.random() * deck.length ) ];
    }


    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length - 1);
        return ( isNaN( valor ) ) 
                ? ( valor === 'A' ) ? 11 : 10 
                :  valor * 1;
    }

    // Turno: 0 = 1º jugador, ultimo turno para crupier
    const acoumlarPuntos = ( carta, turno ) => {

        puntosJugadores[turno] += valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno]; 
        return puntosJugadores[turno]
    }

    const crearCarta = ( carta, turno ) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add( 'carta' );
        divCartasJugadores[turno].append( imgCarta );

    }

    const determinarGanador = () => {
        
        const [ ptnMinimos, ptnCrupier] = puntosJugadores;
        
        setTimeout(() => {
            if ( ptnCrupier === ptnMinimos ) {
                alert('Nadie gana');
            } else if ( ptnCrupier > 21 ) {
                alert('Jugador Gana');
            } else if ( ptnCrupier > ptnMinimos ) {
                alert('Crupier gana');
            } else {
                alert('Crupier gana');
            }
        }, 20);
    }

    // Turno Crupier
    const turnoCrupier = ( puntosMinimos ) => {

        let ptnCrupier = 0;

        do {

            const carta = pedirCarta();
            ptnCrupier = acoumlarPuntos( carta, puntosJugadores.length - 1 );
            crearCarta( carta, puntosJugadores.length-1 );

        } while ( (puntosMinimos > ptnCrupier) && (puntosMinimos <= 21) );

        determinarGanador();
    }

    // Eventos
    btnPedir.addEventListener('click', () => {
    
        const carta = pedirCarta();
        acoumlarPuntos( carta, 0 );
        crearCarta( carta, 0 );

        if ( puntosJugadores[0] > 21 ) {
  
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoCrupier( puntosJugadores[0] );
            
        } else if ( puntosJugadores[0] === 21 ) {  

            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoCrupier( puntosJugadores[0] );
            console.log('BLACKJACK!, Ganaste');
        }
    });

    btnDetener.addEventListener('click', () => {

        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoCrupier( puntosJugadores[0] );
    });

    btnNuevo.addEventListener('click', () => {

        inicializarJuego();

    });

    return {
        nuevoJuego: inicializarJuego
    };

})();




