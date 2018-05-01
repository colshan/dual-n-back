/** Object that contains data that is not unique to user session
 */
const storage = {
	audioFiles: []
};


/** Object that contains state variables necessary for game play.
 */
const state = {

	n: 2,

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

	},

	/** Tear down previous round 
	 * Randomnly select next position and audio clip to play
	 * call currentExpectation
	 * Record history in state object.
	 */
	next: function () {

	},
 
	/** Calculate score from previous round and update
	 */
	tally: function () {

	},

	/** Use setInterval to generate new rounds.
	 * Terminates and clears interval when game is over.
	 * Calls gameOverModal.
	 */
	gameLoop: function () {

	},

	/** Store user input in state object properties, userInputPosition
	 * and userInputAudio
	 */
	controlHandler: function () {

	},

	/** Add event listeners to controls.
	 */
	setUpUserControls: function () {

	},

	/** Initialize game.  Add event listeners to controls and start
	 * the game loop.
	 */
	init: function () {

	}
};

/** Object that contains functions that modify the DOM
 */
const pres = {

	/** Play audio clip and modify DOM to display block in correct position
	 * for a limited amount of time.
	 */
	displayNext: function () {

	},

	/** Displays modal when game is over that shows game results.
	 */
	gameOverModal: function () {

	},

};
