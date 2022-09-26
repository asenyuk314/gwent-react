import React, { memo, useCallback } from 'react'

import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import { getGameState } from '../../game-selectors'
import { StyledButton } from '../styled-button'
import { onStartNextTurnHandler } from './modal-actions'
import styles from './modal.module.scss'

export const Modal = memo(() => {
  const dispatch = useAppDispatch()
  const {
    turnIsFinished,
    players: { computer, user },
  } = useAppSelector(getGameState)

  const onButtonClickHandler = useCallback(() => {
    dispatch(onStartNextTurnHandler())
  }, [dispatch])

  return turnIsFinished ? (
    <div className={styles.Modal}>
      <div>{`User ${user.score}:${computer.score} Computer`}</div>
      <div>{`${user.power}:${computer.power}`}</div>
      <div>
        <StyledButton onClick={onButtonClickHandler}>
          Ok
        </StyledButton>
      </div>
    </div>
  ) : null
})
