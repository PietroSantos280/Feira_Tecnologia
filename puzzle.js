// Configurações
const TIMER_DURATION = 300; // 5 minutos
const GRID_SIZE = 4;
const PIECE_WIDTH = 200;
const PIECE_HEIGHT = 250;

// Estado do jogo
let gameState = {
    metadata: null,
    puzzleState: {},
    draggedPiece: null,
    timeRemaining: TIMER_DURATION,
    isTimerRunning: false,
    timerExpired: false,
    isComplete: false,
    timerInterval: null
};

// Inicializar o jogo
function initGame() {
    try {
        generateMetadata();
        initializePuzzleState();
        renderPuzzleGrid();
        startTimer();
    } catch (error) {
        console.error('Erro ao inicializar o jogo:', error);
    }
}

// Gerar metadados das peças
function generateMetadata() {
    const pieces = [];
    for (let i = 0; i < 16; i++) {
        const row = Math.floor(i / 4);
        const col = i % 4;
        pieces.push({
            id: i,
            row: row,
            col: col,
            correct_position: { row, col }
        });
    }
    gameState.metadata = {
        total_pieces: 16,
        grid_size: 4,
        piece_width: PIECE_WIDTH,
        piece_height: PIECE_HEIGHT,
        pieces: pieces
    };
}

// Inicializar estado do quebra-cabeça com peças aleatórias
function initializePuzzleState() {
    gameState.puzzleState = {};
    const shuffledPieces = [...gameState.metadata.pieces].sort(() => Math.random() - 0.5);
    shuffledPieces.forEach((piece, index) => {
        gameState.puzzleState[piece.id] = {
            row: Math.floor(index / 4),
            col: index % 4
        };
    });
}

// Renderizar grid do quebra-cabeça
function renderPuzzleGrid() {
    const grid = document.getElementById('puzzleGrid');
    grid.innerHTML = '';

    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            const cell = document.createElement('div');
            cell.className = 'puzzle-cell';
            cell.ondragover = (e) => e.preventDefault();
            cell.ondrop = () => handleDrop(row, col);

            const pieceId = Object.entries(gameState.puzzleState).find(
                ([_, pos]) => pos.row === row && pos.col === col
            )?.[0];

            if (pieceId !== undefined) {
                const img = document.createElement('img');
                img.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='250'%3E%3Crect fill='%238B6F47' width='200' height='250'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='%23FFA500' text-anchor='middle' dy='.3em' font-weight='bold'%3EPeça ${pieceId}%3C/text%3E%3C/svg%3E`;
                img.draggable = true;
                img.ondragstart = () => {
                    gameState.draggedPiece = parseInt(pieceId);
                    img.classList.add('dragging');
                };
                img.ondragend = () => img.classList.remove('dragging');
                cell.appendChild(img);
            }

            grid.appendChild(cell);
        }
    }
}

// Manipular drop de peça
function handleDrop(targetRow, targetCol) {
    if (gameState.draggedPiece === null || gameState.timerExpired) return;

    const draggedPieceId = gameState.draggedPiece;
    const pieceAtTarget = Object.entries(gameState.puzzleState).find(
        ([_, pos]) => pos.row === targetRow && pos.col === targetCol
    );

    if (pieceAtTarget) {
        const targetPieceId = parseInt(pieceAtTarget[0]);
        const draggedPos = gameState.puzzleState[draggedPieceId];
        gameState.puzzleState[draggedPieceId] = { row: targetRow, col: targetCol };
        gameState.puzzleState[targetPieceId] = draggedPos;
    } else {
        gameState.puzzleState[draggedPieceId] = { row: targetRow, col: targetCol };
    }

    gameState.draggedPiece = null;
    renderPuzzleGrid();
    checkCompletion();
}

// Verificar se o quebra-cabeça está completo
function checkCompletion() {
    if (!gameState.metadata) return;

    const isComplete = gameState.metadata.pieces.every((piece) => {
        const currentPos = gameState.puzzleState[piece.id];
        return (
            currentPos &&
            currentPos.row === piece.correct_position.row &&
            currentPos.col === piece.correct_position.col
        );
    });

    if (isComplete && !gameState.isComplete) {
        gameState.isComplete = true;
        gameState.isTimerRunning = false;
        const timeUsed = TIMER_DURATION - gameState.timeRemaining;
        const formattedTime = formatTime(timeUsed);
        document.getElementById('statusText').textContent = `🎉 Parabéns! Você completou em ${formattedTime}!`;
        document.getElementById('statusMessage').classList.add('show');
    }
}

// Iniciar timer
function startTimer() {
    gameState.isTimerRunning = true;
    gameState.timerExpired = false;
    gameState.timeRemaining = TIMER_DURATION;
    updateTimerDisplay();

    gameState.timerInterval = setInterval(() => {
        if (!gameState.isTimerRunning) {
            clearInterval(gameState.timerInterval);
            return;
        }

        gameState.timeRemaining--;

        if (gameState.timeRemaining <= 0) {
            gameState.timeRemaining = 0;
            gameState.isTimerRunning = false;
            gameState.timerExpired = true;
            clearInterval(gameState.timerInterval);
            showGameOver();
        }

        updateTimerDisplay();
    }, 1000);
}

// Atualizar exibição do timer
function updateTimerDisplay() {
    const timerValue = document.getElementById('timerValue');
    const timerDisplay = document.getElementById('timerDisplay');
    
    timerValue.textContent = formatTime(gameState.timeRemaining);

    timerValue.classList.remove('warning', 'danger');
    timerDisplay.classList.remove('pulse');

    if (gameState.timerExpired) {
        timerValue.classList.add('danger');
    } else if (gameState.timeRemaining <= 30) {
        timerValue.classList.add('warning');
        timerDisplay.classList.add('pulse');
    }
}

// Formatar tempo em MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Mostrar tela de game over
function showGameOver() {
    document.getElementById('gameOverScreen').classList.add('show');
}

// Resetar jogo
function resetGame() {
    document.getElementById('gameOverScreen').classList.remove('show');
    document.getElementById('statusMessage').classList.remove('show');
    gameState.isComplete = false;
    gameState.draggedPiece = null;
    clearInterval(gameState.timerInterval);
    initializePuzzleState();
    renderPuzzleGrid();
    startTimer();
}

// Iniciar jogo quando página carregar
window.addEventListener('DOMContentLoaded', initGame);
