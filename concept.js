document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 8; 
    const board = document.getElementById('board');
    const trash = document.getElementById('trash');
    const piecesContainer = document.getElementById('pieces');

    var current_piece_id = 0;

    // TODO create different piece types
    // TODO create cards
    // TODO create images
    // TODO stacking different types of tokens on one space
    // TODO clear all of one color
    // TODO clear board

    function createBoard() {
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.setAttribute('data-row', row);
                square.setAttribute('data-col', col);
                square.setAttribute('occupied', false);
                square.addEventListener('drop', handleDrop);
                square.addEventListener('dragover', allowDrop);
                board.appendChild(square);
            }
        }
    }

    function createTrash() {
        trash.addEventListener('drop', handleDrop);
        trash.addEventListener('dragover', allowDrop);
    }

    function createPiece() {

        const STARTING_ROW = 50 + 3;
        const STARTING_COL = 25 + 3;

        const piece = document.createElement('div');

        piece.classList.add('piece');
        piece.setAttribute('id', current_piece_id);
        piece.setAttribute('fromStart', true);
        piece.setAttribute('draggable', true);

        piece.style.top = STARTING_ROW + 'px';
        piece.style.left = STARTING_COL + 'px';

        piece.addEventListener('dragstart', handleDragStart);
        piece.addEventListener('drop', handleDrop);
        piece.addEventListener('dragover', allowDrop);

        piecesContainer.appendChild(piece);

        current_piece_id += 1;

    }

    function handleDragStart(event) {
        event.dataTransfer.setData('piece', event.target.id);
    }

    function handleDrop(event) {
        event.preventDefault();

        const pieceId = event.dataTransfer.getData('piece');
        const piece = document.getElementById(pieceId);
        const target = event.target;

        const fromStart = piece.getAttribute('fromStart');
        var validTarget = false;

        if (target.classList.contains('square')) {

            const row = target.getAttribute('data-row');
            const col = target.getAttribute('data-col');

            target.setAttribute('occupied', true);
            piece.setAttribute('data-row', row);
            piece.setAttribute('data-col', col);

            piece.style.top = calculateRowLoc(row) + 'px';
            piece.style.left = calculateColLoc(col) + 'px';

            // TODO edge case where someone drags to stack but they land on the square not the piece
            piece.textContent = "";

            validTarget = true;
        }

        if (target.classList.contains('piece')) {

            const row = target.getAttribute('data-row');
            const col = target.getAttribute('data-col');

            piece.setAttribute('data-row', row);
            piece.setAttribute('data-col', col);

            piece.style.top = calculateRowLoc(row) + 'px';
            piece.style.left = calculateColLoc(col) + 'px';

            piece.textContent = "meow";

            validTarget = true;
        }

        if (target.id == 'trash') {
            piece.remove();
            validTarget = true;
        }

        if (validTarget) {

            if (fromStart == 'true') {
                createPiece();
                piece.setAttribute('fromStart', false);
            }

            // TODO if stacking
            
        }
    }

    function calculateRowLoc (row) {
        return (row * 65) + 13 + 42;
    }

    function calculateColLoc (col) {
        return (col * 65) + 13 + 100;
    }

    function allowDrop(event) {
        event.preventDefault();
    }

    function initializeGame() {
        createBoard();
        createTrash();
        createPiece();
    }

    initializeGame();
});

