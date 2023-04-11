class PedoneNero extends PezzoNero {
    immagine = "immagini/black_pawn.svg";
    hasMoved = false;
    enPassantPossibile = false;

    calcolaMossePossibili(Scacchiera) {
        let Pezzo = this;	//puntatore al pezzo
        let occupato = [false, false, false, false, false, false];

        let mossePossibili = [];

        //controlla se le caselle possibili sono occupate
        Scacchiera.getAllPieces().forEach(function (value) {
            if (value.y === Pezzo.y + 1 && value.x === Pezzo.x) occupato[0] = true;
            if (value.y === Pezzo.y + 2 && value.x === Pezzo.x) occupato[1] = true;
            if (value.y === Pezzo.y + 1 && value.x === Pezzo.x - 1 && value.colore === "bianco") occupato[2] = true;
            if (value.y === Pezzo.y + 1 && value.x === Pezzo.x + 1 && value.colore === "bianco") occupato[3] = true;
            if (value.y === Pezzo.y && value.x === Pezzo.x - 1 && value instanceof PedoneBianco && value.enPassantPossibile) occupato[4] = true;
            if (value.y === Pezzo.y && value.x === Pezzo.x + 1 && value instanceof PedoneBianco && value.enPassantPossibile) occupato[5] = true;
        });

        //una cella avanti
        if (Pezzo.y !== 7) {
            if (!occupato[0]) {
                mossePossibili.push([this.x, this.y + 1]);

                //due celle avanti
                if (!occupato[1] && !Pezzo.hasMoved) mossePossibili.push([this.x, this.y + 2]);
            }

            //diagonale a sinistra ed en passant a sinistra
            if (occupato[2] || occupato[4]) mossePossibili.push([this.x - 1, this.y + 1]);

            //diagonale a destra ed en passant a destra
            if (occupato[3] || occupato[5]) mossePossibili.push([this.x + 1, this.y + 1]);
        }

        return mossePossibili;
    }
}