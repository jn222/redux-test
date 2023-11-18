/* Instruments */
import type { ReduxState, User } from "@/lib/redux"
import { createSelector } from "@reduxjs/toolkit"

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUsers = (state: ReduxState) => state.users
export const selectUserById = (userId: string) =>
  createSelector(selectUsers, (users: User[]) =>
    users.find((user) => user.id === userId)
  )
