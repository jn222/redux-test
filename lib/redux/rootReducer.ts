/* Instruments */
import { counterSlice, postsSlice, usersSlice } from "./slices"

export const reducer = {
  counter: counterSlice.reducer,
  posts: postsSlice.reducer,
  users: usersSlice.reducer
}
