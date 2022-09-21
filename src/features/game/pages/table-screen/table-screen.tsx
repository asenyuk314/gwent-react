import React, { memo, useCallback } from 'react'

import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import { Card } from './components/card'
import { skipTurn } from './table-screen-actions'
import { getGameState } from '../../game-selectors'
import styles from './table-screen.module.scss'

export const TableScreen = memo(() => {
  const dispatch = useAppDispatch()
  const { turnNumber, players: { computer, user } } = useAppSelector(getGameState)

  const onSkipTurnHandler = useCallback(() => {
    dispatch(skipTurn('user'))
  }, [dispatch])

  return (
    <div className={styles.TableScreen}>
      <div className={styles.ComputerWrapper}>
        <div className={styles.Hand}>
          {computer.hand.map(item => (
            <div key={item.id}>{item.power}</div>
          ))}
        </div>
        {computer.skippedTurn && (
          <div className={styles.SkipSign}>Computer Passed</div>
        )}
      </div>
      <div className={styles.Table}>
        <div />
        <div>{computer.power}</div>
        <div>{computer.deck.length}</div>
      </div>

      <div className={styles.Table}>
        <div />
        <div className={styles.Score}>
          <div>{`Score ${user.score}:${computer.score}`}</div>
          <div>{`Turn ${turnNumber}`}</div>
        </div>
        <div>
          <button
            onClick={onSkipTurnHandler}
            disabled={user.skippedTurn}
          >
            Pass
          </button>
        </div>
      </div>

      <div className={styles.Table}>
        <div />
        <div>{user.power}</div>
        <div>{user.deck.length}</div>
      </div>
      <div className={styles.Hand}>
        {user.hand.map((item, index) => (
          <Card
            key={item.id}
            index={index}
            disabled={user.skippedTurn}
            {...item}
          />
        ))}
      </div>
    </div>
  )
})
