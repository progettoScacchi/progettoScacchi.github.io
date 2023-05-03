class ReginaNero extends PezzoNero {
    immagine = "immagini/black_queen.svg";

    calcolaMossePossibili(Scacchiera) {
        let alfiere = new AlfiereNero(this.x, this.y);        //combina le mosse di alfiere e torre
        let torre = new TorreNero(this.x, this.y);

        return alfiere.calcolaMossePossibili(Scacchiera).concat(torre.calcolaMossePossibili(Scacchiera));
    }
}