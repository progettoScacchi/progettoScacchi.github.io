let s = new Scacchiera();	//crea la scacchiera
s.generaIniziale();
s.puntatore.addEventListener("click", loop)

loop();	//attiva il gioco

function loop() {
	for (let i in s.caselle) {
		s.caselle[i].innerHTML = "";
	}

    let pezzi = s.getAllPieces();	//riceve tutti i pezzi presenti sulla scacchiera

    pezzi.forEach(visualizza); //mostra tutti i pezzi presenti

    s.tick(); //aggiorna logica di gioco
}

function visualizza(target) {	//questa funzione si occupa di visualizzare un solo pezzo (target)
    s.caselle[target.x + 8 * target.y].innerHTML = '<img src=' + target.immagine + " class= img"+target.colore+ ">";
}