import { v4 as uuidv4 } from 'uuid'

import { SingleCard } from './game-interfaces'

const CARDS_POWER = [
  { power: 6, count: 2 },
  { power: 4, count: 3 },
  { power: 2, count: 5 },
  { power: 1, count: 10 }
]

export const DECK_WITH_CARDS = CARDS_POWER.reduce<SingleCard[]>((accumulator, current) => {
  const cards: SingleCard[] = Array(current.count).fill(current.power).map(power => ({ id: uuidv4(), power }))
  return accumulator.concat(cards)
}, [])

export const NUMBER_OF_CARDS_TO_TAKE_AT = {
  gameStart: 5,
  turnStart: 3
}

export const ROUNDS_NUMBER = {
  roundsToWin: 2,
  totalRounds: 3
}
