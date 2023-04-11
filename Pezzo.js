class Pezzo {
    constructor(posX, posY) {
        if (posX < 0 || posX > 7 || posY < 0 || posY > 7) throw "Non valido";
        this.x = posX;
        this.y = posY;
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }

    calcolaMossePossibili(Scacchiera){
        return [];
    }
}

class PezzoBianco extends Pezzo {
    colore = "bianco";
}

class PezzoNero extends Pezzo {
    colore = "nero";
}