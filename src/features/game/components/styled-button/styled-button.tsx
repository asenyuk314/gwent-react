import React, { memo } from 'react'
import cn from 'classnames'

import { StyledButtonProps } from './styled-button-interfaces'
import styles from './styled-button.module.scss'

export const StyledButton = memo(({
  children,
  className,
  disabled,
  onClick
}: StyledButtonProps) => (
  <button
    className={cn(styles.StyledButton, className)}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
))
