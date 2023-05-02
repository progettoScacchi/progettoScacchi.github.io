class AlfiereBianco extends PezzoBianco {
    immagine = "immagini/white_bishop.svg";

    calcolaMossePossibili(Scacchiera) {
        let Pezzo = this;
        let mossePossibili = [];

        let mossaX = Pezzo.x;
        let mossaY = Pezzo.y;

        //in alto a sinistra
        while (mossaX > 0 && mossaY > 0) {
            mossaX--;
            mossaY--;
            if ($("td:eq(" + (mossaX + 8 * mossaY ) + ")").html() === "") mossePossibili.push([mossaX, mossaY]);
            else if ($("td:eq(" + (mossaX + 8 * mossaY ) + ")").html().search("black") !== -1) {
                mossePossibili.push([mossaX, mossaY]);
                break;
            }
            else break;
        }

        mossaX = Pezzo.x;
        mossaY = Pezzo.y;

        //in alto a destra
        while (mossaX < 7 && mossaY > 0) {
            mossaX++;
            mossaY--;
            if ($("td:eq(" + (mossaX + 8 * mossaY ) + ")").html() === "") mossePossibili.push([mossaX, mossaY]);
            else if ($("td:eq(" + (mossaX + 8 * mossaY ) + ")").html().search("black") !== -1) {
                mossePossibili.push([mossaX, mossaY]);
                break;
            }
            else break;
        }

        mossaX = Pezzo.x;
        mossaY = Pezzo.y;

        //in basso a destra
        while (mossaX < 7 && mossaY < 7) {
            mossaX++;
            mossaY++;
            if ($("td:eq(" + (mossaX + 8 * mossaY ) + ")").html() === "") mossePossibili.push([mossaX, mossaY]);
            else if ($("td:eq(" + (mossaX + 8 * mossaY ) + ")").html().search("black") !== -1) {
                mossePossibili.push([mossaX, mossaY]);
                break;
            }
            else break;
        }

        mossaX = Pezzo.x;
        mossaY = Pezzo.y;

        //in basso a sinistra
        while (mossaX > 0 && mossaY < 7) {
            mossaX--;
            mossaY++;
            if ($("td:eq(" + (mossaX + 8 * mossaY ) + ")").html() === "") mossePossibili.push([mossaX, mossaY]);
            else if ($("td:eq(" + (mossaX + 8 * mossaY ) + ")").html().search("black") !== -1) {
                mossePossibili.push([mossaX, mossaY]);
                break;
            }
            else break;
        }

        return mossePossibili;
    }
}