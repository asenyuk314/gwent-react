import { AppDispatch } from 'src/app/store'
import { takeCardsForPlayers } from '../../game-actions'
import { NUMBER_OF_CARDS_TO_TAKE_AT } from '../../game-constants'
import { startNextTurn } from '../../game-slice'

export const onStartNextTurnHandler = () => (dispatch: AppDispatch) => {
  dispatch(startNextTurn())
  dispatch(takeCardsForPlayers(NUMBER_OF_CARDS_TO_TAKE_AT.turnStart))
}
