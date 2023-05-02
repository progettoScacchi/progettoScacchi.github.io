class AlfiereNero extends PezzoNero {
    immagine = "immagini/black_bishop.svg";

    calcolaMossePossibili(Scacchiera) {
        let mossePossibili = [];

        let mossaX = this.x;        //usiamo due variabili per testare le mosse in diagonale
        let mossaY = this.y;

        //in alto a sinistra
        while (mossaX > 0 && mossaY > 0) { //controlla tutte le celle con in alto a sinistra dell'alfiere
            mossaX--; //decrementa x e y
            mossaY--;

            if ($("td:eq(" + (mossaX + 8 * mossaY ) + ")").html() === "") mossePossibili.push([mossaX, mossaY]);    //se la cella è vuota aggiunge la mossa
            else if ($("td:eq(" + (mossaX + 8 * mossaY ) + ")").html().search("white") !== -1) { //se nella cella è presente un pezzo bianco aggiunge la mossa ed esce dal ciclo
                mossePossibili.push([mossaX, mossaY]);
                break;
            }
            else break; //se nella cella è presente un pezzo nero esce dal ciclo
        }

        mossaX = this.x;
        mossaY = this.y;

        //in alto a destra
        while (mossaX < 7 && mossaY > 0) { //controlla tutte le celle con in alto a destra dell'alfiere
            mossaX++; //incrementa x e decrementa y
            mossaY--;

            if ($("td:eq(" + (mossaX + 8 * mossaY ) + ")").html() === "") mossePossibili.push([mossaX, mossaY]); //se la cella è vuota aggiunge la mossa
            else if ($("td:eq(" + (mossaX + 8 * mossaY ) + ")").html().search("white") !== -1) { //se nella cella è presente un pezzo bianco aggiunge la mossa ed esce dal ciclo
                mossePossibili.push([mossaX, mossaY]);
                break;
            }
            else break; //se nella cella è presente un pezzo nero esce dal ciclo
        }

        mossaX = this.x;
        mossaY = this.y;

        //in basso a destra
        while (mossaX < 7 && mossaY < 7) { //controlla tutte le celle con in basso a destra dell'alfiere
            mossaX++; //incrementa x e y
            mossaY++;

            if ($("td:eq(" + (mossaX + 8 * mossaY ) + ")").html() === "") mossePossibili.push([mossaX, mossaY]); //se la cella è vuota aggiunge la mossa
            else if ($("td:eq(" + (mossaX + 8 * mossaY ) + ")").html().search("white") !== -1) { //se nella cella è presente un pezzo bianco aggiunge la mossa ed esce dal ciclo
                mossePossibili.push([mossaX, mossaY]);
                break;
            }
            else break; //se nella cella è presente un pezzo nero esce dal ciclo
        }

        mossaX = this.x;
        mossaY = this.y;

        //in basso a sinistra
        while (mossaX > 0 && mossaY < 7) { //controlla tutte le celle con in basso a sinistra dell'alfiere
            mossaX--; //decrementa x e incrementa y
            mossaY++;

            if ($("td:eq(" + (mossaX + 8 * mossaY ) + ")").html() === "") mossePossibili.push([mossaX, mossaY]); //se la cella è vuota aggiunge la mossa
            else if ($("td:eq(" + (mossaX + 8 * mossaY ) + ")").html().search("white") !== -1) { //se nella cella è presente un pezzo bianco aggiunge la mossa ed esce dal ciclo
                mossePossibili.push([mossaX, mossaY]);
                break;
            }
            else break; //se nella cella è presente un pezzo nero esce dal ciclo
        }

        return mossePossibili;
    }
}