import React, { memo, useCallback, useMemo, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import { playAgain } from './finish-screen-actions'
import { AUDIO_BY_PLAYER_NAME } from './finish-screen-constants'
import { getResultMessage, getScoreMessage, getWinner } from './finish-screen-selectors'
import styles from './finish-screen.module.scss'

export const FinishScreen = memo(() => {
  const dispatch = useAppDispatch()
  const resultMessage = useAppSelector(getResultMessage)
  const scoreMessage = useAppSelector(getScoreMessage)
  const winner = useAppSelector(getWinner)
  const audio = useMemo(() => winner && new Audio(AUDIO_BY_PLAYER_NAME[winner]), [winner])

  useEffect(() => {
    if (audio) {
      audio.play()
    }
  })

  const onPlayAgainClickHandler = useCallback(() => {
    dispatch(playAgain())
  }, [dispatch])

  return (
    <div className={styles.FinishScreen}>
      <div>{resultMessage}</div>
      <div>{scoreMessage}</div>
      <button onClick={onPlayAgainClickHandler}>Play again</button>
    </div>
  )
})
