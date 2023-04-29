let s = new Scacchiera();	//crea la scacchiera
s.generaIniziale();
s.puntatore.addEventListener("click", loop);

loop();	//attiva il gioco

function loop() {
	for (let i in s.caselle) {
		s.caselle[i].innerHTML = "";       //svuota le caselle
	}

    let pezzi = s.getAllPieces();	//riceve tutti i pezzi presenti sulla scacchiera
    let pezziElimianti = s.getEliminati();  //riceve tutti i pezzi eliminati

    pezzi.forEach(visualizza); //mostra tutti i pezzi presenti sulla scacchiera

    $("#eliminatibianco").html("");     //svuota la lista dei pezzi eliminati
    $("#eliminatinero").html("");
    pezziElimianti.forEach(visualizzaEliminati);    //riempie la lista dei pezzi eliminati

    s.tick(); //aggiorna logica di gioco
}

function visualizza(value) {	//questa funzione si occupa di visualizzare un solo pezzo (target)
    let colore;
    if (value instanceof PezzoBianco) colore = "bianco";
    else colore = "nero";
    s.caselle[value.x + 8 * value.y].innerHTML = '<img src=' + value.immagine + " class= img"+colore+ ">";
}

function visualizzaEliminati(value) {   //questa funzione si occupa di visualizzare i pezzi eliminati nel rispettivo div
    let colore;
    if (value instanceof PezzoBianco) colore = "bianco";
    else colore = "nero";
    $("#eliminati" + colore).append('<li><img src=' + value.immagine + "></li>");
}

function gira() {
    let val = 180;
    if (s.turnoBianco) val = 0;
    $("#tabScacchiera").css("rotate", val+"deg");
    $("#tabScacchiera td").css("rotate", val+"deg");
}