import { createSelector } from '@reduxjs/toolkit'
import { capitalize } from 'lodash'

import { PlayerNames } from '../../game-interfaces'
import { getPlayers } from '../../game-selectors'

export const getWinner = createSelector(
  getPlayers,
  (players): PlayerNames | null => players.user.score === players.computer.score
  ? null
  : players.user.score > players.computer.score
    ? 'user'
    : 'computer'
)

export const getResultMessage = createSelector(
  getWinner,
  winner => winner ? `${capitalize(winner)} win` : 'Draw'
)

export const getScoreMessage = createSelector(
  getPlayers,
  players => `${players.user.score}:${players.computer.score}`
)
