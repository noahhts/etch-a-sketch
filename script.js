const container = document.querySelector('.container');

function toggleLines() {
	const squares = document.querySelectorAll('.square');
	squares.forEach((square) => {
		if (square.style.border) {
			square.style.border = '';
		} else {
			square.style.border = '0.1px solid rgb(157, 157, 157)';
		}
	})
}

function random(number) {
	return Math.floor(Math.random() * (number + 1));
}

function handleHover(e) {
	e.target.style.backgroundColor = 'rgb(0, 0, 0)';
}

function addHover() {
	const squares = document.querySelectorAll('.square');
	squares.forEach(square => square.removeEventListener('mouseenter', handleRGB))
	squares.forEach(square => square.addEventListener('mouseenter', handleHover));
}

function handleRGB(e) {
	e.target.style.backgroundColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
}

function addRGB() {
	const squares = document.querySelectorAll('.square');
	squares.forEach(square => square.removeEventListener('mouseenter', handleHover));
	squares.forEach(square => square.addEventListener('mouseenter', handleRGB));
}

function handleDarkening(e) {
	let bgClr = e.target.style.backgroundColor;
	if (bgClr == 'rgb(0, 0, 0)') return;
	let match = bgClr.match(/(\d\.\d)(?=\))/);
	if (match == null) {
		e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
	} else {
		let alpha = Number(match[0]);
		e.target.style.backgroundColor = `rgba(0, 0, 0, ${alpha + 0.1})`;
	}
}

function addDarkening() {
	const squares = document.querySelectorAll('.square');
	squares.forEach(square => square.removeEventListener('mouseenter', handleHover));
	squares.forEach(square => square.removeEventListener('mouseenter', handleRGB));
	squares.forEach(square => square.addEventListener('mouseenter', handleDarkening));
}

function createGrid(perSide) {
	const width = 640 / perSide;
	for (let i = 0; i < perSide * perSide; i++) {
		const square = document.createElement('div');
		square.className = 'square';
		square.style.minWidth = width + 'px';
		square.style.height = width + 'px';
		container.appendChild(square);
	}

	addHover();
}

function clearGrid() {
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
}

function newGrid() {
	let n = prompt('How many squares per side?');
	while (n > 100) {
		n = prompt('Maximum of 100, enter new number:')
	}
	while (n < 0) {
		n = prompt('ERROR: negative squares not possible');
	}
	clearGrid();
	createGrid(n);
}

createGrid(16);