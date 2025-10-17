// Puzzle Game Logic
class PuzzleGame {
  constructor() {
    this.gridSize = 3
    this.pieces = []
    this.emptyIndex = 0
    this.moves = 0
    this.startTime = null
    this.timerInterval = null
    this.imageUrl = "/public/capa-filhos-do-quarto.webp"

    this.init()
  }

  init() {
    this.setupEventListeners()
    this.createPuzzle()
  }

  setupEventListeners() {
    document.getElementById("shuffleBtn").addEventListener("click", () => this.shuffle())
    document.getElementById("showPreview").addEventListener("click", () => this.showPreview())
    document.getElementById("playAgain").addEventListener("click", () => this.reset())

    document.querySelectorAll('input[name="difficulty"]').forEach((radio) => {
      radio.addEventListener("change", (e) => {
        this.gridSize = Number.parseInt(e.target.value)
        this.reset()
      })
    })
  }

  createPuzzle() {
    const grid = document.getElementById("puzzleGrid")
    grid.innerHTML = ""
    grid.className = `puzzle-grid grid-${this.gridSize}`

    const totalPieces = this.gridSize * this.gridSize
    this.pieces = Array.from({ length: totalPieces }, (_, i) => i)
    this.emptyIndex = totalPieces - 1

    this.renderPuzzle()
  }

  renderPuzzle() {
    const grid = document.getElementById("puzzleGrid")
    grid.innerHTML = ""

    const pieceSize = 100 / this.gridSize

    this.pieces.forEach((piece, index) => {
      const div = document.createElement("div")
      div.className = "puzzle-piece"
      div.dataset.index = index

      if (piece === this.emptyIndex) {
        div.classList.add("empty")
      } else {
        const row = Math.floor(piece / this.gridSize)
        const col = piece % this.gridSize

        div.style.backgroundImage = `url('${this.imageUrl}')`
        div.style.backgroundSize = `${this.gridSize * 100}% ${this.gridSize * 100}%`
        div.style.backgroundPosition = `${col * pieceSize}% ${row * pieceSize}%`

        div.addEventListener("click", () => this.movePiece(index))
      }

      grid.appendChild(div)
    })
  }

  movePiece(clickedIndex) {
    if (!this.canMove(clickedIndex)) return

    // Start timer on first move
    if (this.moves === 0) {
      this.startTimer()
    }
    // Swap pieces
    ;[this.pieces[clickedIndex], this.pieces[this.emptyIndex]] = [
      this.pieces[this.emptyIndex],
      this.pieces[clickedIndex],
    ]

    this.emptyIndex = clickedIndex
    this.moves++

    document.getElementById("moveCount").textContent = this.moves

    this.renderPuzzle()

    if (this.checkWin()) {
      this.win()
    }
  }

  canMove(index) {
    const emptyRow = Math.floor(this.emptyIndex / this.gridSize)
    const emptyCol = this.emptyIndex % this.gridSize
    const clickedRow = Math.floor(index / this.gridSize)
    const clickedCol = index % this.gridSize

    return (
      (Math.abs(emptyRow - clickedRow) === 1 && emptyCol === clickedCol) ||
      (Math.abs(emptyCol - clickedCol) === 1 && emptyRow === clickedRow)
    )
  }

  shuffle() {
    // Reset game state
    this.moves = 0
    this.stopTimer()
    document.getElementById("moveCount").textContent = "0"
    document.getElementById("timer").textContent = "00:00"
    document.getElementById("successMessage").style.display = "none"

    // Shuffle pieces with valid moves
    for (let i = 0; i < 100; i++) {
      const validMoves = this.getValidMoves()
      const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)]
      ;[this.pieces[randomMove], this.pieces[this.emptyIndex]] = [this.pieces[this.emptyIndex], this.pieces[randomMove]]

      this.emptyIndex = randomMove
    }

    this.renderPuzzle()
  }

  getValidMoves() {
    const moves = []
    const emptyRow = Math.floor(this.emptyIndex / this.gridSize)
    const emptyCol = this.emptyIndex % this.gridSize

    // Check all four directions
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]

    directions.forEach(([dRow, dCol]) => {
      const newRow = emptyRow + dRow
      const newCol = emptyCol + dCol

      if (newRow >= 0 && newRow < this.gridSize && newCol >= 0 && newCol < this.gridSize) {
        moves.push(newRow * this.gridSize + newCol)
      }
    })

    return moves
  }

  checkWin() {
    return this.pieces.every((piece, index) => piece === index)
  }

  win() {
    this.stopTimer()

    document.getElementById("finalMoves").textContent = this.moves
    document.getElementById("finalTime").textContent = document.getElementById("timer").textContent

    document.getElementById("successMessage").style.display = "block"

    // Scroll to success message
    document.getElementById("successMessage").scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  }

  startTimer() {
    this.startTime = Date.now()
    this.timerInterval = setInterval(() => {
      const elapsed = Date.now() - this.startTime
      const minutes = Math.floor(elapsed / 60000)
      const seconds = Math.floor((elapsed % 60000) / 1000)

      document.getElementById("timer").textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    }, 1000)
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval)
      this.timerInterval = null
    }
  }

  showPreview() {
    const modal = window.bootstrap.Modal(document.getElementById("previewModal"))
    modal.show()
  }

  reset() {
    this.moves = 0
    this.stopTimer()
    document.getElementById("moveCount").textContent = "0"
    document.getElementById("timer").textContent = "00:00"
    document.getElementById("successMessage").style.display = "none"
    this.createPuzzle()
    this.shuffle()
  }
}

// Initialize puzzle when page loads
document.addEventListener("DOMContentLoaded", () => {
  const puzzle = new PuzzleGame()

  // Auto-shuffle on load
  setTimeout(() => {
    puzzle.shuffle()
  }, 500)
})
