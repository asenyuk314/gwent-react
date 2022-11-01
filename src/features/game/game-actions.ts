import { AppDispatch, RootState } from 'src/app/store'
import { NUMBER_OF_CARDS_TO_TAKE_AT } from './game-constants'
import { PlayerNames } from './game-interfaces'
import { getComputerHand, getCurrentPlayerName, getPlayers, getPlayerNames } from './game-selectors'
import { finishTurn, playCard, setCurrentPlayer, shuffleDecks, skipPlayerTurn,  takeCards } from './game-slice'
import { getRandomNumber } from './game-utils'

export const takeCardsForPlayers = (numberOfCards: number) => (dispatch: AppDispatch, getState: () => RootState) => {
  const state = getState()
  const playerNames = getPlayerNames(state)
  playerNames.forEach(playerName => {
    dispatch(takeCards({ playerName, numberOfCards }))
  })
}

export const startNewGame = () => (dispatch: AppDispatch) => {
  dispatch(shuffleDecks())
  dispatch(takeCardsForPlayers(NUMBER_OF_CARDS_TO_TAKE_AT.gameStart))
}

export const onPlayCardHandler = (playerName: PlayerNames, index: number) => (dispatch: AppDispatch) => {
  dispatch(playCard({ playerName: playerName, cardIndex: index }))
  dispatch(togglePlayer())
}

const togglePlayer = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const state = getState()
  const players = getPlayers(state)
  const currentPlayerName = getCurrentPlayerName(state)
  const nextPlayerName: PlayerNames = currentPlayerName === 'computer' ? 'user' : 'computer'

  if (!players[nextPlayerName].skippedTurn) {
    dispatch(setCurrentPlayer(nextPlayerName))
  } else if (players[currentPlayerName].skippedTurn) {
    dispatch(finishTurn())
  }
  if (!players.computer.skippedTurn && (nextPlayerName === 'computer' || players.user.skippedTurn)) {
    dispatch(computerTurn())
  }
}

const computerTurn = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const state = getState()
  const hand = getComputerHand(state)
  const willPlayCard = !!hand.length && Math.random() < 0.5
  if (willPlayCard) {
    dispatch(onPlayCardHandler('computer', getRandomNumber(hand.length)))
  } else {
    dispatch(skipTurn('computer'))
  }
}

export const skipTurn = (playerName: PlayerNames) => (dispatch: AppDispatch) => {
  dispatch(skipPlayerTurn(playerName))
  dispatch(togglePlayer())
}
