document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 8; 
    const board = document.getElementById('board');
    const piecesContainer = document.getElementById('pieces');

    function createBoard() {
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.setAttribute('data-row', row);
                square.setAttribute('data-col', col);
                board.appendChild(square);
            }
        }
    }

    function createPiece(id, row, col) {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        piece.setAttribute('id', id);
        piece.setAttribute('draggable', true);
        piece.setAttribute('data-row', row);
        piece.setAttribute('data-col', col);

        piece.style.top = row * 65 + 'px';
        piece.style.left = col * 65 + 'px';

        piece.addEventListener('dragstart', handleDragStart);

        piecesContainer.appendChild(piece);
    }

    function handleDragStart(event) {
        event.dataTransfer.setData('piece', event.target.id);
    }

    function handleDrop(event) {
        event.preventDefault();

        const pieceId = event.dataTransfer.getData('piece');
        const piece = document.getElementById(pieceId);
        const square = event.target;

        if (square.classList.contains('square')) {
            const row = square.getAttribute('data-row');
            const col = square.getAttribute('data-col');

            piece.setAttribute('data-row', row);
            piece.setAttribute('data-col', col);

            piece.style.top = row * 65 + 'px';
            piece.style.left = col * 65 + 'px';
        }
    }

    function allowDrop(event) {
        event.preventDefault();
    }

    function addDropListeners() {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.addEventListener('drop', handleDrop);
            square.addEventListener('dragover', allowDrop);
        });
    }

    function initializeGame() {
        createBoard();
        createPiece('piece1', 0, 0); // Piece 1 at (0, 0)
        createPiece('piece2', 7, 7); // Piece 2 at (7, 7)
        addDropListeners();
    }

    initializeGame();
});

