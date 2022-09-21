import { createSelector } from '@reduxjs/toolkit'

import { getGameState, getPlayers } from '../../game-selectors'

export const getCurrentPlayerName = createSelector(
  getGameState,
  gameState => gameState.currentPlayerName
)

export const getComputerHand = createSelector(
  getPlayers,
  players => players.computer.hand
)
