/* Instruments */
import { counterSlice, postsSlice } from "./slices"

export const reducer = {
  counter: counterSlice.reducer,
  posts: postsSlice.reducer
}
