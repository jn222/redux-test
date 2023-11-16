import { createSlice } from "@reduxjs/toolkit"

const initialState: Post[] = [
  { id: "1", title: "First Post!", content: "Hello!" },
  { id: "2", title: "Second Post", content: "More text" }
]

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded(state, action) {
      state.push(action.payload)
    }
  }
})

/* Types */

export interface Post {
  id: string
  title: string
  content: string
}
