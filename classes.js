class Scacchiera {
	constructor() {
		this.caselle = document.getElementsByTagName("td");
		this.immagini = document.getElementsByTagName("img");
		this.pezziBianco = [];
		this.pezziNero = [];
		this.puntatore = document.getElementById("tabScacchiera");
		this.eliminatiBianco = [];
		this.eliminatiNero = [];

		this.turnoBianco = true;
	}

	spawn(pezzo) {						//crea un pezzo
		if (pezzo.colore === 'bianco') this.pezziBianco.push(pezzo);
		else this.pezziNero.push(pezzo);
	}

	delete(pezzo) {
		let Scacchiera = this;
		//elimina un pezzo
		if (pezzo.colore === 'bianco') {
			Scacchiera.pezziBianco.splice(Scacchiera.pezziBianco.indexOf(pezzo), 1);
			Scacchiera.eliminatiBianco.push(pezzo);
		}
		else {
			Scacchiera.pezziNero.splice(Scacchiera.pezziNero.indexOf(pezzo), 1);
			Scacchiera.eliminatiNero.push(pezzo);
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
		this.spawn(new TorreNero(0, 5));

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
		let Scacchiera = this;
		let obj;

		//quando si clicca sull'immagine succedono cose
		$("img").one("click", function  () {
			$("td").css("background-color", "").off("click");

			//trovo l'indice della casella in cui è contenuta l'immagine (this.parentNode) nel vettore delle caselle (puntatore.caselle) ed estrapolo le coordinate
			let indiceVettore = Array.prototype.indexOf.call(Scacchiera.caselle, this.parentNode);
			let x = indiceVettore % 8;
			let y = (indiceVettore - x) / 8;

			//prende il percorso assoluto dell'immagine, lo divide per le barre, prende l'ultima stringa (il nome dell'immagine) e controlla attraverso la prima lettera
			//a quale colore appartiene l'immagine.
			//poi cerca tra tutti gli oggetti quale ha le stesse coordinate dell'immagine
			if (this.src.split("/")[this.src.split("/").length-1][0] === 'b') {
				Scacchiera.pezziNero.forEach(function (value) {
					if (value.x === x && value.y === y) obj = value;
				});
			}
			else {
				Scacchiera.pezziBianco.forEach(function (value) {
					if (value.x === x && value.y === y) obj = value;
				});
			}

			//visualizza quale pezzo è stato premuto
			Scacchiera.caselle[indiceVettore].style.backgroundColor = "gray";



			//calcola e visualizza le mosse possibili del pezzo selezionato
			if ((obj.colore === "bianco" && Scacchiera.turnoBianco) || (obj.colore === "nero" && !Scacchiera.turnoBianco)) {
				let mosse = obj.calcolaMossePossibili(Scacchiera);
				mosse.forEach(function (value) {
					$("td:eq(" + (value[0] + 8*value[1]) + ")").css("backgroundColor", "red").one("click", function () {
						obj.move(value[0], value[1]);
						Scacchiera.turnoBianco = !Scacchiera.turnoBianco;
						if (obj instanceof PedoneBianco || obj instanceof PedoneNero) obj.hasMoved = true;
						$("td").css("backgroundColor", "");
					});
				});
			}

			Scacchiera.getAllPieces().forEach(function (value) {
				if (value.x === obj.x && value.y === obj.y && value !== obj) {
					console.log(value.x + ", " + value.y);
					Scacchiera.delete(value);
				}
			});
		});
	}
}

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

//pezzi bianchi
class PedoneBianco extends PezzoBianco {
	immagine = "immagini/white_pawn.svg";
	hasMoved = false;

	calcolaMossePossibili(Scacchiera) {
		let mosse = [[this.x, this.y - 1], [this.x, this.y - 2], [this.x - 1, this.y - 1], [this.x + 1, this.y - 1]]; //mosse che il pedone può fare in teoria
		let Pezzo = this;	//puntatore al pezzo
		let occupato = [false, false, false, false];

		let mossePossibili = [];

		//controlla se le caselle possibili sono occupate
		Scacchiera.getAllPieces().forEach(function (value) {
			if (value.y === Pezzo.y - 1 && value.x === Pezzo.x) occupato[0] = true;
			if (value.y === Pezzo.y - 2 && value.x === Pezzo.x) occupato[1] = true;
			if (value.y === Pezzo.y - 1 && value.x === Pezzo.x - 1 && value.colore === "nero") occupato[2] = true;
			if (value.y === Pezzo.y - 1 && value.x === Pezzo.x + 1 && value.colore === "nero") occupato[3] = true;
		});

		//una cella avanti
		if (Pezzo.y !== 0) {

			if (!occupato[0]) {
				mossePossibili.push(mosse[0]);

				//due celle avanti
				if (!occupato[1] && !Pezzo.hasMoved)mossePossibili.push(mosse[1]);
			}

			//diagonale a sinistra
			if (occupato[2]) mossePossibili.push(mosse[2]);

			//diagonale a destra
			if (occupato[3]) mossePossibili.push(mosse[3]);
		}

		return mossePossibili;
	}
}

class ReBianco extends PezzoBianco {
	immagine = "immagini/white_king.svg";
}

class ReginaBianco extends PezzoBianco {
	immagine = "immagini/white_queen.svg";
}

class TorreBianco extends PezzoBianco {
	immagine = "immagini/white_rook.svg";
}

class AlfiereBianco extends PezzoBianco {
	immagine = "immagini/white_bishop.svg";
}

class CavalloBianco extends PezzoBianco {
	immagine = "immagini/white_knight.svg";
}

//pezzi neri
class PedoneNero extends PezzoNero {
	immagine = "immagini/black_pawn.svg";
}

class ReNero extends PezzoNero {
	immagine = "immagini/black_king.svg";
}

class ReginaNero extends PezzoNero {
	immagine = "immagini/black_queen.svg";
}

class TorreNero extends PezzoNero {
	immagine = "immagini/black_rook.svg";
}

class AlfiereNero extends PezzoNero {
	immagine = "immagini/black_bishop.svg";
}

class CavalloNero extends PezzoNero {
	immagine = "immagini/black_knight.svg";
}

