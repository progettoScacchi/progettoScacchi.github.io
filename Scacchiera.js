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
		this.spawn(new ReBianco(7, 6));
		this.spawn(new ReginaNero(7, 5));

		for (let i = 0; i < 7; i++) {
			this.spawn(new PedoneBianco(i, 6));
		}


		//pezzi neri

	}

	getAllPieces() {		//restituisce tutti i pezzi presenti sulla scacchiera
		return this.pezziBianco.concat(this.pezziNero);
	}

	getEliminati() {
		return this.eliminatiBianco.concat(this.eliminatiNero);
	}

	controlloScacco() {
		let Scacchiera = this;
		let trovato = false;		//controllo se ho trovato una mossa che ci rende in scacco

		if (Scacchiera.turnoBianco) {
			let ReX;
			let ReY;

			Scacchiera.pezziBianco.every(function (value) {
				if (value instanceof ReBianco) {
					ReX = value.x;
					ReY = value.y;
					return false;
				}
				return true;
			});

			Scacchiera.pezziNero.every(function (value) {
				let cattura = false;
				let pezzo = null;

				Scacchiera.pezziNero.forEach(function (value) {
					if (value.x === obj.x && value.y === obj.y) Scacchiera.delete(value);
					else if (value instanceof PedoneNero && value.x === obj.x && value.y === obj.y + 1) Scacchiera.delete(value);
				});

				let mosse = value.calcolaMossePossibili(Scacchiera);
				mosse.every(function (value) {
					if (value[0] === ReX && value[1] === ReY) {
						$("td:eq(" + (value[0] + 8*value[1]) + ")").css("backgroundColor", "yellow");
						trovato = true;
						return false;
					}
					return true;
				})

				if (cattura) Scacchiera.spawn(pezzo);

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
					let objX = obj.x;
					let objY = obj.y;
					obj.move(value[0], value[1]);
					$("td:eq(" + (objX + 8*objY) + ")").html("");
					visualizza(obj);
					if (Scacchiera.controlloScacco()) {
						$("td:eq(" + (value[0] + 8*value[1]) + ")").html("");
						obj.move(objX, objY);
						visualizza(obj);
					}
					else {
						obj.move(objX, objY);
						visualizza(obj);
						$("td:eq(" + (value[0] + 8 * value[1]) + ")").html("").css("backgroundColor", "red").one("click", function () {
							obj.move(value[0], value[1]);

							//si muove il pezzo scelto nella casella scelta
							if (Scacchiera.turnoBianco) {
								Scacchiera.pezziNero.forEach(function (value) {
									if (value.x === obj.x && value.y === obj.y) Scacchiera.delete(value);
									else if (value instanceof PedoneNero && value.x === obj.x && value.y === obj.y + 1) Scacchiera.delete(value);
								});
							} else {
								Scacchiera.pezziBianco.forEach(function (value) {
									if (value.x === obj.x && value.y === obj.y) Scacchiera.delete(value);
									else if (value instanceof PedoneBianco && value.x === obj.x && value.y === obj.y - 1) Scacchiera.delete(value);
								});
							}

							//arrocco bianco
							if (obj instanceof ReBianco && obj.arroccoPossibile) {
								if (obj.x === 6 && obj.y === 7) {
									Scacchiera.pezziBianco.every(function (value) {
										if (value.x === 7 && value.y === 7) {
											value.move(5, 7);
											return false;
										}
										return true;
									});
								}
								if (obj.x === 2 && obj.y === 7) {
									Scacchiera.pezziBianco.every(function (value) {
										if (value.x === 0 && value.y === 7) {
											value.move(3, 7);
											return false;
										}
										return true;
									});
								}
							}

							//arrocco nero
							if (obj instanceof ReNero && obj.arroccoPossibile) {
								if (obj.x === 6 && obj.y === 0) {
									Scacchiera.pezziNero.every(function (value) {
										if (value.x === 7 && value.y === 0) {
											value.move(5, 0);
											return false;
										}
										return true;
									});
								}
								if (obj.x === 2 && obj.y === 0) {
									Scacchiera.pezziNero.every(function (value) {
										if (value.x === 0 && value.y === 0) {
											value.move(3, 0);
											return false;
										}
										return true;
									});
								}
							}


							//aggiorniamo i controlli
							if (obj instanceof PedoneBianco || obj instanceof PedoneNero) {
								obj.enPassantPossibile = true;
								obj.hasMoved = true;
							}
							if (obj instanceof TorreBianco || obj instanceof TorreNero || obj instanceof ReBianco || obj instanceof ReNero) {
								obj.arroccoPossibile = false;
							}

							$("td").css("backgroundColor", "").off("click");

							//cambia il turno
							Scacchiera.turnoBianco = !Scacchiera.turnoBianco;
							gira();
						});
					}
				});
			}
		});
		Scacchiera.controlloScacco();
	}
}