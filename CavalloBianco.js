class CavalloBianco extends PezzoBianco {       //il cavallo si muove a L
    immagine = "immagini/white_knight.svg";

    calcolaMossePossibili(Scacchiera) {
        let mossePossibili = [];

        //controlla le caselle verso il basso
        if (this.y+2 <= 7) {    //se non va oltre il margine inferiore
            if (this.x+1 <= 7) {    //se non va oltre il margine destro
                if ($("td:eq(" + (this.x+1 + 8*(this.y+2)) + ")").html() === "") mossePossibili.push([this.x+1, this.y+2]);
                else if ($("td:eq(" + (this.x+1 + 8*(this.y+2)) + ")").html().search("black") !== -1) mossePossibili.push([this.x+1, this.y+2]);
            }

            if (this.x-1 >= 0) {    //se non va oltre il margine sinistro
                if ($("td:eq(" + (this.x-1 + 8*(this.y+2)) + ")").html() === "") mossePossibili.push([this.x-1, this.y+2]);
                else if ($("td:eq(" + (this.x-1 + 8*(this.y+2)) + ")").html().search("black") !== -1) mossePossibili.push([this.x-1, this.y+2]);
            }
        }

        //controlla le caselle verso l'alto
        if (this.y-2 >= 0) {    //se non va oltre il margine superiore
            if (this.x+1 <= 7) {    //se non va oltre il margine destro
                if ($("td:eq(" + (this.x+1 + 8*(this.y-2)) + ")").html() === "") mossePossibili.push([this.x+1, this.y-2]);
                else if ($("td:eq(" + (this.x+1 + 8*(this.y-2)) + ")").html().search("black") !== -1) mossePossibili.push([this.x+1, this.y-2]);
            }

            if (this.x-1 >= 0) {    //se non va oltre il margine sinistro
                if ($("td:eq(" + (this.x-1 + 8*(this.y-2)) + ")").html() === "") mossePossibili.push([this.x-1, this.y-2]);
                else if ($("td:eq(" + (this.x-1 + 8*(this.y-2)) + ")").html().search("black") !== -1) mossePossibili.push([this.x-1, this.y-2]);
            }
        }


        //controlla le caselle verso destra
        if (this.x+2 <= 7) {    //se non va oltre il margine destro
            if (this.y+1 <= 7) {    //se non va oltre il margine inferiore
                if ($("td:eq(" + (this.x+2 + 8*(this.y+1)) + ")").html() === "") mossePossibili.push([this.x+2, this.y+1]);
                else if ($("td:eq(" + (this.x+2 + 8*(this.y+1)) + ")").html().search("black") !== -1) mossePossibili.push([this.x+2, this.y+1]);
            }

            if (this.y-1 >= 0) {    //se non va oltre il margine superiore
                if ($("td:eq(" + (this.x+2 + 8*(this.y-1)) + ")").html() === "") mossePossibili.push([this.x+2, this.y-1]);
                else if ($("td:eq(" + (this.x+2 + 8*(this.y-1)) + ")").html().search("black") !== -1) mossePossibili.push([this.x+2, this.y-1]);
            }
        }

        //controlla le caselle verso sinistra
        if (this.x-2 >= 0) {    //se non va oltre il margine sinistro
            if (this.y+1 <= 7) {    //se non va oltre il margine inferiore
                if ($("td:eq(" + (this.x-2 + 8*(this.y+1)) + ")").html() === "") mossePossibili.push([this.x-2, this.y+1]);
                else if ($("td:eq(" + (this.x-2 + 8*(this.y+1)) + ")").html().search("black") !== -1) mossePossibili.push([this.x-2, this.y+1]);
            }

            if (this.y-1 >= 0) {    //se non va oltre il margine superiore
                if ($("td:eq(" + (this.x-2 + 8*(this.y-1)) + ")").html() === "") mossePossibili.push([this.x-2, this.y-1]);
                else if ($("td:eq(" + (this.x-2 + 8*(this.y-1)) + ")").html().search("black") !== -1) mossePossibili.push([this.x-2, this.y-1]);
            }
        }

        return mossePossibili;
    }
}