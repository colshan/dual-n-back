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
	right: 0,
	wrong: 0

};


/**. Object that contains business logic of application
 */
const ctrl = {

	/** Randomnly select next position and audio clip to play
	 * Record history in state object.
	 */
	next: function () {

	},

	/** Use setInterval to regularly call next function.
	 * Terminates and clears interval when game is over.
	 * Cas gameOverModal.
	 */
	gameLoop: function () {

	},

	/** Determine if user input corresponds to right or wrong answer.
	 * Update state variables accordingly.
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
