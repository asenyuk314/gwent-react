import React, { memo } from 'react'

import { useAppDispatch } from 'src/app/hooks'
import { onPlayCardHandler } from 'src/features/game/game-actions'
import { CardFaceProps } from './card-face-interfaces'
import styles from './card-face.module.scss'

export const CardFace = memo(({ disabled, index, power }: CardFaceProps) => {
  const dispatch = useAppDispatch()
  const onCardClickHandler = () => {
    if (!disabled && typeof index === 'number') {
      dispatch(onPlayCardHandler('user', index))
    }
  }

  return (
    <button
      className={styles.CardFace}
      onClick={onCardClickHandler}
      disabled={disabled}
    >
      <span>⚔️</span>
      <span>{power}</span>
    </button>
  )
})
