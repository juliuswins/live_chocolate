const lettersDiv = document.getElementById('letters');
const vowelBtn = document.getElementById('vowel-btn');
const consonantBtn = document.getElementById('consonant-btn');
const resetBtn = document.getElementById('reset-btn');
let letters = [];

vowelBtn.addEventListener('click', addVowel);
consonantBtn.addEventListener('click', addConsonant);
resetBtn.addEventListener('click', resetGame);

function addVowel() {
	if (letters.length < 9) {
		const vowel = getRandomVowel();
		letters.push(vowel);
		lettersDiv.innerHTML = letters.join('');
	}
}

function addConsonant() {
	if (letters.length < 9) {
		const consonant = getRandomConsonant();
		letters.push(consonant);
		lettersDiv.innerHTML = letters.join('');
	}
}

function resetGame() {
	letters = [];
	lettersDiv.innerHTML = '';
	vowelBtn.disabled = false;
	consonantBtn.disabled = false;
}

function getRandomVowel() {
	return ['A', 'E', 'I', 'O', 'U'][Math.floor(Math.random() * 5)];
}

function getRandomConsonant() {
	return ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'][Math.floor(Math.random() * 20)];
}