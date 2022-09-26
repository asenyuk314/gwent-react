import React, { memo, useCallback } from 'react'

import { useAppDispatch } from 'src/app/hooks'
// TODO: переместить action повыше
import { onPlayCardHandler } from '../../pages/table-screen/table-screen-actions'
import { CardFaceProps } from './card-face-interfaces'
import styles from './card-face.module.scss'

export const CardFace = memo(({ disabled, index, power }: CardFaceProps) => {
  const dispatch = useAppDispatch()
  const onCardClickHandler = useCallback(() => {
    if (!disabled && typeof index === 'number') {
      dispatch(onPlayCardHandler('user', index))
    }
  }, [disabled, dispatch, index])

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
