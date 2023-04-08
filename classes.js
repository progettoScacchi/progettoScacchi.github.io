class Scacchiera {
	constructor() {
		this.caselle = document.getElementsByTagName("td");
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

	getEliminati() {
		return this.eliminatiBianco.concat(this.eliminatiNero);
	}

	controlloScacco() {
		let Scacchiera = this;
		let trovato = false;

		if (Scacchiera.turnoBianco) {
			let ReX;
			let ReY;

			Scacchiera.pezziBianco.every(function (value) {
				if (value instanceof ReBianco) {
					ReX = value.x;
					ReY = value.y;
					return false;
				}
				else return true;
			});

			Scacchiera.pezziNero.every(function (value) {
				let mosse = value.calcolaMossePossibili(Scacchiera);
				mosse.every(function (value) {
					if (value[0] === ReX && value[1] === ReY) {
						$("td:eq(" + (value[0] + 8*value[1]) + ")").css("backgroundColor", "yellow");

						trovato = true;
						return false;
					}
					else return true;
				})
				return !trovato;
			});
		}
		return trovato;
	}

	tick() {
		//puntatore si riferisce sempre alla scacchiera
		let Scacchiera = this;
		let obj = null;
		let classe;
		let mosse = [];

		//quando si clicca sull'immagine succedono cose
		if (Scacchiera.turnoBianco) classe = "bianco";
		else classe = "nero";

		$(".img"+ classe).one("click", function  () {
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
					if (value instanceof PedoneNero) value.enPassantPossibile = false;
				});
			}
			else {
				Scacchiera.pezziBianco.forEach(function (value) {
					if (value.x === x && value.y === y) obj = value;
					if (value instanceof PedoneBianco) value.enPassantPossibile = false;
				});
			}

			//visualizza quale pezzo è stato premuto
			Scacchiera.caselle[indiceVettore].style.backgroundColor = "gray";

			//calcola e visualizza le mosse possibili del pezzo selezionato
			if ((obj.colore === "bianco" && Scacchiera.turnoBianco) || (obj.colore === "nero" && !Scacchiera.turnoBianco)) {
				mosse = obj.calcolaMossePossibili(Scacchiera);

				mosse.forEach(function (value) {
					let prevX = obj.x;
					let prevY = obj.y;
					obj.move(value[0], value[1]);
					//visualizza(obj);
					//console.log(obj.x + ", " + obj.y)

					if (Scacchiera.controlloScacco()) {
						mosse.splice(mosse.indexOf(value), 1);
						//console.log("AAAAAAA");
						obj.move(prevX, prevY);
						//visualizza(obj);
					}

					else {
						obj.move(prevX, prevY);
						//visualizza(obj);
						$("td:eq(" + (value[0] + 8*value[1]) + ")").css("backgroundColor", "red").one("click", function () {
							obj.move(value[0], value[1]);

							if (Scacchiera.turnoBianco) {
								Scacchiera.pezziNero.forEach(function (value) {
									if (value.x === obj.x && value.y === obj.y) Scacchiera.delete(value);
									else if (value instanceof PedoneNero && value.x === obj.x && value.y === obj.y+1) Scacchiera.delete(value);
								});
							}
							else {
								Scacchiera.pezziBianco.forEach(function (value) {
									if (value.x === obj.x && value.y === obj.y) Scacchiera.delete(value);
									else if (value instanceof PedoneBianco && value.x === obj.x && value.y === obj.y-1) Scacchiera.delete(value);
								});
							}

							if (obj instanceof PedoneBianco || obj instanceof PedoneNero) {
								obj.enPassantPossibile = true;
								obj.hasMoved = true;
							}
							$("td").css("backgroundColor", "").off("click");

							Scacchiera.turnoBianco = !Scacchiera.turnoBianco;
							console.log("AAAAAAA");
							gira();
						});
					}

				});
			}
		});
		Scacchiera.controlloScacco();
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
	enPassantPossibile = false;

	calcolaMossePossibili(Scacchiera) {
		let Pezzo = this;	//puntatore al pezzo
		let occupato = [false, false, false, false, false, false];

		let mossePossibili = [];

		//controlla se le caselle possibili sono occupate
		Scacchiera.getAllPieces().forEach(function (value) {
			if (value.y === Pezzo.y - 1 && value.x === Pezzo.x) occupato[0] = true;
			if (value.y === Pezzo.y - 2 && value.x === Pezzo.x) occupato[1] = true;
			if (value.y === Pezzo.y - 1 && value.x === Pezzo.x - 1 && value.colore === "nero") occupato[2] = true;
			if (value.y === Pezzo.y - 1 && value.x === Pezzo.x + 1 && value.colore === "nero") occupato[3] = true;
			if (value.y === Pezzo.y && value.x === Pezzo.x - 1 && value instanceof PedoneNero && value.enPassantPossibile) occupato[4] = true;
			if (value.y === Pezzo.y && value.x === Pezzo.x + 1 && value instanceof PedoneNero && value.enPassantPossibile) occupato[5] = true;
		});

		//una cella avanti
		if (Pezzo.y !== 0) {
			if (!occupato[0]) {
				mossePossibili.push([this.x, this.y - 1]);

				//due celle avanti
				if (!occupato[1] && !Pezzo.hasMoved)mossePossibili.push([this.x, this.y - 2]);
			}

			//diagonale a sinistra ed en passant a sinistra
			if (occupato[2] || occupato[4]) mossePossibili.push([this.x - 1, this.y - 1]);

			//diagonale a destra ed en passant a destra
			if (occupato[3] || occupato[5]) mossePossibili.push([this.x + 1, this.y - 1]);
		}

		return mossePossibili;
	}
}

