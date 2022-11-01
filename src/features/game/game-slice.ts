import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { forIn, shuffle } from 'lodash'

import { DECK_WITH_CARDS } from './game-constants'
import { GameState, Player, PlayerNames } from './game-interfaces'

// INITIAL STATE
const INITIAL_PLAYER: Player = {
  score: 0,
  power: 0,
  skippedTurn: false,
  deck: [],
  hand: []
}

const INITIAL_STATE: GameState = {
  turnNumber: 1,
  turnIsFinished: false,
  currentPlayerName: 'user',
  players: {
    user: INITIAL_PLAYER,
    computer: INITIAL_PLAYER
  }
}

// ACTION PAYLOAD INTERFACES
interface TakeCardsPayload {
  playerName: PlayerNames
  numberOfCards: number
}

interface PlayCardPayload {
  playerName: PlayerNames
  cardIndex: number
}

// SLICE
const gameSlice = createSlice({
  name: 'game',
  initialState: INITIAL_STATE,
  reducers: {
    shuffleDecks: state => {
      forIn(state.players, player => {
        player.deck = shuffle(DECK_WITH_CARDS)
        player.hand = []
      })
    },
    takeCards: (state, { payload }: PayloadAction<TakeCardsPayload>) => {
      const player = state.players[payload.playerName]
      const possibleCardsToTake = Math.min(payload.numberOfCards, player.deck.length)
      player.hand = player.hand.concat(player.deck.slice(0, possibleCardsToTake))
      player.deck = player.deck.slice(possibleCardsToTake)
      player.power = 0
    },
    playCard: (state, { payload }: PayloadAction<PlayCardPayload>) => {
      const player = state.players[payload.playerName]
      const card = player.hand[payload.cardIndex]
      player.power += card.power
      player.hand.splice(payload.cardIndex, 1)
    },
    setCurrentPlayer: (state, { payload }: PayloadAction<PlayerNames>) => {
      state.currentPlayerName = payload
    },
    skipPlayerTurn: (state, { payload }: PayloadAction<PlayerNames>) => {
      state.players[payload].skippedTurn = true
    },
    finishTurn: state => {
      const userPower = state.players.user.power
      const computerPower = state.players.computer.power
      if (userPower !== computerPower) {
        const winnerOfTurn: PlayerNames = userPower > computerPower ? 'user' : 'computer'
        state.players[winnerOfTurn].score++
      }
      state.turnIsFinished = true
    },
    startNextTurn: state => {
      state.turnIsFinished = false
      state.turnNumber++
      state.currentPlayerName = 'user'
      forIn(state.players, player => {
        player.power = 0
        player.skippedTurn = false
      })
    },
    resetState: () => INITIAL_STATE
  }
})

export const {
  actions: {
    finishTurn,
    playCard,
    resetState,
    setCurrentPlayer,
    shuffleDecks,
    skipPlayerTurn,
    startNextTurn,
    takeCards
  },
  reducer: gameReducer
} = gameSlice
