class PedoneBianco extends PezzoBianco {
    immagine = "immagini/white_pawn.svg";
    hasMoved = false;   //controlla se il pedone è stato mosso
    enPassantPossibile = false; //controlla se il pedone sia catturabile con un en Passant

    calcolaMossePossibili(Scacchiera) {
        let Pezzo = this;	//puntatore al pezzo
        let mossePossibili = [];

        /*
        //controlla se le caselle possibili sono occupate
        Scacchiera.getAllPieces().forEach(function (value) {
            if (value.y === Pezzo.y && value.x === Pezzo.x - 1 && value instanceof PedoneNero && value.enPassantPossibile) occupato[4] = true;
            if (value.y === Pezzo.y && value.x === Pezzo.x + 1 && value instanceof PedoneNero && value.enPassantPossibile) occupato[5] = true;
        });
        */

        if ($("td:eq(" + (Pezzo.x + 8 * (Pezzo.y-1)) + ")").html() === "") {    //controlla se è presente un pezzo nella casella sopra
            mossePossibili.push([this.x, this.y - 1]);  //se non è presente inserisce la mossa nel vettore

            if ($("td:eq(" + (Pezzo.x + 8 * (Pezzo.y-2)) + ")").html() === "" && !Pezzo.hasMoved) { //controlla se è presente un pezzo due caselle sopra ma solo se il pedone non è ancora stato mosso
                mossePossibili.push([this.x, this.y - 2]);  //se non è presente inserisce la mossa nel vettore
            }
        }

        if ($("td:eq(" + (Pezzo.x-1 + 8 * (Pezzo.y-1)) + ")").html().search("black") !== -1) { //controlla se è presente un pezzo nero in alto a sinistra
            mossePossibili.push([this.x - 1, this.y - 1]); //se è presente inserisce la mossa nel vettore
        }

        if ($("td:eq(" + (Pezzo.x+1 + 8 * (Pezzo.y-1)) + ")").html().search("black") !== -1) {   //controlla se è presente un pezzo nero in alto a destra
            mossePossibili.push([this.x + 1, this.y - 1]); //se è presente inserisce la mossa nel vettore
        }





        return mossePossibili;
    }
}