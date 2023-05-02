class ReginaBianco extends PezzoBianco{
    immagine = "immagini/white_queen.svg";

    calcolaMossePossibili(Scacchiera) {
        let alfiere = new AlfiereBianco(this.x, this.y);        //combina le mosse di alfiere e torre
        let torre = new TorreBianco(this.x, this.y);

        return alfiere.calcolaMossePossibili(Scacchiera).concat(torre.calcolaMossePossibili(Scacchiera));
    }
}