class ReBianco extends PezzoBianco {
	immagine = "immagini/white_king.svg";

	calcolaMossePossibili(Scacchiera) {
		let Pezzo = this;
		let mossePossibili = [];

		for (let i = Pezzo.y-1; i<=Pezzo.y+1; i++) {
			if (i<0 || i>7) continue;
			for (let j = Pezzo.x-1; j<=Pezzo.x+1; j++) {
				if (j<0 || j>7) continue;
				if (i !== Pezzo.y || j !== Pezzo.x) {
					if ($("td:eq(" + (j + 8 * i) + ")").html() === "") mossePossibili.push([j, i]);
					else if ($("td:eq(" + (j + 8 * i) + ")").html().search("black") !== -1) mossePossibili.push([j, i]);
				}
			}
		}

		return mossePossibili;
	}
}

class TorreBianco extends PezzoBianco {
	immagine = "immagini/white_rook.svg";

	calcolaMossePossibili(Scacchiera) {
		let Pezzo = this;
		let mossePossibili = [];

		//controllo sopra
		for (let i = Pezzo.y-1; i>=0; i--) {
			if ($("td:eq(" + (Pezzo.x + 8 * i ) + ")").html() === "")  mossePossibili.push([Pezzo.x, i]);
			else if ($("td:eq(" + (Pezzo.x + 8 * i ) + ")").html().search("black") !== -1) {
				mossePossibili.push([Pezzo.x, i]);
				break;
			}
			else break;
		}

		//controllo a destra
		for (let i = Pezzo.x+1; i<=7; i++) {
			if ($("td:eq(" + (i + 8 * Pezzo.y ) + ")").html() === "")  mossePossibili.push([i, Pezzo.y]);
			else if ($("td:eq(" + (i + 8 * Pezzo.y ) + ")").html().search("black") !== -1) {
				mossePossibili.push([i, Pezzo.y]);
				break;
			}
			else break;
		}

		//controllo sotto
		for (let i = Pezzo.y+1; i<=7; i++) {
			if ($("td:eq(" + (Pezzo.x + 8 * i ) + ")").html() === "")  mossePossibili.push([Pezzo.x, i]);
			else if ($("td:eq(" + (Pezzo.x + 8 * i ) + ")").html().search("black") !== -1) {
				mossePossibili.push([Pezzo.x, i]);
				break;
			}
			else break;
		}

		//controllo a sinistra
		for (let i = Pezzo.x-1; i>=0; i--) {
			if ($("td:eq(" + (i + 8 * Pezzo.y ) + ")").html() === "")  mossePossibili.push([i, Pezzo.y]);
			else if ($("td:eq(" + (i + 8 * Pezzo.y ) + ")").html().search("black") !== -1) {
				mossePossibili.push([i, Pezzo.y]);
				break;
			}
			else break;
		}

		return mossePossibili;
	}
}

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

