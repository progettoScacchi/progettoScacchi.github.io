class ReBianco extends PezzoBianco {
    immagine = "immagini/white_king.svg";
    arroccoPossibile = true;

    calcolaMossePossibili(Scacchiera) {
        let Pezzo = this;
        let mossePossibili = [];

        for (let i = Pezzo.y-1; i<=Pezzo.y+1; i++) {
            if (i<0 || i>7) continue;
            for (let j = Pezzo.x-1; j<=Pezzo.x+1; j++) {
                if (j<0 || j>7) continue;
                if (i !== Pezzo.y || j !== Pezzo.x) {
                    if ($("td:eq(" + (j + 8 * i) + ")").html() === "") mossePossibili.push([j, i]);
                    else if ($("td:eq(" + (j + 8 * i) + ")").html().search("black") !== -1) mossePossibili.push([j, i]);
                }
            }
        }

        if (Pezzo.arroccoPossibile) {
            if ($("td:eq(61)").html() === "" && $("td:eq(62)").html() === "") {
                Scacchiera.pezziBianco.every(function (value) {
                    if (value.x === 7 && value.y === 7) {
                        if (value.arroccoPossibile) mossePossibili.push([6, 7]);
                        return false;
                    }
                    return true;
                });
            }

            if ($("td:eq(59)").html() === "" && $("td:eq(58)").html() === "" && $("td:eq(57)").html() === "") {
                Scacchiera.pezziBianco.every(function (value) {
                    if (value.x === 0 && value.y === 7) {
                        if (value.arroccoPossibile) mossePossibili.push([2, 7]);
                        return false;
                    }
                    return true;
                });
            }
        }

        return mossePossibili;
    }
}