class ReBianco extends PezzoBianco {
    immagine = "immagini/white_king.svg";
    arroccoPossibile = true;

    calcolaMossePossibili(Scacchiera) {
        let mossePossibili = [];

        //controlla tutte le celle nell'area 3x3 attorno al re
        for (let i = this.y-1; i<=this.y+1; i++) {
            if (i<0 || i>7) continue;     //se il re si trova contro il margine superiore o inferiore passa alla y successiva

            for (let j = this.x-1; j<=this.x+1; j++) {
                if (j<0 || j>7) continue;   //se il re si trova contro il margine sinistro o destro passa alla x successiva

                if (i !== this.y || j !== this.x) {
                    if ($("td:eq(" + (j + 8 * i) + ")").html() === "") mossePossibili.push([j, i]); //se la casella è vuota aggiunge la mossa
                    else if ($("td:eq(" + (j + 8 * i) + ")").html().search("black") !== -1) mossePossibili.push([j, i]);    //se nella casella è presente un pezzo nero aggiunge la mossa
                }
            }
        }

        if (this.arroccoPossibile) {        //se questo re può fare l'arrocco
            if ($("td:eq(61)").html() === "" && $("td:eq(62)").html() === "") {     //se sono vuote le caselle tra il re e la posizione della torre a destra
                let pezzo = Scacchiera.getPezzoBianco(7, 7);    //prende il pezzo in posizione 7, 7
                if (pezzo instanceof TorreBianco && pezzo.arroccoPossibile) mossePossibili.push([6, 7]);    //se è una torre bianca e può fare l'arrocco aggiunge la mossa dell'arrocco
            }
            if ($("td:eq(59)").html() === "" && $("td:eq(58)").html() === "" && $("td:eq(57)").html() === "") { //se sono vuote le caselle tra il re e la posizione della torre a sinistra
                let pezzo = Scacchiera.getPezzoBianco(0, 7);    //prende il pezzo in posizione 0, 7
                if (pezzo instanceof TorreBianco && pezzo.arroccoPossibile) mossePossibili.push([2, 7]);    //se è una torre bianca e può fare l'arrocco aggiunge la mossa dell'arrocco
            }
        }

        return mossePossibili;
    }
}