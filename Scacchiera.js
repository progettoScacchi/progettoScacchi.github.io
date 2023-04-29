class Scacchiera {
	constructor() {
		this.caselle = document.getElementsByTagName("td");
		this.pezziBianco = [];
		this.pezziNero = [];
		this.puntatore = document.getElementById("tabScacchiera");
		this.eliminatiBianco = [];
		this.eliminatiNero = [];
		this.turnoBianco = true;
		this.turnoNero = false;

		this.reNero = null;
		this.reBianco = null;

		this.stallo = false;
		this.scacco = false;
	}

	spawn(pezzo) {						//crea un pezzo
		if (pezzo instanceof PezzoBianco) this.pezziBianco.push(pezzo);
		else this.pezziNero.push(pezzo);
	}

	delete(pezzo) {
		let Scacchiera = this;
		//elimina un pezzo
		if (pezzo instanceof PezzoBianco) {
			Scacchiera.pezziBianco.splice(Scacchiera.pezziBianco.indexOf(pezzo), 1);
			Scacchiera.eliminatiBianco.push(pezzo);
		}
		else {
			Scacchiera.pezziNero.splice(Scacchiera.pezziNero.indexOf(pezzo), 1);
			Scacchiera.eliminatiNero.push(pezzo);
		}
	}

	generaIniziale() {							//genera la disposizione iniziale
		this.reBianco = new ReBianco(0, 6);
		this.reNero = new ReNero(0, 0);

		//genera pezzi bianchi
		/*
		this.spawn(new TorreBianco(0, 7));
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
		*/

		this.spawn(new PedoneBianco(7, 2));
		this.spawn(new PedoneNero(6, 1))

		this.spawn(this.reNero);
		this.spawn(this.reBianco);
	}

	getAllPieces() {		//restituisce tutti i pezzi presenti sulla scacchiera
		return this.pezziBianco.concat(this.pezziNero);
	}

	getEliminati() {
		return this.eliminatiBianco.concat(this.eliminatiNero);
	}

	getPezzoBianco(posX, posY) {

	}

	getPezzoNero(posX, posY) {

	}

	controlloScacco(gen) {
		let Scacchiera = this;
		let trovato = false;		//controllo se ho trovato una mossa che ci rende in scacco

		let pezzoCatturato = null;

		if (Scacchiera.turnoBianco) {
			//scorre tutti i pezzi del bianco

			let torreDx = false;
			let torreSx = false;
			Scacchiera.pezziBianco.every(function (value) {
				if (value instanceof TorreBianco && value.x === 7) torreDx = value.arroccoPossibile;
				if (value instanceof TorreBianco && value.x === 0) torreSx = value.arroccoPossibile;
				//scorre tutti i pezzi del nero e se trova che uno sovrappone uno dei pezzi del bianco lo elimina temporaneamente
				//questo serve a contare in caso di scacco anche quelle mosse che rimuovono lo scacco catturando un pezzo
				Scacchiera.pezziNero.every(function (target) {
					if (value.x === target.x && value.y === target.y) {
						pezzoCatturato = target;
						Scacchiera.delete(target);
						Scacchiera.eliminatiNero.pop();
						return false;
					}
					return true;
				});
				return true;
			});


			Scacchiera.pezziNero.every(function (value) {
				let mosse = value.calcolaMossePossibili(Scacchiera);
				mosse.every(function (value) {
					if (value[0] === Scacchiera.reBianco.x && value[1] === Scacchiera.reBianco.y) {
						trovato = true;
						return false;
					}
					if (Scacchiera.reBianco.y === 7 && Scacchiera.reBianco.arroccoPossibile) {
						if (Scacchiera.reBianco.x === 6 && torreDx) {
							if (value[0] === 5 && value[1] === 7) {
								//62 è la coordinata del Re dopo l'arrocco a destra già calcolata in indice unico
								trovato = true;
								return false;
							}
						}
						if (Scacchiera.reBianco.x === 2 && torreSx) {

							if (value[0] === 3 && value[1] === 7) {
								//58 è la coordinata del Re dopo l'arrocco a sinistra già calcolata in indice unico
								trovato = true;
								return false;
							}
						}
					}
					return true;
				})
				return !trovato;
			});
			if (pezzoCatturato) Scacchiera.spawn(pezzoCatturato);
			if (gen && trovato) $("td:eq(" + (this.reBianco.x + 8*this.reBianco.y) + ")").css("backgroundColor", "yellow");
		}

		else if (Scacchiera.turnoNero){
			//scorre tutti i pezzi del nero
			Scacchiera.pezziNero.every(function (value) {
				//scorre tutti i pezzi del bianco e se trova che uno sovrappone uno dei pezzi del nero lo elimina temporaneamente
				//questo serve a contare in caso di scacco anche quelle mosse che rimuovono lo scacco catturando un pezzo
				Scacchiera.pezziBianco.every(function (target) {
					if (value.x === target.x && value.y === target.y) {
						pezzoCatturato = target;
						Scacchiera.delete(target);
						Scacchiera.eliminatiBianco.pop();
						return false;
					}
					return true;
				});
				return true;
			});


			Scacchiera.pezziBianco.every(function (target) {
				let mosse = target.calcolaMossePossibili(Scacchiera);
				mosse.every(function (value) {
					if (value[0] === Scacchiera.reNero.x && value[1] === Scacchiera.reNero.y) {
						//$("td:eq(" + (value[0] + 8*value[1]) + ")").css("backgroundColor", "yellow");
						trovato = true;
						return false;
					}
					return true;
				})
				return !trovato;
			});
			if (pezzoCatturato) Scacchiera.spawn(pezzoCatturato);
			if (gen && trovato) $("td:eq(" + (this.reNero.x + 8*this.reNero.y) + ")").css("backgroundColor", "yellow");
		}
		return trovato;
	}

	controlloStallo () {
		let Scacchiera = this;
		let mossaTrovata = false;
		let casellaMossa

		if (Scacchiera.turnoBianco) {
			Scacchiera.pezziBianco.every(function(target){
				let mosse = target.calcolaMossePossibili(Scacchiera);
				if (mosse.length !== 0) {
					mosse.every(function (value) {
						let objX = target.x;
						let objY = target.y;

						casellaMossa = $("td:eq(" + (value[0] + 8 * value[1]) + ")").html();

						target.move(value[0], value[1]);
						$("td:eq(" + (objX + 8 * objY) + ")").html("");
						visualizza(target);

						if (!Scacchiera.controlloScacco()) {
							mossaTrovata = true;
						}

						target.move(objX, objY);
						visualizza(target);
						$("td:eq(" + (value[0] + 8 * value[1]) + ")").html(casellaMossa);
						return !mossaTrovata;
					})
				}
				return true;
			});
		}
		else if (Scacchiera.turnoNero) {
			Scacchiera.pezziNero.every(function(target){
				let mosse = target.calcolaMossePossibili(Scacchiera);
				if (mosse.length !== 0) {
					mosse.every(function (value) {
						let objX = target.x;
						let objY = target.y;

						casellaMossa = $("td:eq(" + (value[0] + 8 * value[1]) + ")").html();
						target.move(value[0], value[1]);
						$("td:eq(" + (objX + 8 * objY) + ")").html("");
						visualizza(target);
						if (!Scacchiera.controlloScacco()) {
							mossaTrovata = true;
						}
						target.move(objX, objY);
						$("td:eq(" + (value[0] + 8 * value[1]) + ")").html(casellaMossa);
						visualizza(target);
						return !mossaTrovata;
					})
				}
				return true;
			});
		}
		else return false;

		return !mossaTrovata;
	}

	//aggiorna la logica di gioco
	tick() {
		//puntatore si riferisce sempre alla scacchiera
		let Scacchiera = this;
		let obj = null;
		let classe;
		let mosse = [];

		Scacchiera.scacco = Scacchiera.controlloScacco(true);
		Scacchiera.stallo = Scacchiera.controlloStallo();

		if (Scacchiera.stallo) {
			if (Scacchiera.scacco) console.log("Scacco matto");
			else console.log("Stallo");
		}

		//quando si clicca sull'immagine succedono cose
		if (Scacchiera.turnoBianco) classe = "bianco";
		else if (Scacchiera.turnoNero) classe = "nero";

		$(".img"+ classe).one("click", function  () {
			$("td").css("backgroundColor", "").removeClass("selezionato").removeClass("mosse");

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
			$("td:eq("+ indiceVettore +")").addClass("selezionato"); 

			//calcola e visualizza le mosse possibili del pezzo selezionato
			if ((obj instanceof PezzoBianco && Scacchiera.turnoBianco) || (obj instanceof PezzoNero && !Scacchiera.turnoBianco)) {
				mosse = obj.calcolaMossePossibili(Scacchiera);

				mosse.forEach(function (value) {
					let objX = obj.x;
					let objY = obj.y;
					obj.move(value[0], value[1]);
					$("td:eq(" + (objX + 8*objY) + ")").html("");
					visualizza(obj);
					if (Scacchiera.controlloScacco(false)) {
						$("td:eq(" + (value[0] + 8*value[1]) + ")").html("");
						obj.move(objX, objY);
						visualizza(obj);
					}
					else {
						obj.move(objX, objY);
						visualizza(obj);
						$("td:eq(" + (value[0] + 8 * value[1]) + ")").html("").addClass("mosse").one("click", function () {
							//si muove il pezzo scelto nella casella scelta
							obj.move(value[0], value[1]);

							//cattura
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

							if (obj instanceof PedoneBianco && obj.y === 0) {
								Scacchiera.turnoBianco = false;
								$("#listaPedoneBianco").css("display", "block");
								let pedoneX = obj.x;

								$("#listaPedoneBianco > li > img").one("click", function () {
									Scacchiera.delete(obj);
									Scacchiera.eliminatiBianco.pop();
									$("td:eq(" + (pedoneX) + ")").html("");
									let pezzo = this.src.split("/")[this.src.split("/").length-1][6];
									switch (pezzo) {
										case 'b': {
											obj = new AlfiereBianco(objX, 0);
											break;
										}
										case 'k': {
											obj = new CavalloBianco(objX, 0);
											break;
										}
										case 'q': {
											obj = new ReginaBianco(objX, 0);
											break;
										}
										case 'r': {
											obj = new TorreBianco(objX, 0);
											break;
										}
									}
									Scacchiera.spawn(obj);
									visualizza(obj);
									$("#listaPedoneBianco").css("display", "none");
									$("#listaPedoneBianco > li > img").off("click");

									Scacchiera.turnoNero = true;
									Scacchiera.turnoBianco = false;

									Scacchiera.controlloScacco(true);
									Scacchiera.controlloStallo();
								})
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

							$("td").css("backgroundColor", "").removeClass("selezionato").removeClass("mosse").off("click");

							//cambia il turno
							if (Scacchiera.turnoNero !== Scacchiera.turnoBianco) {
								Scacchiera.turnoBianco = !Scacchiera.turnoBianco;
								Scacchiera.turnoNero = !Scacchiera.turnoNero;
							}
							//gira();
						});
					}
				});
			}
		});
	}
}