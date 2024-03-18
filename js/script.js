// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro 
// ed emetto un messaggio in console con il numero della cella cliccata.


const gridGame = document.querySelector('.grid');
const playStartTheGame = document.querySelector('.btn');

playStartTheGame.addEventListener('click', function () {
   // richiamiamo il valore delle option nel select 
   const mySelect = document.querySelector('.select').value;
   console.log(mySelect);

   //invochiamo la funzione per definire quante celle genare in base al livello
   let howManyCells = difficultyLevel (mySelect)
   console.log(howManyCells);

   gridGame.style.display = 'flex'

   gridGame.innerHTML = '';
       for (let i = 1; i <= howManyCells; i++) {
       
           let squareGenerated = squareGenerator(i, mySelect)
           gridGame.append(squareGenerated);

           squareGenerated.addEventListener('click', function() {
               this.classList.toggle('square-blue')
               console.log(i);
           })
       }
});

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
// Il gioco termina  

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


// Funzione per generare un numero diverso di celle in base alla difficoltà di livello selezionata
// numberCells -> un numero 
// return: ritorna il numero di celle in base alla difficolta scelta nell'input select
function difficultyLevel (input) {
    let numberCells;
    if (input === 'easy') {
        numberCells = 100;
    } else if (input === 'medium') {
        numberCells = 81;
    } else if (input === 'hard') {
        numberCells = 49;
    }
    return numberCells
}


// Click sul pulsante "play" per far comparire la griglia con un display: block
// Creare gli square con numeri da 1 a 100
// Aggiungere gli square con i numeri dentro la griglia
// Al click dell'utente dentro la cella questi colorano di azzurro il bg
// Al click dell'utente viene stampato in console anche il numero corrispondente