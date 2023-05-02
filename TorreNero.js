class TorreNero extends PezzoNero {
    immagine = "immagini/black_rook.svg";
    arroccoPossibile = true;

    calcolaMossePossibili(Scacchiera) {
        let Pezzo = this;
        let mossePossibili = [];
        let fineFor = false;

        //controllo sopra
        for (let i = Pezzo.y - 1; i >= 0; i--) {
            if ($("td:eq(" + (Pezzo.x + 8 * i) + ")").html() === "") mossePossibili.push([Pezzo.x, i]);
            else if ($("td:eq(" + (Pezzo.x + 8 * i) + ")").html().search("white") !== -1) {
                mossePossibili.push([Pezzo.x, i]);
                break;
            } else break;
        }

        //controllo a destra
        for (let i = Pezzo.x + 1; i <= 7; i++) {
            if ($("td:eq(" + (i + 8 * Pezzo.y) + ")").html() === "") mossePossibili.push([i, Pezzo.y]);
            else if ($("td:eq(" + (i + 8 * Pezzo.y) + ")").html().search("white") !== -1) {
                mossePossibili.push([i, Pezzo.y]);
                break;
            } else break;
        }

        //controllo sotto
        for (let i = Pezzo.y + 1; i <= 7; i++) {
            if ($("td:eq(" + (Pezzo.x + 8 * i) + ")").html() === "") mossePossibili.push([Pezzo.x, i]);
            else if ($("td:eq(" + (Pezzo.x + 8 * i) + ")").html().search("white") !== -1) {
                mossePossibili.push([Pezzo.x, i]);
                break;
            } else break;
        }

        //controllo a sinistra
        for (let i = Pezzo.x - 1; i >= 0; i--) {
            if ($("td:eq(" + (i + 8 * Pezzo.y) + ")").html() === "") mossePossibili.push([i, Pezzo.y]);
            else if ($("td:eq(" + (i + 8 * Pezzo.y) + ")").html().search("white") !== -1) {
                mossePossibili.push([i, Pezzo.y]);
                break;
            } else break;
        }
        return mossePossibili;
    }
}