class ReginaBianco extends PezzoBianco{
	immagine = "immagini/white_queen.svg";

	calcolaMossePossibili(Scacchiera) {
		let alfiere = new AlfiereBianco(this.x, this.y);
		let torre = new TorreBianco(this.x, this.y);

		return alfiere.calcolaMossePossibili(Scacchiera).concat(torre.calcolaMossePossibili(Scacchiera));;
	}
}

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

//pezzi neri
class PedoneNero extends PezzoNero {
	immagine = "immagini/black_pawn.svg";
	hasMoved = false;
	enPassantPossibile = false;

	calcolaMossePossibili(Scacchiera) {
		let Pezzo = this;	//puntatore al pezzo
		let occupato = [false, false, false, false, false, false];

		let mossePossibili = [];

		//controlla se le caselle possibili sono occupate
		Scacchiera.getAllPieces().forEach(function (value) {
			if (value.y === Pezzo.y + 1 && value.x === Pezzo.x) occupato[0] = true;
			if (value.y === Pezzo.y + 2 && value.x === Pezzo.x) occupato[1] = true;
			if (value.y === Pezzo.y + 1 && value.x === Pezzo.x - 1 && value.colore === "bianco") occupato[2] = true;
			if (value.y === Pezzo.y + 1 && value.x === Pezzo.x + 1 && value.colore === "bianco") occupato[3] = true;
			if (value.y === Pezzo.y && value.x === Pezzo.x - 1 && value instanceof PedoneBianco && value.enPassantPossibile) occupato[4] = true;
			if (value.y === Pezzo.y && value.x === Pezzo.x + 1 && value instanceof PedoneBianco && value.enPassantPossibile) occupato[5] = true;
		});

		//una cella avanti
		if (Pezzo.y !== 7) {
			if (!occupato[0]) {
				mossePossibili.push([this.x, this.y + 1]);

				//due celle avanti
				if (!occupato[1] && !Pezzo.hasMoved) mossePossibili.push([this.x, this.y + 2]);
			}

			//diagonale a sinistra ed en passant a sinistra
			if (occupato[2] || occupato[4]) mossePossibili.push([this.x - 1, this.y + 1]);

			//diagonale a destra ed en passant a destra
			if (occupato[3] || occupato[5]) mossePossibili.push([this.x + 1, this.y + 1]);
		}

		return mossePossibili;
	}
}

class ReNero extends PezzoNero {
	immagine = "immagini/black_king.svg";

	calcolaMossePossibili(Scacchiera) {
		let Pezzo = this;
		let mossePossibili = [];

		for (let i = Pezzo.y-1; i<=Pezzo.y+1; i++) {
			if (i<0 || i>7) continue;
			for (let j = Pezzo.x-1; j<=Pezzo.x+1; j++) {
				if (j<0 || j>7) continue;
				if (i !== Pezzo.y || j !== Pezzo.x) {
					if ($("td:eq(" + (j + 8 * i) + ")").html() === "") mossePossibili.push([j, i]);
					else if ($("td:eq(" + (j + 8 * i) + ")").html().search("white") !== -1) mossePossibili.push([j, i]);
				}
			}
		}

		return mossePossibili;
	}
}

