class CavalloBianco extends PezzoBianco {
    immagine = "immagini/white_knight.svg";

    calcolaMossePossibili(Scacchiera) {
        let Pezzo = this;
        let mossePossibili = [];

        if (Pezzo.y+2 <= 7) {
            if (Pezzo.x+1 <= 7) {
                if ($("td:eq(" + (Pezzo.x+1 + 8*(Pezzo.y+2)) + ")").html() === "") mossePossibili.push([Pezzo.x+1, Pezzo.y+2]);
                else if ($("td:eq(" + (Pezzo.x+1 + 8*(Pezzo.y+2)) + ")").html().search("black") !== -1) mossePossibili.push([Pezzo.x+1, Pezzo.y+2]);
            }

            if (Pezzo.x-1 >= 0) {
                if ($("td:eq(" + (Pezzo.x-1 + 8*(Pezzo.y+2)) + ")").html() === "") mossePossibili.push([Pezzo.x-1, Pezzo.y+2]);
                else if ($("td:eq(" + (Pezzo.x-1 + 8*(Pezzo.y+2)) + ")").html().search("black") !== -1) mossePossibili.push([Pezzo.x-1, Pezzo.y+2]);
            }
        }

        if (Pezzo.y-2 >= 0) {
            if (Pezzo.x+1 <= 7) {
                if ($("td:eq(" + (Pezzo.x+1 + 8*(Pezzo.y-2)) + ")").html() === "") mossePossibili.push([Pezzo.x+1, Pezzo.y-2]);
                else if ($("td:eq(" + (Pezzo.x+1 + 8*(Pezzo.y-2)) + ")").html().search("black") !== -1) mossePossibili.push([Pezzo.x+1, Pezzo.y-2]);
            }

            if (Pezzo.x-1 >= 0) {
                if ($("td:eq(" + (Pezzo.x-1 + 8*(Pezzo.y-2)) + ")").html() === "") mossePossibili.push([Pezzo.x-1, Pezzo.y-2]);
                else if ($("td:eq(" + (Pezzo.x-1 + 8*(Pezzo.y-2)) + ")").html().search("black") !== -1) mossePossibili.push([Pezzo.x-1, Pezzo.y-2]);
            }
        }


        if (Pezzo.x+2 <= 7) {
            if (Pezzo.y+1 <= 7) {
                if ($("td:eq(" + (Pezzo.x+2 + 8*(Pezzo.y+1)) + ")").html() === "") mossePossibili.push([Pezzo.x+2, Pezzo.y+1]);
                else if ($("td:eq(" + (Pezzo.x+2 + 8*(Pezzo.y+1)) + ")").html().search("black") !== -1) mossePossibili.push([Pezzo.x+2, Pezzo.y+1]);
            }

            if (Pezzo.y-1 >= 0) {
                if ($("td:eq(" + (Pezzo.x-2 + 8*(Pezzo.y+1)) + ")").html() === "") mossePossibili.push([Pezzo.x-2, Pezzo.y+1]);
                else if ($("td:eq(" + (Pezzo.x-2 + 8*(Pezzo.y+1)) + ")").html().search("black") !== -1) mossePossibili.push([Pezzo.x-2, Pezzo.y+1]);
            }
        }

        if (Pezzo.x-2 >= 0) {
            if (Pezzo.y+1 <= 7) {
                if ($("td:eq(" + (Pezzo.x+2 + 8*(Pezzo.y-1)) + ")").html() === "") mossePossibili.push([Pezzo.x+2, Pezzo.y-1]);
                else if ($("td:eq(" + (Pezzo.x+2 + 8*(Pezzo.y-1)) + ")").html().search("black") !== -1) mossePossibili.push([Pezzo.x+2, Pezzo.y-1]);
            }

            if (Pezzo.y-1 >= 0) {
                if ($("td:eq(" + (Pezzo.x-2 + 8*(Pezzo.y-1)) + ")").html() === "") mossePossibili.push([Pezzo.x-2, Pezzo.y-1]);
                else if ($("td:eq(" + (Pezzo.x-2 + 8*(Pezzo.y-1)) + ")").html().search("black") !== -1) mossePossibili.push([Pezzo.x-2, Pezzo.y-1]);
            }
        }

        return mossePossibili;
    }
}