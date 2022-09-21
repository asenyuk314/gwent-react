import { AppDispatch, RootState } from 'src/app/store'
import { NUMBER_OF_CARDS_TO_TAKE_AT } from './game-constants'
import { getPlayerNames } from './game-selectors'
import { shuffleDecks, takeCards } from './game-slice'

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
