    $("#bottone").click(avviaGame); 
    $("#bottoneRestart").hide();
    let scacchiera = null;

    
function avviaGame(){
    $("#bottone").css("animation","fadeOut 1.5s;");

    setTimeout(function() { $("#bottone").hide(); }, 1500)

    scacchiera = new Scacchiera();	//crea l'oggetto scacchiera

    scacchiera.generaIniziale();    //genera la configurazione iniziale della partita
    $("#tabScacchiera").click(loop);  //aggiunge un gestore dell'evento click sulla scacchiera
    loop();	//attiva il gioco

    $("#bottoneRestart").show().click(function(){  //gestione del tasto per fare restart

        $("#spazioDiGioco").html("");
        delete scacchiera;
        scacchiera = new Scacchiera();
        scacchiera.generaIniziale();   
        $("#tabScacchiera").click(loop);  
        loop();	
    });
}

function loop() {
    $("td").html("");   //svuota le caselle

    let pezzi = scacchiera.pezziBianco.concat(scacchiera.pezziNero);	//riceve tutti i pezzi presenti sulla scacchiera
  
    let pezziEliminati = scacchiera.eliminatiBianco.concat(scacchiera.eliminatiNero);  //riceve tutti i pezzi eliminati

    

    pezzi.forEach(visualizza); //mostra tutti i pezzi presenti sulla scacchiera

    $("#eliminatibianco").html("");     //svuota la lista dei pezzi eliminati
    $("#eliminatinero").html("");
    pezziEliminati.forEach(visualizzaEliminati);    //riempie la lista dei pezzi eliminati

    scacchiera.tick(); //aggiorna logica di gioco
}

function visualizza(value) {	//questa funzione si occupa di visualizzare un solo pezzo (target)
    let colore;
    if (value instanceof PezzoBianco) colore = "bianco";
    else colore = "nero";
    $("td:eq(" + (value.x + 8 * value.y) + ")").html('<img src=' + value.immagine + " class= img"+colore+ ">");
}

function visualizzaEliminati(value) {   //questa funzione si occupa di visualizzare i pezzi eliminati nel rispettivo div
    let colore;
    if (value instanceof PezzoBianco) colore = "bianco";
    else colore = "nero";
    
    $("#eliminati" + colore).append('<li><img src=' + value.immagine + "></li>");
}