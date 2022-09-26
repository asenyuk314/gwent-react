import React, { memo } from 'react'

import { CardBackProps } from './card-back-interfaces'
import styles from './card-back.module.scss'

export const CardBack = memo(({ deckSize }: CardBackProps) => (
  <div className={styles.CardBack}>
    <span>🐺</span>
    {deckSize && (<span>{deckSize}</span>)}
  </div>
))
