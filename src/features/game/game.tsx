import React, { memo, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import { Modal } from './components/modal'
import { FinishScreen } from './pages/finish-screen'
import { TableScreen } from './pages/table-screen'
import { startNewGame } from './game-actions'
import { getIsGameFinished } from './game-selectors'
import styles from './game.module.scss'

export const Game = memo(() => {
  const dispatch = useAppDispatch()
  const isGameFinished = useAppSelector(getIsGameFinished)

  useEffect(() => {
    dispatch(startNewGame())
  }, [dispatch])

  return (
    <div className={styles.Game}>
      <Modal />
      {isGameFinished ? (
        <FinishScreen />
      ): (
        <TableScreen />
      )}
    </div>
  )
})
