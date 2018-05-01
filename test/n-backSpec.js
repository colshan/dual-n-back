'use strict';

describe('ctrl.next', function () {
	it('adds a position and audio file to state variables', function () {
		const beforePosition = state.positionHistory.length;
		const beforeAudio = state.audioHistory.length;

		ctrl.next();

		expect(state.positionHistory.length).toEqual(beforePosition + 1);
		expect(state.audioHistory.length).toEqual(beforeAudio + 1);
	});

	it('tears down previous round\'s user input', function() {
		state.userInputPosition = true;
		state.userInputAudio = true;
		ctrl.next();
		expect(state.userInputPosition).toBe(false);
		expect(state.userInputAudio).toBe(false);
	});
});

describe('ctrl.tally', function() {

	beforeEach(function(){

		this.tpp = state.truePositivePosition;
		this.fpp = state.falsePositivePosition;
		this.tnp = state.trueNegativePosition;
		this.fnp = state.falseNegativePosition;
		this.tpa = state.truePositiveAudio;
		this.fpa = state.falsePositiveAudio;
		this.tna = state.trueNegativeAudio;
		this.fna = state.falseNegativeAudio;

	});

	it('increases truePositivePosition when user is actively correct about position, all others score variables remain unchanged', function() {
		state.userInputPosition = true;
		state.positionIsPositive = true;

		ctrl.tally();

		expect(state.truePositivePosition).toEqual(this.tpp + 1);
		expect(state.falsePositivePosition).toEqual(this.fpp);
		expect(state.trueNegativePosition).toEqual(this.tnp);
		expect(state.falseNegativePosition).toEqual(this.fnp);
	});

	it('increases falsePositivePosition score when user is actively incorrect about position, all others score variables remain unchanged', function () {
		state.userInputPosition = true;
		state.positionIsPositive = false;

		ctrl.tally();

		expect(state.truePositivePosition).toEqual(this.tpp);
		expect(state.falsePositivePosition).toEqual(this.fpp + 1);
		expect(state.trueNegativePosition).toEqual(this.tnp);
		expect(state.falseNegativePosition).toEqual(this.fnp);
	});

	it('increases trueNegativePosition when user is passively correct about position, all others score variables remain unchanged', function() {
		state.userInputPosition = false;
		state.positionIsPositive = false;

		ctrl.tally();

		expect(state.truePositivePosition).toEqual(this.tpp);
		expect(state.falsePositivePosition).toEqual(this.fpp);
		expect(state.trueNegativePosition).toEqual(this.tnp + 1);
		expect(state.falseNegativePosition).toEqual(this.fnp);

	});

	it('increases falseNegativePosition when user is passively incorrect about position, all others score variables remain unchanged', function() {
		state.userInputPosition = false;
		state.positionIsPositive = true;

		ctrl.tally();

		expect(state.truePositivePosition).toEqual(this.tpp);
		expect(state.falsePositivePosition).toEqual(this.fpp);
		expect(state.trueNegativePosition).toEqual(this.tnp);
		expect(state.falseNegativePosition).toEqual(this.fnp + 1);
	});


	it('increases truePositiveAudio score when user is actively correct about audio, all others score variables remain unchanged', function() {
		state.userInputAudio = true;
		state.audioIsPositive = true;

		ctrl.tally();

		expect(state.truePositiveAudio).toEqual(this.tpa + 1);
		expect(state.falsePositiveAudio).toEqual(this.fpa);
		expect(state.trueNegativeAudio).toEqual(this.tna);
		expect(state.falseNegativeAudio).toEqual(this.fna);
	});

	it('increases falsePositiveAudio score when user is actively incorrect about audio, all others score variables remain unchanged', function () {
		state.userInputAudio = true;
		state.audioIsPositive = false;

		ctrl.tally();

		expect(state.truePositiveAudio).toEqual(this.tpa);
		expect(state.falsePositiveAudio).toEqual(this.fpa + 1);
		expect(state.trueNegativeAudio).toEqual(this.tna);
		expect(state.falseNegativeAudio).toEqual(this.fna);
	});

	it('increases trueNegativeAudio score when user is passively correct about audio, all others score variables remain unchanged', function() {
		state.userInputAudio = false;
		state.audioIsPositive = false;

		ctrl.tally();

		expect(state.truePositiveAudio).toEqual(this.tpa);
		expect(state.falsePositiveAudio).toEqual(this.fpa);
		expect(state.trueNegativeAudio).toEqual(this.tna + 1);
		expect(state.falseNegativeAudio).toEqual(this.fna);
	});

	it('increases falseNegativeAudio score when user is passively incorrect about audio, all others score variables remain unchanged', function () {
		state.userInputAudio = false;
		state.audioIsPositive = true;

		ctrl.tally();

		expect(state.truePositiveAudio).toEqual(this.tpa);
		expect(state.falsePositiveAudio).toEqual(this.fpa);
		expect(state.trueNegativeAudio).toEqual(this.tna);
		expect(state.falseNegativeAudio).toEqual(this.fna + 1);
	});

});

describe('ctrl.currentExpectation', function() {

	it('sets positionIsPositive to true if current round matches n-back round', function (){
		state.positionHistory = [1,2,3,2];
		state.n = 2;
		state.positionIsPositive = false;

		ctrl.currentExpectation();

		expect(state.positionIsPositive).toBe(true);
	});

	it('sets audioIsPositive to true if current round matches n-back round', function (){
		state.audioHistory = [2,1,3,2];
		state.n = 3;
		state.audioIsPositive = false;

		ctrl.currentExpectation();

		expect(state.audioIsPositive).toBe(true);
	});

	it('sets positionIsPositive and audioIsPositive to false if no n-back round exists', function (){
		state.positionHistory = [2];
		state.audioHistory = [1];
		state.n = 2;
		state.positionIsPositive = true;
		state.audioIsPositive = true;

		ctrl.currentExpectation();

		expect(state.positionIsPositive).toBe(false);
		expect(state.audioIsPositive).toBe(false);
	});

	it('sets positionIsPositive to false if current round does not match n-back round', function (){
		state.positionHistory = [1,2,3,2];
		state.n = 3;
		state.positionIsPositive = true;

		ctrl.currentExpectation();

		expect(state.positionIsPositive).toBe(false);
	});

	it('sets audioIsPositive to true if current round does not match n-back round', function (){
		state.audioHistory = [2,1,3,2];
		state.n = 1;
		state.audioIsPositive = true;

		ctrl.currentExpectation();

		expect(state.audioIsPositive).toBe(false);
	});
});