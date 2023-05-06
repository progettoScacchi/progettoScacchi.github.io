class Scacchiera {
	constructor() {
		this.pezziBianco = [];
		this.pezziNero = [];
		this.eliminatiBianco = [];
		this.eliminatiNero = [];
		this.turnoBianco = true;
		this.turnoNero = false;

		this.reNero = null;	//puntatore al re nero (per lo scacco)
		this.reBianco = null;	//puntatore al re bianco (per lo scacco)

		this.stallo = false;
		this.scacco = false;

		//crea fisicamente la scacchiera nella pagina
		let txt = "<div id='bordoScacchiera'><table id='tabScacchiera'>";

		for (let i = 0; i<8; i++) {
			txt += "<tr>";
			for (let j = 0; j<8; j++) {
				txt += "<td></td>";
			}
			txt += "</tr>";
		}

		txt += "</table></div>";

		$("#spazioDiGioco").html(txt);

		//colora le caselle
		$("tr:even > td:even").addClass("bianco");
		$("tr:even > td:odd").addClass("nero");
		$("tr:odd > td:odd").addClass("bianco");
		$("tr:odd > td:even").addClass("nero");
	}

	spawn(pezzo) {						//crea un pezzo
		if (pezzo instanceof PezzoBianco) this.pezziBianco.push(pezzo);
		else this.pezziNero.push(pezzo);
	}

	delete(pezzo) {						//elimina un pezzo
		if (pezzo instanceof PezzoBianco) {
			//trova l'indice del pezzo con il metodo indexOf all'interno del vettore e lo rimuove dalla lista dei pezzi con il metodo splice
			this.pezziBianco.splice(this.pezziBianco.indexOf(pezzo), 1);
			this.eliminatiBianco.push(pezzo);	//poi lo aggiunge al vettore degli eliminati
		}
		else {
			this.pezziNero.splice(this.pezziNero.indexOf(pezzo), 1);
			this.eliminatiNero.push(pezzo);
		}
	}

	generaIniziale() {							//genera la disposizione iniziale
		this.reBianco = new ReBianco(4, 7);
		this.reNero = new ReNero(6, 0);

		/*
		//genera i pezzi bianchi
		this.spawn(new TorreBianco(0, 7));
		this.spawn(new CavalloBianco(1, 7));
		this.spawn(new AlfiereBianco(2, 7));
		this.spawn(new ReginaBianco(3, 7));
		this.spawn(this.reBianco);
		this.spawn(new AlfiereBianco(5, 7));
		this.spawn(new CavalloBianco(6, 7));
		this.spawn(new TorreBianco(7, 7));
		for (let i = 0; i < 8; i++) {
			this.spawn(new PedoneBianco(i, 6));
		}

		//genera i pezzi neri
		this.spawn(new TorreNero(0, 0));
		this.spawn(new CavalloNero(1, 0));
		this.spawn(new AlfiereNero(2, 0));
		this.spawn(new ReginaNero(3, 0));
		this.spawn(this.reNero);
		this.spawn(new AlfiereNero(5, 0));
		this.spawn(new CavalloNero(6, 0));
		this.spawn(new TorreNero(7, 0));
		for (let i = 0; i < 8; i++) {
			this.spawn(new PedoneNero(i, 1));
		}
		*/

		this.spawn(this.reBianco);
		this.spawn(this.reNero);
		this.spawn(new PedoneBianco(7, 2))
		this.spawn(new PedoneNero(0, 5))
		//this.spawn(new ReginaBianco(6, 2))
	}

	//restituisce un pezzo bianco date le coordinate
	getPezzoBianco(posX, posY) {
		let obj = null;
		this.pezziBianco.every(function (value) {
			if (value.x === posX && value.y === posY) {
				obj = value;
				return false;
			}
			return true;
		});
		return obj;
	}

	//restituisce un pezzo nero date le coordinate
	getPezzoNero(posX, posY) {
		let obj = null;
		this.pezziNero.every(function (value) {
			if (value.x === posX && value.y === posY) {
				obj = value;
				return false;
			}
			return true;
		});
		return obj;
	}

	controlloScacco(gen) {
		$("td").removeClass("scacco");
		let Scacchiera = this;
		let trovato = false;		//controllo se ho trovato una mossa che ci rende in scacco

		let pezzoCatturato = null;

		if (Scacchiera.turnoBianco) {
			//scorre tutti i pezzi del bianco
																																				//DA FARE
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
			if (gen && trovato) {
				$("td:eq(" + (this.reBianco.x + 8*this.reBianco.y) + ")").addClass("scacco");
				console.log("SCACCO");
			}
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
			if (gen && trovato) {
				$("td:eq(" + (this.reNero.x + 8*this.reNero.y) + ")").addClass("scacco");
				console.log("SCACCO");
			}
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
		let Scacchiera = this;	//puntatore si riferisce sempre alla scacchiera
		let classe;			//variabile d'appoggio che serve a impostare l'evento click solo sulle immagini del giocatore giusto

		if (Scacchiera.turnoBianco) classe = "bianco";
		else if (Scacchiera.turnoNero) classe = "nero";

		//click su un'immagine
		$(".img"+ classe).one("click", function  () {	//con il metodo "one" l'evento si verifica una sola volta
			$("td").css("backgroundColor", "").removeClass("selezionato").removeClass("mosse").off("click");			//rimuove modificatori ed eventi attivi sulle caselle

			//trovo l'indice della casella in cui è contenuta l'immagine (this.parentNode) nel vettore delle caselle $("td") ed estrapolo le coordinate
			let indiceVettore = Array.prototype.indexOf.call($("td"), this.parentNode);
			let x = indiceVettore % 8;
			let y = (indiceVettore - x) / 8;

			let obj = null;		//pezzo che verrà selezionato

			//il metodo split divide il percorso assoluto dell'immagine per le barre e controlla la prima lettera dell'ultima stringa (il nome dell'immagine)
			// per capire a quale colore appartiene. Cerca poi tra tutti gli oggetti di quel colore quale ha le stesse coordinate dell'immagine
			if (this.src.split("/")[this.src.split("/").length-1][0] === 'w') {
				obj = Scacchiera.getPezzoBianco(x, y);
			}
			else {
				obj = Scacchiera.getPezzoNero(x, y);
			}

			if (obj instanceof PedoneNero || obj instanceof PedoneBianco) obj.enPassantPossibile = false; // se il pezzo selezionato è un pedone, l'enPassant non sarà più possibile

			//visualizza quale pezzo è stato premuto
			$("td:eq("+ indiceVettore +")").addClass("selezionato");

			//calcola e visualizza le mosse possibili del pezzo selezionato
			let mosse = obj.calcolaMossePossibili(Scacchiera);		//calcola le mosse possibili (prima del controllo scacco) del pezzo

			mosse.forEach(function (value) {	//scorre tutte le mosse
				//salva le coordinate attuali del pezzo
				let objX = obj.x;
				let objY = obj.y;

				//tenta la mossa
				obj.move(value[0], value[1]);
				$("td:eq(" + (objX + 8*objY) + ")").html("");	//svuota il posto dove si trovava prima il pezzo
				visualizza(obj);	//lo visualizza nella posizione nuova

				//se la mossa causa uno scacco non viene visualizzata e non è possibile eseguirla
				if (Scacchiera.controlloScacco(false)) {
					obj.move(objX, objY);	//lo sposta di nuovo nella posizione originale
					visualizza(obj);	//lo visualizza nella posizione originale
					$("td:eq(" + (value[0] + 8 * value[1]) + ")").html("");	//svuota la casella della mossa
				}

				else {
					obj.move(objX, objY);	//lo sposta di nuovo nella posizione originale
					visualizza(obj);	//lo visualizza nella posizione originale

					//per lo stile: aggiunge una classe diversa se la mossa è una cattura o un movimento
					if (Scacchiera.getPezzoNero(value[0], value[1]) || Scacchiera.getPezzoBianco(value[0], value[1])) $("td:eq(" + (value[0] + 8 * value[1]) + ")").addClass("mangia");
					else $("td:eq(" + (value[0] + 8 * value[1]) + ")").addClass("mosse");

					//click su una delle mosse possibili
					$("td:eq(" + (value[0] + 8 * value[1]) + ")").one("click", function () {
						//si muove il pezzo scelto nella casella scelta
						obj.move(value[0], value[1]);

						//eliminazione dei pezzi catturati
						let pezzoEliminato = null;		//pezzo catturato (se esiste)
						if (Scacchiera.turnoBianco) {
							pezzoEliminato = Scacchiera.getPezzoNero(obj.x, obj.y);
						} else {
							pezzoEliminato = Scacchiera.getPezzoBianco(obj.x, obj.y)
						}
						if (pezzoEliminato) Scacchiera.delete(pezzoEliminato);

						//potenziamento del pedone bianco quando arriva a fondo scacchiera
						if (obj instanceof PedoneBianco && obj.y === 0) {
							Scacchiera.turnoBianco = false;	//il gioco si ferma (non è il turno di nessuno: il giocatore deve compiere una scelta)

							$("#listaPedoneBianco").css("display", "block");	//visualizza la lista delle scelte

							//click su una delle scelte
							$("#listaPedoneBianco > li > img").one("click", function () {
								$("#listaPedoneBianco").css("display", "none");
								$("#listaPedoneBianco > li > img").off("click");

								Scacchiera.delete(obj);	//eliminazione del pedone
								Scacchiera.eliminatiBianco.pop();	//lo rimuove dal vettore degli eliminati

								let pezzo = this.src.split("/")[this.src.split("/").length-1][6];	//capisce quale pezzo è stato scelto dal percorso dell'immagine cliccata
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

								Scacchiera.spawn(obj);	//sostituisce il pedone con l'oggetto scelto
								visualizza(obj);

								Scacchiera.turnoNero = true;	//imposta il turno del nero

								//controlli di scacco e di stallo
								Scacchiera.scacco = Scacchiera.controlloScacco(true);		//la booleana true permette la colorazione gialla della casella del re
								Scacchiera.stallo = Scacchiera.controlloStallo();

								if (Scacchiera.stallo) {									//reazione a scacco matto e stallo
									if (Scacchiera.scacco) console.log("Scacco matto");		//scacco + stallo = scacco matto
									else console.log("Stallo");
								}

								Scacchiera.tick();	//riesegue la funzione tick per far ripartire il gioco
							})
						}

						//potenziamento del pedone nero quando arriva a fondo scacchiera
						else if (obj instanceof PedoneNero && obj.y === 7) {
							Scacchiera.turnoNero = false;	//il gioco si ferma (non è il turno di nessuno: il giocatore deve compiere una scelta)

							$("#listaPedoneNero").css("display", "block");	//visualizza la lista delle scelte

							//click su una delle scelte
							$("#listaPedoneNero > li > img").one("click", function () {
								$("#listaPedoneNero").css("display", "none");
								$("#listaPedoneNero > li > img").off("click");

								Scacchiera.delete(obj);	//eliminazione del pedone
								Scacchiera.eliminatiNero.pop();	//lo rimuove dal vettore degli eliminati

								let pezzo = this.src.split("/")[this.src.split("/").length-1][6];	//capisce quale pezzo è stato scelto dal percorso dell'immagine cliccata
								switch (pezzo) {
									case 'b': {
										obj = new AlfiereNero(objX, 7);
										break;
									}
									case 'k': {
										obj = new CavalloNero(objX, 7);
										break;
									}
									case 'q': {
										obj = new ReginaNero(objX, 7);
										break;
									}
									case 'r': {
										obj = new TorreNero(objX, 7);
										break;
									}
								}

								Scacchiera.spawn(obj);	//sostituisce il pedone con l'oggetto scelto
								visualizza(obj);

								Scacchiera.turnoBianco = true;	//imposta il turno del bianco

								//controlli di scacco e di stallo
								Scacchiera.scacco = Scacchiera.controlloScacco(true);		//la booleana true permette la colorazione gialla della casella del re
								Scacchiera.stallo = Scacchiera.controlloStallo();

								if (Scacchiera.stallo) {									//reazione a scacco matto e stallo
									if (Scacchiera.scacco) console.log("Scacco matto");		//scacco + stallo = scacco matto
									else console.log("Stallo");
								}

								Scacchiera.tick();	//riesegue la funzione tick per far ripartire il gioco
							})
						}

						//arrocco bianco
						if (obj instanceof ReBianco && obj.arroccoPossibile) {
							if (obj.x === 6 && obj.y === 7) {
								let value = Scacchiera.getPezzoBianco(7, 7);
								value.move(5, 7);
							}
							if (obj.x === 2 && obj.y === 7) {
								let value = Scacchiera.getPezzoBianco(0, 7);
								value.move(3, 7);
							}
						}

						//arrocco nero
						if (obj instanceof ReNero && obj.arroccoPossibile) {
							if (obj.x === 6 && obj.y === 0) {
								let value = Scacchiera.getPezzoNero(7, 0);
								value.move(5, 0);
							}
							if (obj.x === 2 && obj.y === 0) {
								let value = Scacchiera.getPezzoNero(0, 0);
								value.move(3, 0);
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

						$.playSound('movimento_mossa.mp3');

						$("td").css("backgroundColor", "").removeClass("selezionato").removeClass("mosse").removeClass("mangia").off("click");
						//cambia il turno
						if (Scacchiera.turnoNero !== Scacchiera.turnoBianco) {
							Scacchiera.turnoBianco = !Scacchiera.turnoBianco;
							Scacchiera.turnoNero = !Scacchiera.turnoNero;
						}

						//controlli di scacco e di stallo
						Scacchiera.scacco = Scacchiera.controlloScacco(true);		//la booleana true permette la colorazione gialla della casella del re
						Scacchiera.stallo = Scacchiera.controlloStallo();

						if (Scacchiera.stallo) {									//reazione a scacco matto e stallo
							if (Scacchiera.scacco) console.log("Scacco matto");		//scacco + stallo = scacco matto
							else console.log("Stallo");
						}
					});
				}
			});
		});
	}
}