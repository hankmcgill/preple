// NOTE: Optimized to be played in replit console. //
//

console.log(
	'****************************************************************************************************************** * * * * PREPLE * * * *****************************************************************************************************************'
);

setTimeout(() => {
	console.log('');
	console.log(
		'by (((((((((((((((((((  GROUP IRON MAN ))))))))))))))))))))))))))'
	);
}, 2000);

setTimeout(() => {
	console.log('');
	console.log(
		'WELCOME TO PREPLE. YOU HAVE SIX TRIES TO GUESS THE CORRECT 4-LETTER WORD.'
	);
}, 4000);

setTimeout(() => {
	console.log('');
	console.log('HINT: YOU SHOULD THINK OF CODING TERMS!');
}, 6000);

///////////////////////////////
/////// INITIALIZE GAME ///////
///////////////////////////////

setTimeout(() => {
	(function index() {
		// IIFE Function to start gameplay

		let guessCount; // guess count incrementor
		let evaluatedGuess = [];
		let wrongPlaces = [];
		let notInWord = [];

		const assignResetValues = () => {
			guessCount = 0; // guess count incrementor
			evaluatedGuess = ['-', '-', '-', '-'];
			wrongPlaces = [];
			notInWord = [];
		};
		assignResetValues();

		const prepleDatabase = [
			'CODE',
			'JAVA',
			'TYPE',
			'LOOP',
			'HTML',
			'LINK',
			'EDGE',
			'CASE',
			'WORD',
		]; // word bank - can improve by adding words dynamically

		const selectRandomWord = (arr) => {
			// select random word
			const randomWord = arr[Math.floor(Math.random() * arr.length)];
			// can improve by removing word from word bank after selection
			return randomWord;
			// return arr[0];  // use static value for debugging
		};

		class Word {
			// word object constructor
			constructor(word) {
				this.word = word;
				this.setLetters();
			}
			setLetters = () => {
				for (let i = 0; i < this.word.length; i++) {
					this[i] = this.word[i].toUpperCase();
				}
			};
		}

		///////////////////////////////
		/////////// SETUP /////////////
		///////////////////////////////

		let corrWordStr = selectRandomWord(prepleDatabase); // random word selection
		const CorrectWord = new Word(selectRandomWord(prepleDatabase));

		///////////////////////////////
		////  POSSIBLE OUTCOMES ///////
		///////////////////////////////

		const phrase = {
			// string outputs for user to read
			scoreboard: evaluatedGuess,
			correctLetter: ` Nice job!`,
			wrongPlace: wrongPlaces,
			wrongLetter: ` Try again:(`,
			charsNotInWord: notInWord,
			currentTallyMoreThanOne: ` Attempts left:`,
			currentTallyOneLeft: ` This is your last chance!`,
			win: ` Nice job! You figured it out.`, // win condition\
			loss: ` You lost. Better luck next game.`, // loss condition one
		};

		///////////////////////////////
		/////////  GAMEPLAY ///////////
		///////////////////////////////

		const guessWord = () => {
			console.log('');
			// get user string input
			let attemptStr = prompt('enter a string of four letters');
			attemptStr = attemptStr.toUpperCase();
			if (typeof attemptStr !== 'string' || attemptStr.length !== 4)
				throw new Error("don't make me angry. I worked too hard on this.");
			const Attempt = new Word(attemptStr);

			console.log('');
			console.log('');

			guessCount++; //increment guess count

			///////////////////////////////
			///// CHECK WIN CONDITION /////
			///////////////////////////////

			if (attemptStr === corrWordStr) {
				// check win condition

				if (guessCount === 1) {
					console.log('On your first try? You read my mind!');
				}

				console.log('');
				console.log(`You win! ${attemptStr} is the correct word.`);
				console.log('');
				assignResetValues();
				return; // return win
			}

			///////////////////////////////
			/// ITERATE THRU USER GUESS ///
			///////////////////////////////

			let current; // tracks input relative to correct value

			for (let key in Attempt) {
				// iterate thru chars of input
				if (Number(key) || key === '0') {
					// filter out irrelevant props

					if (Attempt[key] === CorrectWord[key]) {
						// correct letter+index
						evaluatedGuess.splice(Number(key), 1, CorrectWord[key]);

						if (wrongPlaces.includes(Attempt[key])) {
							const idxToPop = wrongPlaces.indexOf(Number(key));
							wrongPlaces.splice(idxToPop, 1);
						}
						// if char was pushed to wrongPlaces arr on a                           previous turn and is NOW guessed in the right place,                    remove from wrongPlaces array
					} else if (corrWordStr.includes(Attempt[key])) {
						//at wrong index
						if (!wrongPlaces.includes(Attempt[key])) {
							wrongPlaces.push(Attempt[key]);
						}
					} else if (!notInWord.includes(Attempt[key])) {
						notInWord.push(Attempt[key]);
					}
				}
			}

			///////////////////////////////
			///// LOSS CONDITION //////////
			///////////////////////////////

			current =
				'| ' +
				phrase.scoreboard +
				' | Not in right place: ' +
				phrase.wrongPlace +
				' | Not in word: ' +
				phrase.charsNotInWord +
				' |' +
				phrase.currentTallyMoreThanOne;

			if (guessCount >= 6) {
				// loss condition

				current =
					'| ' +
					phrase.scoreboard +
					' | Not in right place: ' +
					phrase.wrongPlace +
					' | Not in word: ' +
					phrase.charsNotInWord +
					' |' +
					phrase.currentTallyMoreThanOne;

				console.log(phrase.loss + ` The correct word was: ${corrWordStr}`);
				console.log('');
				assignResetValues();
				return;
			}

			console.log(current, 6 - guessCount); // console.log/manipulate DOM based on condition

			///////////////////////////////
			///// RECURSIVE CALL //////////
			///////////////////////////////
			return guessWord();
		};

		guessWord();
	})();
}, 7000);
