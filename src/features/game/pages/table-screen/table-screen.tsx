import React, { memo, useCallback } from 'react'

import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import { CardBack, CardFace, StyledButton } from 'src/features/game/components'
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
      <div className={styles.HandWrapper}>
        <div className={styles.Hand}>
          {computer.hand.map(item => (
            <CardBack key={item.id} />
          ))}
        </div>
        {computer.skippedTurn && (
          <div className={styles.SkipSign}>Computer Passed</div>
        )}
      </div>

      <div className={styles.MiddleElement}>
        {computer.power > 0 && (
          <CardFace power={computer.power} disabled />
        )}
      </div>
      <CardBack deckSize={computer.deck.length} />

      <div className={styles.MiddleElement}>
        <div className={styles.Score}>
          <div>{`Score ${user.score}:${computer.score}`}</div>
          <div>{`Turn ${turnNumber}`}</div>
        </div>
      </div>

      <div>
        <StyledButton
          className={styles.PassButton}
          onClick={onSkipTurnHandler}
          disabled={user.skippedTurn}
        >
          Pass
        </StyledButton>
      </div>

      <div className={styles.MiddleElement}>
        {user.power > 0 && (
          <CardFace power={user.power} disabled />
        )}
      </div>
      <CardBack deckSize={user.deck.length} />

      <div className={styles.HandWrapper}>
        <div className={styles.Hand}>
          {user.hand.map((item, index) => (
            <CardFace
              key={item.id}
              index={index}
              disabled={user.skippedTurn}
              {...item}
            />
          ))}
        </div>
      </div>
    </div>
  )
})
