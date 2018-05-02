/** Object that contains data that is not unique to user session
 */
const storage = {
	audioFiles: ['a.wav','f.wav','g.wav','j.wav','m.wav','o.wav','w.wav','x.wav','z.wav']
};


/** Object that contains state variables necessary for game play.
 */
const state = {

	n: 2,
	loop: null,

	positionHistory: [],
	audioHistory: [],

	userInputPosition: false,
	userInputAudio: false,

	positionIsPositive: false,
	audioIsPositive: false,

	truePositivePosition: 0,
	trueNegativePosition: 0,
	falsePositivePosition: 0,
	falseNegativePosition: 0,

	truePositiveAudio: 0,
	trueNegativeAudio: 0,
	falsePositiveAudio: 0,
	falseNegativeAudio: 0

};


/**. Object that contains business logic of application
 */
const ctrl = {

	/** Establishes expectation for user input for current round.
	 * Stores results in state.positionIsPositive and
	 * state.audioIsPositive
	 */
	currentExpectation: function () {
		let len = state.positionHistory.length;
		if (len <= state.n){
			state.positionIsPositive = false;
			state.audioIsPositive = false;
		} else {
			state.positionIsPositive = (state.positionHistory[len-1] === state.positionHistory[len-1-state.n]);
			state.audioIsPositive = (state.audioHistory[len-1] === state.audioHistory[len-1-state.n]);
		}
	},

	/**
	 * return random number from 0 to 8
	 */
	getRandomIndex: function () {
		return Math.floor(Math.random()*9);
	},


	getNextAudio: function () {
		let filename = storage.audioFiles[ctrl.getRandomIndex()];
		return './audio/' + filename;
	},

	/** Call tally.
	 * Tear down previous round 
	 * Randomnly select next position and audio clip to play
	 * call currentExpectation
	 * Record history in state object.
	 * call game over modal
	 */
	next: function () {
		if (state.positionHistory.length > 0){
			ctrl.tally();
		};

		if (state.positionHistory.length >= 20){
			clearInterval(state.loop);
			pres.gameOverModal();
		} else{

			state.userInputPosition = false;
			state.userInputAudio = false;

			state.positionHistory.push(ctrl.getRandomIndex().toString(10));
			state.audioHistory.push(ctrl.getNextAudio());
			
			ctrl.currentExpectation();

			pres.displayNext();
		}
	},
 
	/** Calculate score from previous round and update
	 */
	tally: function () {
		let posSelect = state.userInputPosition;
		let audSelect = state.userInputAudio;

		let posActual = state.positionIsPositive;
		let audActual = state.audioIsPositive;

		if (posSelect && posActual){
			state.truePositivePosition++;
		} else if (!posSelect && !posActual) {
			state.trueNegativePosition++;
		} else if (posSelect && !posActual) {
			state.falsePositivePosition++;
		} else {
			state.falseNegativePosition++;
		}

		if(audSelect && audActual){
			state.truePositiveAudio++;
		} else if (!audSelect && !audActual) {
			state.trueNegativeAudio++;
		} else if (audSelect && !audActual) {
			state.falsePositiveAudio++;
		} else {
			state.falseNegativeAudio++;
		}

	},

	/** Use setInterval to generate new rounds.
	 */
	gameLoop: function () {
		ctrl.next();
		state.loop = setInterval(ctrl.next, 2500);
	},

	/** Store user input in  userInputPosition
	 */
	positionControlHandler: function () {
		state.userInputPosition = true;

	},

	/** Store user input in userInputAudio
	 */
	audioControlHandler: function () {
		state.userInputAudio = true;

	},

	/** Add event listeners to controls.
	 */
	setUpUserControls: function () {
		document.getElementById('position').addEventListener('click', ctrl.positionControlHandler);
		document.getElementById('audio').addEventListener('click', ctrl.audioControlHandler);

	},


	/** Initialize game.  Add event listeners to controls and start
	 * the game loop.
	 */
	init: function () {
		state.n = parseInt(document.getElementById('N').value,10);
		ctrl.setUpUserControls();
		pres.killModal();
		ctrl.gameLoop();
	}
};

/** Object that contains functions that modify the DOM
 */
const pres = {

	/** Play audio clip and modify DOM to display block in correct position
	 * for a limited amount of time.
	 */

	displayModal: function() {
		document.getElementById('modal').style.display = 'block';
	},

	killModal: function () {
		document.getElementById('modal').style.display = 'none';
	},

	displayNext: function () {
		let cell = document.getElementById(state.positionHistory[state.positionHistory.length - 1]);
		cell.style.backgroundColor = '#000000';
		new Audio(state.audioHistory[state.audioHistory.length -1]).play();
		setTimeout(function () {
			cell.style.backgroundColor = '#FFFFFF';
		}, 1000);
	},

	/** Displays modal when game is over that shows game results.
	 */
	gameOverModal: function () {
		//TODO
		document.getElementById('modal-content').innerHTML = [state.truePositivePosition,
	state.trueNegativePosition,
	state.falsePositivePosition,
	state.falseNegativePosition,
	state.truePositiveAudio,
	state.trueNegativeAudio,
	state.falsePositiveAudio,
	state.falseNegativeAudio];

		pres.displayModal();
	},

};

document.getElementById('modal-button').addEventListener('click', ctrl.init);