class TorreNero extends PezzoNero {
	immagine = "immagini/black_rook.svg";

	calcolaMossePossibili(Scacchiera) {
		let Pezzo = this;
		let mossePossibili = [];
		let fineFor = false;

		//controllo sopra
		for (let i = Pezzo.y - 1; i >= 0; i--) {
			if ($("td:eq(" + (Pezzo.x + 8 * i) + ")").html() === "") mossePossibili.push([Pezzo.x, i]);
			else if ($("td:eq(" + (Pezzo.x + 8 * i) + ")").html().search("white") !== -1) {
				mossePossibili.push([Pezzo.x, i]);
				break;
			} else break;
		}

		//controllo a destra
		for (let i = Pezzo.x + 1; i <= 7; i++) {
			if ($("td:eq(" + (i + 8 * Pezzo.y) + ")").html() === "") mossePossibili.push([i, Pezzo.y]);
			else if ($("td:eq(" + (i + 8 * Pezzo.y) + ")").html().search("white") !== -1) {
				mossePossibili.push([i, Pezzo.y]);
				break;
			} else break;
		}

		//controllo sotto
		for (let i = Pezzo.y + 1; i <= 7; i++) {
			if ($("td:eq(" + (Pezzo.x + 8 * i) + ")").html() === "") mossePossibili.push([Pezzo.x, i]);
			else if ($("td:eq(" + (Pezzo.x + 8 * i) + ")").html().search("white") !== -1) {
				mossePossibili.push([Pezzo.x, i]);
				break;
			} else break;
		}

		//controllo a sinistra
		for (let i = Pezzo.x - 1; i >= 0; i--) {
			if ($("td:eq(" + (i + 8 * Pezzo.y) + ")").html() === "") mossePossibili.push([i, Pezzo.y]);
			else if ($("td:eq(" + (i + 8 * Pezzo.y) + ")").html().search("white") !== -1) {
				mossePossibili.push([i, Pezzo.y]);
				break;
			} else break;
		}
		return mossePossibili;
	}
}

class AlfiereNero extends PezzoNero {
	immagine = "immagini/black_bishop.svg";

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
			else if ($("td:eq(" + (mossaX + 8 * mossaY ) + ")").html().search("white") !== -1) {
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
			else if ($("td:eq(" + (mossaX + 8 * mossaY ) + ")").html().search("white") !== -1) {
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
			else if ($("td:eq(" + (mossaX + 8 * mossaY ) + ")").html().search("white") !== -1) {
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
			else if ($("td:eq(" + (mossaX + 8 * mossaY ) + ")").html().search("white") !== -1) {
				mossePossibili.push([mossaX, mossaY]);
				break;
			}
			else break;
		}

		return mossePossibili;
	}
}

class ReginaNero extends PezzoNero {
	immagine = "immagini/black_queen.svg";

	calcolaMossePossibili(Scacchiera) {
		let alfiere = new AlfiereNero(this.x, this.y);
		let torre = new TorreNero(this.x, this.y);

		return alfiere.calcolaMossePossibili(Scacchiera).concat(torre.calcolaMossePossibili(Scacchiera));;
	}
}

class CavalloNero extends PezzoNero {
	immagine = "immagini/black_knight.svg";

