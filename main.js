const choices = document.querySelector('.choices')
const score = document.querySelector('#score')
const result = document.querySelector('#result')
const restartBtn = document.querySelector('#restart')
const modal = document.querySelector('.modal')

const scoreboard = {
  player: 0,
  computer: 0
}

window.addEventListener('click', clearModal)
choices.addEventListener('click', play)
restartBtn.addEventListener('click', resetGame)

function resetGame() {
  scoreboard.player = 0
  scoreboard.computer = 0

  updateScore()

  restartBtn.style.display = 'none'
}

function play(e) {
  if (e.target.classList.contains('choice')) {
    restartBtn.style.display = 'inline-block'
    const playerChoice = e.target.id
    const computerChoice = getComputerChoice()

    console.log(playerChoice, computerChoice)

    const winner = getWinner(playerChoice, computerChoice)

    showWinner(winner, computerChoice)
  }
}

function getComputerChoice() {
  const rand = Math.random()

  if (rand < 0.34) return 'rock'
  else if (rand <= 0.67) return 'paper'
  else return 'scissors'
}

function getWinner(player, computer) {
  if (player === computer) return 'draw'
  else if (player === 'rock')
    return computer === 'paper' ? 'computer' : 'player'
  else if (player === 'paper')
    return computer === 'rock' ? 'player' : 'computer'
  else if (player === 'scissors')
    return computer === 'paper' ? 'player' : 'computer'
}

function showWinner(winner, computerChoice) {
  if (winner === 'player') {
    scoreboard.player++
    result.innerHTML = `
    <h1 class="text-win">You Win</h1>
    ${getTemplateModal(computerChoice)}`
  } else if (winner === 'computer') {
    scoreboard.computer++
    result.innerHTML = `
    <h1 class="text-lose">Computer Win</h1>
    ${getTemplateModal(computerChoice)}`
  } else {
    result.innerHTML = `
    <h1>It's A Draw</h1>
    ${getTemplateModal(computerChoice)}`
  }

  updateScore()

  modal.style.display = 'block'
}

function updateScore() {
  score.innerHTML = `
  <p>Player: ${scoreboard.player}</p>
  <p>Computer: ${scoreboard.computer}</p>
  `
}

function getTemplateModal(computerChoice) {
  return `
  <i class="fas fa-hand-${computerChoice} fa-10x"></i>
  <p>Computer chose <strong>${computerChoice}</strong></p>`
}

function clearModal(e) {
  if (e.target === modal) modal.style.display = 'none'
}
