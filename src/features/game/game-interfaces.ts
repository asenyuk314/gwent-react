export type PlayerNames = 'user' | 'computer'

export interface SingleCard {
  id: string
  power: number
}

export interface Player {
  score: number
  power: number
  skippedTurn: boolean
  deck: SingleCard[]
  hand: SingleCard[]
}

export interface GameState {
  turnNumber: number
  turnIsFinished: boolean
  currentPlayerName: PlayerNames
  players: Record<PlayerNames, Player>
}
