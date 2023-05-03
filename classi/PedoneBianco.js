class PedoneBianco extends PezzoBianco {
    immagine = "immagini/white_pawn.svg";
    hasMoved = false;   //controlla se il pedone è stato mosso
    enPassantPossibile = false; //controlla se il pedone sia catturabile con un en Passant

    calcolaMossePossibili(Scacchiera) {
        let mossePossibili = [];    //vettore delle mosse possibili

        if ($("td:eq(" + (this.x + 8 * (this.y - 1)) + ")").html() === "") {    //controlla se è presente un pezzo nella casella sopra
            mossePossibili.push([this.x, this.y - 1]);  //se non è presente inserisce la mossa nel vettore

            if ($("td:eq(" + (this.x + 8 * (this.y - 2)) + ")").html() === "" && !this.hasMoved) { //controlla se è presente un pezzo due caselle sopra ma solo se il pedone non è ancora stato mosso
                mossePossibili.push([this.x, this.y - 2]);  //se non è presente inserisce la mossa nel vettore
            }
        }

        if ($("td:eq(" + (this.x - 1 + 8 * (this.y - 1)) + ")").html().search("black") !== -1) { //controlla se è presente un pezzo nero in alto a sinistra
            mossePossibili.push([this.x - 1, this.y - 1]); //se è presente inserisce la mossa nel vettore
        }

        if ($("td:eq(" + (this.x + 1 + 8 * (this.y - 1)) + ")").html().search("black") !== -1) {   //controlla se è presente un pezzo nero in alto a destra
            mossePossibili.push([this.x + 1, this.y - 1]); //se è presente inserisce la mossa nel vettore
        }

        let diagonale = Scacchiera.getPezzoNero(this.x - 1, this.y);    //restituisce il pezzo che si trova a sinistra del pedone
        //se il pezzo è un pedone catturabile con en passant aggiunge la mossa
        if (diagonale instanceof PedoneNero && diagonale.enPassantPossibile) mossePossibili.push([this.x - 1, this.y - 1]);

        diagonale = Scacchiera.getPezzoNero(this.x + 1, this.y);        //restituisce il this che si trova a destra del pedone
        //se il this è un pedone catturabile con en passant aggiunge la mossa
        if (diagonale instanceof PedoneNero && diagonale.enPassantPossibile) mossePossibili.push([this.x + 1, this.y - 1]);

        return mossePossibili;
    }
}