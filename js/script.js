// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro 
// ed emetto un messaggio in console con il numero della cella cliccata.

// SECONDA PARTE
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà
// prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata 
// al massimo una bomba, perciò nell’array delle bombe non potranno esserci 
// due numeri uguali.

// Funzione che genera 16 numeri casuale da un numero min ad un numero max
// I numeri devono essere da 1 a 100 (ma anche renderli dinamici)
// I numeri generati casualmente non devono essere uguali tra loro
// Vanno pushati dentro un array 
// Se i numeri generati dal ciclo sono uguali a quelli contenuti nell'array
// Allora nel caso di questi numeri al momento del click della cella il colore diventa rossa
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).

// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
// Prendere ogni item all'interno dell'array e se è uguale al un numero presente nel ciclo for 
// Mettere una condizione all'interno dell'evento di ascolto che assegna il colore alla cella

const gridGame = document.querySelector('.grid');
const playStartTheGame = document.querySelector('.btn');
const scoreContainer = document.querySelector('.score-counter-container')
const userScoreCounter = document.querySelector('.score-counter');

playStartTheGame.addEventListener('click', function () {

   // richiamiamo il valore delle option nel select 
   const mySelect = document.querySelector('.select').value;

   const bombNumberCells = 16;
   let numberCells;
   if (mySelect === 'easy') {
       numberCells = 100;
   } else if (mySelect === 'medium') {
       numberCells = 81;
   } else if (mySelect === 'hard') {
       numberCells = 49;
   }

    // Definiamo la funzione per calcolare quante celle occorrono per vincere
    const allCellsToWin = numberCells - bombNumberCells
   //invochiamo la funzione per definire quante celle genare in base al livello

   gridGame.style.display = 'flex'
   scoreContainer.style.display = 'flex'
   gridGame.innerHTML = '';
   userScoreCounter.innerHTML = '';

   // Variabile per invocare la funzione che genera l'array dei numberi bomb
   const generatedRandomNumbers = generateBombItems (bombNumberCells, 1, numberCells);
   console.log(generatedRandomNumbers);

    // Creo una variabile che stabilisce il numero di celle che devono essere cliccate per vincere

    // La variabile parte del presupposto che la bomba non è cliccata
    let yourScore = 0;
    let stopClick = false;
    for (let i = 1; i <= numberCells; i++) {
        let numberCellsGrid = i
        let squareGenerated = squareGenerator(numberCellsGrid, mySelect)
        gridGame.append(squareGenerated);

        // Se il numero è presente nell'array di generateBombItems allora il colore di bg è rosso       
        squareGenerated.addEventListener('click', function() {
            // Con la condizione if gli diciamo che finché la bomba non è cliccata allora tutto il resto della condizione del condice si verifica
            if (!stopClick) {
                if (generatedRandomNumbers.includes(numberCellsGrid)) {
                    this.classList.add('square-red')
                    console.log(numberCellsGrid);
                    stopClick = true // nel momento in cui la bomba viene cliccata la variabile in alto diventa true e il gioco termina
                    alert(`il tuo punteggio è: ${yourScore}`)
                } else {   
                    // Il click viene contato solo se la cella non ha la classe 'square-blu'
                    if (!this.classList.contains('square-blue')) {
                        this.classList.add('square-blue')
                        yourScore++
                        userScoreCounter.innerHTML = yourScore
                    }
                }
                // Se l'utente clicca tutte le cells blue allora il gioco si ferma e vince
            }   if (yourScore === allCellsToWin) {
                alert('hai vinto')
                stopClick = true
            } 
        })
    }
});

// FUNCTIONS
// La funzione ha lo scopo di generare delle celle chiamate square con numeri all'interno da 1 a 100
// number -> è un numero 
// return: l'elemento div che abbiamo creato a cui abbiamo aggiunto la classe .square con all'interno uno span e dentro lo span l'argomento number
function squareGenerator(number, inputDifficulty) {
    let squareDiv = document.createElement('div');
    let classCells;
    if (inputDifficulty === 'easy') {
        classCells = 'square';
    } else if (inputDifficulty === 'medium') {
        classCells = 'square-medium';
    } else if (inputDifficulty === 'hard') {
        classCells = 'square-hard';
    }
    squareDiv.classList.add(classCells);
    squareDiv.innerHTML += `<span>${number}</span>`
    return squareDiv
}

// Funzione per prendere 16 dei numeri casuali da 1 a 100
// numMinRandom -> è un numero minimo da cui partire per generare il range
// numMaxRandom -> è un numero massimo a cui arrivare per generare il range
// itemsArrayNumber -> è un numero per decidere di quanti items deve comporsi l'array
// Inserire in numeri dentro un array 
// Creiamo un array vuoto pronto per essere popolato
// Creiamo un ciclo while per genere un nuovo numero casuale fino a che non raggiungiamo 16 items
// Pushiamo gli elementi generati dal ciclo while per pusharli dentro l'array
// Return: la liste dei numeri che rappresentano le bomb
function generateBombItems (itemsArrayNumber, numMinRandom, numMaxRandom) {
    const bombList = [];
    while (bombList.length < itemsArrayNumber) {
        randomNumberRange = getRndInteger(numMinRandom, numMaxRandom)
        if (!bombList.includes(randomNumberRange)) {
            bombList.push(randomNumberRange)
        }
    
        randomNumberRange++
    }
    return bombList
}

// Funzione per generare un numero random da un min ad un max preso da w3school
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

// Click sul pulsante "play" per far comparire la griglia con un display: block
// Creare gli square con numeri da 1 a 100
// Aggiungere gli square con i numeri dentro la griglia
// Al click dell'utente dentro la cella questi colorano di azzurro il bg
// Al click dell'utente viene stampato in console anche il numero corrispondente