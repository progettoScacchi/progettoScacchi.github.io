class ReNero extends PezzoNero {
    immagine = "immagini/black_king.svg";
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
                    else if ($("td:eq(" + (j + 8 * i) + ")").html().search("white") !== -1) mossePossibili.push([j, i]);
                }
            }
        }

        if (Pezzo.arroccoPossibile) {
            if ($("td:eq(5)").html() === "" && $("td:eq(6)").html() === "") {
                Scacchiera.pezziNero.every(function (value) {
                    if (value.x === 7 && value.y === 0) {
                        if (value.arroccoPossibile) mossePossibili.push([6, 0]);
                        return false;
                    }
                    return true;
                });
            }

            if ($("td:eq(1)").html() === "" && $("td:eq(2)").html() === "" && $("td:eq(3)").html() === "") {
                Scacchiera.pezziNero.every(function (value) {
                    if (value.x === 0 && value.y === 0) {
                        if (value.arroccoPossibile) mossePossibili.push([2, 0]);
                        return false;
                    }
                    return true;
                });
            }
        }

        return mossePossibili;
    }
}