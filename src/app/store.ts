import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import { gameReducer } from 'src/features/game'

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  devTools: true
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
