import { AppDispatch } from 'src/app/store'
import { startNewGame } from '../../game-actions'
import { resetState } from '../../game-slice'

export const playAgain = () => (dispatch: AppDispatch) => {
  dispatch(resetState())
  dispatch(startNewGame())
}
