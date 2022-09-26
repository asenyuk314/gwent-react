import { AppDispatch, RootState } from 'src/app/store'
import { PlayerNames } from '../../game-interfaces'
import { getPlayers } from '../../game-selectors'
import { finishTurn, playCard, setCurrentPlayer, skipPlayerTurn } from '../../game-slice'
import { getComputerHand, getCurrentPlayerName } from './table-screen-selectors'
import { getRandomNumber } from './table-screen-utils'

export const onPlayCardHandler = (playerName: PlayerNames, index: number) => (dispatch: AppDispatch) => {
  dispatch(playCard({ playerName: playerName, cardIndex: index }))
  dispatch(togglePlayer())
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

export const skipTurn = (playerName: PlayerNames) => (dispatch: AppDispatch) => {
  dispatch(skipPlayerTurn(playerName))
  dispatch(togglePlayer())
}
