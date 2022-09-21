import React, { memo, useCallback } from 'react'

import { useAppDispatch } from 'src/app/hooks'
import { onPlayCardHandler } from '../../table-screen-actions'
import { CardProps } from './card-interfaces'
import styles from './card.module.scss'

export const Card = memo(({ disabled, index, power }: CardProps) => {
  const dispatch = useAppDispatch()
  const onCardClickHandler = useCallback(() => {
    dispatch(onPlayCardHandler('user', index))
  }, [dispatch, index])

  return (
    <button
      className={styles.Card}
      onClick={onCardClickHandler}
      disabled={disabled}
    >
      {power}
    </button>
  )
})