	calcolaMossePossibili(Scacchiera) {
		let Pezzo = this;
		let mossePossibili = [];

		if (Pezzo.y + 2 <= 7) {
			if (Pezzo.x + 1 <= 7) {
				if ($("td:eq(" + (Pezzo.x + 1 + 8 * (Pezzo.y + 2)) + ")").html() === "") mossePossibili.push([Pezzo.x + 1, Pezzo.y + 2]);
				else if ($("td:eq(" + (Pezzo.x + 1 + 8 * (Pezzo.y + 2)) + ")").html().search("white") !== -1) mossePossibili.push([Pezzo.x + 1, Pezzo.y + 2]);
			}

			if (Pezzo.x - 1 >= 0) {
				if ($("td:eq(" + (Pezzo.x - 1 + 8 * (Pezzo.y + 2)) + ")").html() === "") mossePossibili.push([Pezzo.x - 1, Pezzo.y + 2]);
				else if ($("td:eq(" + (Pezzo.x - 1 + 8 * (Pezzo.y + 2)) + ")").html().search("white") !== -1) mossePossibili.push([Pezzo.x - 1, Pezzo.y + 2]);
			}
		}

		if (Pezzo.y - 2 >= 0) {
			if (Pezzo.x + 1 <= 7) {
				if ($("td:eq(" + (Pezzo.x + 1 + 8 * (Pezzo.y - 2)) + ")").html() === "") mossePossibili.push([Pezzo.x + 1, Pezzo.y - 2]);
				else if ($("td:eq(" + (Pezzo.x + 1 + 8 * (Pezzo.y - 2)) + ")").html().search("white") !== -1) mossePossibili.push([Pezzo.x + 1, Pezzo.y - 2]);
			}

			if (Pezzo.x - 1 >= 0) {
				if ($("td:eq(" + (Pezzo.x - 1 + 8 * (Pezzo.y - 2)) + ")").html() === "") mossePossibili.push([Pezzo.x - 1, Pezzo.y - 2]);
				else if ($("td:eq(" + (Pezzo.x - 1 + 8 * (Pezzo.y - 2)) + ")").html().search("white") !== -1) mossePossibili.push([Pezzo.x - 1, Pezzo.y - 2]);
			}
		}


		if (Pezzo.x + 2 <= 7) {
			if (Pezzo.y + 1 <= 7) {
				if ($("td:eq(" + (Pezzo.x + 2 + 8 * (Pezzo.y + 1)) + ")").html() === "") mossePossibili.push([Pezzo.x + 2, Pezzo.y + 1]);
				else if ($("td:eq(" + (Pezzo.x + 2 + 8 * (Pezzo.y + 1)) + ")").html().search("white") !== -1) mossePossibili.push([Pezzo.x + 2, Pezzo.y + 1]);
			}

			if (Pezzo.y - 1 >= 0) {
				if ($("td:eq(" + (Pezzo.x - 2 + 8 * (Pezzo.y + 1)) + ")").html() === "") mossePossibili.push([Pezzo.x - 2, Pezzo.y + 1]);
				else if ($("td:eq(" + (Pezzo.x - 2 + 8 * (Pezzo.y + 1)) + ")").html().search("white") !== -1) mossePossibili.push([Pezzo.x - 2, Pezzo.y + 1]);
			}
		}

		if (Pezzo.x - 2 >= 0) {
			if (Pezzo.y + 1 <= 7) {
				if ($("td:eq(" + (Pezzo.x + 2 + 8 * (Pezzo.y - 1)) + ")").html() === "") mossePossibili.push([Pezzo.x + 2, Pezzo.y - 1]);
				else if ($("td:eq(" + (Pezzo.x + 2 + 8 * (Pezzo.y - 1)) + ")").html().search("white") !== -1) mossePossibili.push([Pezzo.x + 2, Pezzo.y - 1]);
			}

			if (Pezzo.y - 1 >= 0) {
				if ($("td:eq(" + (Pezzo.x - 2 + 8 * (Pezzo.y - 1)) + ")").html() === "") mossePossibili.push([Pezzo.x - 2, Pezzo.y - 1]);
				else if ($("td:eq(" + (Pezzo.x - 2 + 8 * (Pezzo.y - 1)) + ")").html().search("white") !== -1) mossePossibili.push([Pezzo.x - 2, Pezzo.y - 1]);
			}
		}

		return mossePossibili;
	}
}

