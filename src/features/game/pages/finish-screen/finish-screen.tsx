import React, { memo, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import { StyledButton } from 'src/features/game/components'
import { playAgain } from './finish-screen-actions'
import { AUDIO_BY_PLAYER_NAME } from './finish-screen-constants'
import { getResultMessage, getScoreMessage, getWinner } from './finish-screen-selectors'
import styles from './finish-screen.module.scss'

export const FinishScreen = memo(() => {
  const dispatch = useAppDispatch()
  const resultMessage = useAppSelector(getResultMessage)
  const scoreMessage = useAppSelector(getScoreMessage)
  const winner = useAppSelector(getWinner)
  const audio = winner ? new Audio(AUDIO_BY_PLAYER_NAME[winner]) : null

  useEffect(() => {
    if (audio) {
      audio.play()
    }
  }, [audio])

  const onPlayAgainClickHandler = () => {
    dispatch(playAgain())
  }

  return (
    <div className={styles.FinishScreen}>
      <div>{resultMessage}</div>
      <div>{scoreMessage}</div>
      <StyledButton onClick={onPlayAgainClickHandler}>Play again</StyledButton>
    </div>
  )
})
