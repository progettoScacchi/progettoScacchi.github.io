class ReginaNero extends PezzoNero {
    immagine = "immagini/black_queen.svg";

    calcolaMossePossibili(Scacchiera) {
        let alfiere = new AlfiereNero(this.x, this.y);
        let torre = new TorreNero(this.x, this.y);

        return alfiere.calcolaMossePossibili(Scacchiera).concat(torre.calcolaMossePossibili(Scacchiera));
    }
}