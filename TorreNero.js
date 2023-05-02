class TorreNero extends PezzoNero {
    immagine = "immagini/black_rook.svg";
    arroccoPossibile = true;

    calcolaMossePossibili(Scacchiera) {
        let mossePossibili = [];        //vettore delle mosse possibili

        //controllo sopra
        for (let i = this.y-1; i>=0; i--) {     //controlla tutte le celle con la stessa x sopra alla torre
            if ($("td:eq(" + (this.x + 8 * i ) + ")").html() === "")  mossePossibili.push([this.x, i]); //se la cella è vuota aggiunge la mossa
            else if ($("td:eq(" + (this.x + 8 * i ) + ")").html().search("white") !== -1) {     //se nella cella è presente un pezzo bianco aggiunge la mossa e termina il ciclo
                mossePossibili.push([this.x, i]);
                break;
            }
            else break; //se nella cella è presente un pezzo nero termina il ciclo
        }

        //controllo a destra
        for (let i = this.x+1; i<=7; i++) {     //controlla tutte le celle con la stessa y a destra alla torre
            if ($("td:eq(" + (i + 8 * this.y ) + ")").html() === "")  mossePossibili.push([i, this.y]); //se la cella è vuota aggiunge la mossa
            else if ($("td:eq(" + (i + 8 * this.y ) + ")").html().search("white") !== -1) {  //se nella cella è presente un pezzo bianco aggiunge la mossa e termina il ciclo
                mossePossibili.push([i, this.y]);
                break;
            }
            else break; //se nella cella è presente un pezzo nero termina il ciclo
        }

        //controllo sotto
        for (let i = this.y+1; i<=7; i++) {     //controlla tutte le celle con la stessa x sotto alla torre
            if ($("td:eq(" + (this.x + 8 * i ) + ")").html() === "")  mossePossibili.push([this.x, i]); //se la cella è vuota aggiunge la mossa
            else if ($("td:eq(" + (this.x + 8 * i ) + ")").html().search("white") !== -1) { //se nella cella è presente un pezzo bianco aggiunge la mossa e termina il ciclo
                mossePossibili.push([this.x, i]);
                break;
            }
            else break; //se nella cella è presente un pezzo nero termina il ciclo
        }

        //controllo a sinistra
        for (let i = this.x-1; i>=0; i--) { //controlla tutte le celle con la stessa y a sinistra alla torre
            if ($("td:eq(" + (i + 8 * this.y ) + ")").html() === "")  mossePossibili.push([i, this.y]); //se la cella è vuota aggiunge la mossa
            else if ($("td:eq(" + (i + 8 * this.y ) + ")").html().search("white") !== -1) { //se nella cella è presente un pezzo bianco aggiunge la mossa e termina il ciclo
                mossePossibili.push([i, this.y]);
                break;
            }
            else break; //se nella cella è presente un pezzo nero termina il ciclo
        }

        return mossePossibili;
    }
}