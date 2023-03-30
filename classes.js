class Scacchiera {
	constructor() {
		this.caselle = document.getElementsByTagName("td");
		this.immagini = document.getElementsByTagName("img");
		this.pezziBianco = [];
		this.pezziNero = [];
		this.puntatore = document.getElementById("tabScacchiera");
		this.eliminatiBianco = [];
		this.eliminatiNero = [];
	}

	spawn(pezzo) {						//crea un pezzo
		if (pezzo.immagine[9] === 'w') this.pezziBianco.push(pezzo);
		else this.pezziNero.push(pezzo);
	}

	delete(pezzo) {						//elimina un pezzo
		if (pezzo.immagine[9] === 'w') {
			this.pezziBianco.splice(this.pezziBianco.indexOf(pezzo), 0);
			this.eliminatiBianco.push(pezzo);
		}
		else {
			this.pezziNero.splice(this.pezziNero.indexOf(pezzo), 0);
			this.eliminatiNero.push(pezzo);
		}
	}

	generaIniziale() {							//genera la disposizione iniziale
		//genera pezzi bianchi
		this.spawn(new TorreBianco(0, 7))
		this.spawn(new CavalloBianco(1, 7));
		this.spawn(new AlfiereBianco(2, 7));
		this.spawn(new ReginaBianco(3, 7));
		this.spawn(new ReBianco(4, 7));
		this.spawn(new AlfiereBianco(5, 7));
		this.spawn(new CavalloBianco(6, 7));
		this.spawn(new TorreBianco(7, 7));
		for (let i = 0; i < 8; i++) {
			this.spawn(new PedoneBianco(i, 6));
		}

		//pezzi neri
		this.spawn(new TorreNero(0, 0));
		this.spawn(new CavalloNero(1, 0));
		this.spawn(new AlfiereNero(2, 0));
		this.spawn(new ReginaNero(3, 0));
		this.spawn(new ReNero(4, 0));
		this.spawn(new AlfiereNero(5, 0));
		this.spawn(new CavalloNero(6, 0));
		this.spawn(new TorreNero(7, 0));
		for (let i = 0; i < 8; i++) {
			this.spawn(new PedoneNero(i, 1));
		}
	}

	getAllPieces() {		//restituisce tutti i pezzi presenti sulla scacchiera
		return this.pezziBianco.concat(this.pezziNero);
	}

	tick() {
		//puntatore si riferisce sempre alla scacchiera
		let puntatore = this;
		let obj;

		//quando si clicca sull'immagine succedono cose
		$("img").click(function  () {

			//trovo l'indice della casella in cui è contenuta l'immagine (this.parentNode) nel vettore delle caselle (puntatore.caselle) ed estrapolo le coordinate
			let indiceVettore = Array.prototype.indexOf.call(puntatore.caselle, this.parentNode);
			let x = indiceVettore % 8;
			let y = (indiceVettore - x) / 8;


			//prende il percorso assoluto dell'immagine, lo divide per le barre, prende l'ultima stringa (il nome dell'immagine) e controlla attraverso la prima lettera
			//a quale colore appartiene l'immagine.
			//poi cerca tra tutti gli oggetti quale ha le stesse coordinate dell'immagine
			if (this.src.split("/")[this.src.split("/").length-1][0] === 'b') {
				puntatore.pezziNero.forEach(function (value) {
					if (value.x === x && value.y === y) obj = value;
				});
			}
			else {
				puntatore.pezziBianco.forEach(function (value) {
					if (value.x === x && value.y === y) obj = value;
				});
			}

			puntatore.caselle[indiceVettore-8].style.backgroundColor = "red";
		});
	}
}

class Pezzo {
	constructor(posX, posY) {
		if (posX < 0 || posX > 7 || posY < 0 || posY > 7) throw "Non valido";
		this.x = posX;
		this.y = posY;
	}

	pos() {
		return this.x, this.y;
	}
}

//pezzi bianchi
class PedoneBianco extends Pezzo {
	immagine = "immagini/white_pawn.svg";
	mosse = [(this.x, this.y - 1), (this.x, this.y - 2), (this.x - 1, this.y - 1), (this.x + 1, this.y - 1)];		//mosse che il pedone può fare in teoria
	mossePossibili = [];

	calcolaMossePossibili(a, b) {
		for(let i = 0; i<this.mosse.length; i++) {
			for (let j = 0; j<a; j++) {
				if (a[j].x != this.mosse[i][0] && a[j].y != this.mosse[i][1]) this.mossePossibili.push(mosse[i]);
			}
		}
	}
}

class ReBianco extends Pezzo {
	immagine = "immagini/white_king.svg";
}

class ReginaBianco extends Pezzo {
	immagine = "immagini/white_queen.svg";
}

class TorreBianco extends Pezzo {
	immagine = "immagini/white_rook.svg";
}

class AlfiereBianco extends Pezzo {
	immagine = "immagini/white_bishop.svg";
}

class CavalloBianco extends Pezzo {
	immagine = "immagini/white_knight.svg";
}

//pezzi neri
class PedoneNero extends Pezzo {
	immagine = "immagini/black_pawn.svg";
}

class ReNero extends Pezzo {
	immagine = "immagini/black_king.svg";
}

class ReginaNero extends Pezzo {
	immagine = "immagini/black_queen.svg";
}

class TorreNero extends Pezzo {
	immagine = "immagini/black_rook.svg";
}

class AlfiereNero extends Pezzo {
	immagine = "immagini/black_bishop.svg";
}

class CavalloNero extends Pezzo {
	immagine = "immagini/black_knight.svg";
}

