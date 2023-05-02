class Pezzo {   //classe wrapper di tutti i pezzi (astratta)
    constructor(posX, posY) {   //costruttore crea un pezzo con le coordinate
        if (posX < 0 || posX > 7 || posY < 0 || posY > 7) throw "Non valido";
        this.x = posX;
        this.y = posY;
    }

    move(x, y) {        //muove il pezzo in una posizione
        this.x = x;
        this.y = y;
    }

    calcolaMossePossibili(Scacchiera) {}
}

class PezzoBianco extends Pezzo {   //classe wrapper dei pezzi del bianco   (astratta)
}

class PezzoNero extends Pezzo {     //classwe wrapper dei pezzi del nero   (astratta)
}