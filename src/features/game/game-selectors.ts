import { createSelector } from '@reduxjs/toolkit'
import { some } from 'lodash'

import { RootState } from 'src/app/store'
import { ROUNDS_NUMBER } from './game-constants'
import { PlayerNames } from './game-interfaces'

export const getGameState = (state: RootState) => state.game

export const getPlayers = createSelector(
  getGameState,
  gameState => gameState.players
)

export const getPlayerNames = createSelector(
  getPlayers,
  players => Object.keys(players) as PlayerNames[]
)

export const getComputerHand = createSelector(
  getPlayers,
  players => players.computer.hand
)

export const getIsGameFinished = createSelector(
  getGameState,
  gameState => !gameState.turnIsFinished
    && (gameState.turnNumber > ROUNDS_NUMBER.totalRounds
    || some(gameState.players, ['score', ROUNDS_NUMBER.roundsToWin]))
)

export const getCurrentPlayerName = createSelector(
  getGameState,
  gameState => gameState.currentPlayerName
)
