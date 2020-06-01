const X_CLASS = 'x'
const O_CLASS = 'o'
const board = document.getElementById('board-container')
const mainGameCells = document.querySelectorAll('.main-cells')
const innerGameCells = document.querySelectorAll('.inner-cells')
const gameOverScreen = document.querySelector('.game-over-message')
const gameEndMessage = document.querySelector('[data-wlt-text]')
const restartButton = document.getElementById('restart-button')
const startScreen = document.querySelector('.starting-screen')
const startButton = document.querySelector('.start-game-button')

const topLeft = document.getElementById('1')
const topMid = document.getElementById('2')
const topRight = document.getElementById('3')
const midLeft = document.getElementById('4')
const midMid = document.getElementById('5')
const midRight = document.getElementById('6')
const bottomLeft = document.getElementById('7')
const bottomMid = document.getElementById('8')
const bottomRight = document.getElementById('9')

let circleturn
let lastMove = null

startButton.addEventListener('click', startClickHandler)

function startClickHandler() {
    $(".starting-screen").hide()
    startGame()
}

function startGame() {
    circleturn = false
    innerGameCells.forEach(cell => {
        cell.addEventListener('click', cellClickHandler, {once: true})
    })
    setHoverClasses()
}

function cellClickHandler(e) {
    const cell = e.target
    const currentClass = circleturn ? O_CLASS : X_CLASS
    placeMark(cell, currentClass)
    checkWinX(cell.parentElement)
    checkWinO(cell.parentElement)
    checkDraw(cell.parentElement)
    if (checkGameWinX(mainGameCells)) {
        gameEndMessage.innerHTML = 'X Wins!'
        gameOverScreen.classList.add('show')
    } else if (checkGameWinO(mainGameCells)) {
        gameEndMessage.innerHTML = 'O Wins!'
        gameOverScreen.classList.add('show')
    } else if (checkFullDraw()) {
        gameEndMessage.innerHTML = 'Draw!'
        gameOverScreen.classList.add('show')
    }
    changeTurns()
    setHoverClasses()
    lastMove = cell
    const nextMove = checkEnabledBoards(lastMove)
    if (nextMove.classList.contains('x-win') || nextMove.classList.contains('o-win') || nextMove.classList.contains('draw')) {
        for(let i=0; i<mainGameCells.length; i++) {
            if (!mainGameCells[i].classList.contains('x-win') || !mainGameCells[i].classList.contains('o-win')) {
                enableCells(mainGameCells[i])
            } 
        }
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function changeTurns() {
    circleturn = !circleturn
}

function setHoverClasses() {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if (circleturn) {
        board.classList.add(O_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkEnabledBoards(lastMove) {
    if (isInnerTopLeft(lastMove)) {
        disableCells()
        enableCells(topLeft)
        return topLeft
    } else if (isInnerTopMid(lastMove)) {
        disableCells()
        enableCells(topMid)
        return topMid
    } else if (isInnerTopRight(lastMove)) {
        disableCells()
        enableCells(topRight)
        return topRight
    } else if (isInnerMidLeft(lastMove)) {
        disableCells()
        enableCells(midLeft)
        return midLeft
    } else if (isInnerMidMid(lastMove)) {
        disableCells()
        enableCells(midMid)
        return midMid
    } else if (isInnerMidRight(lastMove)) {
        disableCells()
        enableCells(midRight)
        return midRight
    } else if (isInnerBottomLeft(lastMove)) {
        disableCells()
        enableCells(bottomLeft)
        return bottomLeft
    } else if (isInnerBottomMid(lastMove)) {
        disableCells()
        enableCells(bottomMid)
        return bottomMid
    } else if (isInnerBottomRight(lastMove)) {
        disableCells()
        enableCells(bottomRight)
        return bottomRight
    } else {
        return;
    }
}

function disableCells() {
    mainGameCells.forEach(element => element.classList.add('disabled'))
}

function enableCells(cell) {
    cell.classList.remove('disabled')
    cell.classList.add('enabled')
}

function isInnerTopLeft(cell) {
    let isTopLeft = false
    for (let i=0; i<innerGameCells.length; i+=9) {
        if (cell === innerGameCells[i]) {
            isTopLeft = true
        }
    }
    return isTopLeft
}

function isInnerTopMid(cell) {
    let isTopMid = false
    for (let i=1; i<innerGameCells.length; i+=9) {
        if (cell === innerGameCells[i]) {
            isTopMid = true
        }
    }
    return isTopMid
}

function isInnerTopRight(cell) {
    let isTopRight = false
    for (let i=2; i<innerGameCells.length; i+=9) {
        if (cell === innerGameCells[i]) {
            isTopRight = true
        }
    }
    return isTopRight
}

function isInnerMidLeft(cell) {
    let isMidLeft = false
    for (let i=3; i<innerGameCells.length; i+=9) {
        if (cell === innerGameCells[i]) {
            isMidLeft = true
        }
    }
    return isMidLeft
}

function isInnerMidMid(cell) {
    let isMidMid = false
    for (let i=4; i<innerGameCells.length; i+=9) {
        if (cell === innerGameCells[i]) {
            isMidMid = true
        }
    }
    return isMidMid
}

function isInnerMidRight(cell) {
    let isMidRight = false
    for (let i=5; i<innerGameCells.length; i+=9) {
        if (cell === innerGameCells[i]) {
            isMidRight = true
        }
    }
    return isMidRight
}

function isInnerBottomLeft(cell) {
    let isBottomLeft = false
    for (let i=6; i<innerGameCells.length; i+=9) {
        if (cell === innerGameCells[i]) {
            isBottomLeft = true
        }
    }
    return isBottomLeft
}

function isInnerBottomMid(cell) {
    let isBottomMid = false
    for (let i=7; i<innerGameCells.length; i+=9) {
        if (cell === innerGameCells[i]) {
            isBottomMid = true
        }
    }
    return isBottomMid
}

function isInnerBottomRight(cell) {
    let isBottomRight = false
    for (let i=8; i<innerGameCells.length; i+=9) {
        if (cell === innerGameCells[i]) {
            isBottomRight = true
        }
    }
    return isBottomRight
}



function checkDraw(mainCell) {
    const cells = mainCell.children
    let full = []
    for (let i=0; i<cells.length; i++) {
        if (cells[i].classList.contains('x') || cells[i].classList.contains('o')) {
            full.push(cells[i])
        }
    }
    if (!mainCell.classList.contains('x-win') && !mainCell.classList.contains('o-win') && full.length == 9) {
        mainCell.classList.add('draw')
    }
}

function checkFullDraw() {
    var draw = false
    if ($(".x-win, .o-win, .draw").length === 9) {
        draw = true
    }
    return draw
}



function checkWinX(mainCell) {
    const cells = mainCell.children
    if (cells[0].classList.contains('x') && cells[1].classList.contains('x') && cells[2].classList.contains('x')) {
        mainCell.classList.add('x-win')
    } else if (cells[3].classList.contains('x') && cells[4].classList.contains('x') && cells[5].classList.contains('x')) {
        mainCell.classList.add('x-win')
    } else if (cells[6].classList.contains('x') && cells[7].classList.contains('x') && cells[8].classList.contains('x')) {
        mainCell.classList.add('x-win')
    } else if (cells[0].classList.contains('x') && cells[3].classList.contains('x') && cells[6].classList.contains('x')) {
        mainCell.classList.add('x-win')
    } else if (cells[1].classList.contains('x') && cells[4].classList.contains('x') && cells[7].classList.contains('x')) {
        mainCell.classList.add('x-win')
    } else if (cells[2].classList.contains('x') && cells[5].classList.contains('x') && cells[8].classList.contains('x')) {
        mainCell.classList.add('x-win')
    } else if (cells[0].classList.contains('x') && cells[4].classList.contains('x') && cells[8].classList.contains('x')) {
        mainCell.classList.add('x-win')
    } else if (cells[2].classList.contains('x') && cells[4].classList.contains('x') && cells[6].classList.contains('x')) {
        mainCell.classList.add('x-win')
    }
}

function checkWinO(mainCell) {
    const cells = mainCell.children
    if (cells[0].classList.contains('o') && cells[1].classList.contains('o') && cells[2].classList.contains('o')) {
        mainCell.classList.add('o-win')
    } else if (cells[3].classList.contains('o') && cells[4].classList.contains('o') && cells[5].classList.contains('o')) {
        mainCell.classList.add('o-win')
    } else if (cells[6].classList.contains('o') && cells[7].classList.contains('o') && cells[8].classList.contains('o')) {
        mainCell.classList.add('o-win')
    } else if (cells[0].classList.contains('o') && cells[3].classList.contains('o') && cells[6].classList.contains('o')) {
        mainCell.classList.add('o-win')
    } else if (cells[1].classList.contains('o') && cells[4].classList.contains('o') && cells[7].classList.contains('o')) {
        mainCell.classList.add('o-win')
    } else if (cells[2].classList.contains('o') && cells[5].classList.contains('o') && cells[8].classList.contains('o')) {
        mainCell.classList.add('o-win')
    } else if (cells[0].classList.contains('o') && cells[4].classList.contains('o') && cells[8].classList.contains('o')) {
        mainCell.classList.add('o-win')
    } else if (cells[2].classList.contains('o') && cells[4].classList.contains('o') && cells[6].classList.contains('o')) {
        mainCell.classList.add('o-win')
    }
}

function checkGameWinX(mainCell) {
    var win = false
    if (mainCell[0].classList.contains('x-win') && mainCell[1].classList.contains('x-win') && mainCell[2].classList.contains('x-win')) {
        win = true
    } else if (mainCell[3].classList.contains('x-win') && mainCell[4].classList.contains('x-win') && mainCell[5].classList.contains('x-win')) {
        win = true
    } else if (mainCell[6].classList.contains('x-win') && mainCell[7].classList.contains('x-win') && mainCell[8].classList.contains('x-win')) {
        win = true
    } else if (mainCell[0].classList.contains('x-win') && mainCell[3].classList.contains('x-win') && mainCell[6].classList.contains('x-win')) {
        win = true
    } else if (mainCell[1].classList.contains('x-win') && mainCell[4].classList.contains('x-win') && mainCell[7].classList.contains('x-win')) {
        win = true
    } else if (mainCell[2].classList.contains('x-win') && mainCell[5].classList.contains('x-win') && mainCell[8].classList.contains('x-win')) {
        win = true
    } else if (mainCell[0].classList.contains('x-win') && mainCell[4].classList.contains('x-win') && mainCell[8].classList.contains('x-win')) {
        win = true
    } else if (mainCell[2].classList.contains('x-win') && mainCell[4].classList.contains('x-win') && mainCell[6].classList.contains('x-win')) {
        win = true
    }
    return win
}

function checkGameWinO(mainCell) {
    var win = false
    if (mainCell[0].classList.contains('o-win') && mainCell[1].classList.contains('o-win') && mainCell[2].classList.contains('o-win')) {
        win = true
    } else if (mainCell[3].classList.contains('o-win') && mainCell[4].classList.contains('o-win') && mainCell[5].classList.contains('o-win')) {
        win = true
    } else if (mainCell[6].classList.contains('o-win') && mainCell[7].classList.contains('o-win') && mainCell[8].classList.contains('o-win')) {
        win = true
    } else if (mainCell[0].classList.contains('o-win') && mainCell[3].classList.contains('o-win') && mainCell[6].classList.contains('o-win')) {
        win = true
    } else if (mainCell[1].classList.contains('o-win') && mainCell[4].classList.contains('o-win') && mainCell[7].classList.contains('o-win')) {
        win = true
    } else if (mainCell[2].classList.contains('o-win') && mainCell[5].classList.contains('o-win') && mainCell[8].classList.contains('o-win')) {
        win = true
    } else if (mainCell[0].classList.contains('o-win') && mainCell[4].classList.contains('o-win') && mainCell[8].classList.contains('o-win')) {
        win = true
    } else if (mainCell[2].classList.contains('o-win') && mainCell[4].classList.contains('o-win') && mainCell[6].classList.contains('o-win')) {
        win = true
    }
    return win
}

restartButton.addEventListener('click', restartClickHandler)

function restartClickHandler() {
    resetBoardClasses()
    setHoverClasses()
    gameOverScreen.classList.remove('show')
    startGame()
}

function resetBoardClasses() {
    for (let i=0; i<innerGameCells.length; i++) {
        innerGameCells[i].classList.remove('x')
        innerGameCells[i].classList.remove('o')
    }
    for (let i=0; i<mainGameCells.length; i++) {
        mainGameCells[i].classList.remove('disabled')
        enableCells[i]
        mainGameCells[i].classList.remove('x-win')
        mainGameCells[i].classList.remove('o-win')
        mainGameCells[i].classList.remove('draw')
    }
}

$(".see-rules").click(() => {
    $(".starting-screen").show()
    $(".start-game-button").html("Resume")
})

$(".restart-game").click(restartClickHandler)