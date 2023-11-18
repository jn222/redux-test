import {
  createAsyncThunk,
  createSlice,
  nanoid,
  type PayloadAction
} from "@reduxjs/toolkit"
import { client } from "../../../api/posts/client"

// Test data
// {
//   id: "1",
//   title: "First Post!",
//   userId: "1",
//   content: "Hello!",
//   reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
//   date: sub(new Date(), { minutes: 10 }).toISOString()
// },
// {
//   id: "2",
//   title: "Second Post",
//   userId: "2",
//   content: "More text",
//   reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
//   date: sub(new Date(), { minutes: 5 }).toISOString()
// }

export enum Status {
  Idle,
  Loading,
  Succeeded,
  Failed
}

const initialState: PostSliceState = {
  posts: [],
  status: Status.Idle,
  error: undefined
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await client.get("/fakeApi/posts")
  return response.data
})

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.posts.push(action.payload)
      },
      prepare(title: string, content: string, userId?: string) {
        return {
          payload: {
            id: nanoid(),
            reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
            date: new Date().toISOString(),
            title,
            content,
            userId
          }
        }
      }
    },
    postUpdated(
      state,
      action: PayloadAction<{ id: string; title: string; content: string }>
    ) {
      const { id, title, content } = action.payload
      const existingPost = state.posts.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(
      state,
      action: PayloadAction<{ postId: string; reaction: keyof ReactionData }>
    ) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = Status.Loading
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = Status.Succeeded
        // Add any fetched posts to the array
        state.posts = state.posts.concat(action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = Status.Failed
        state.error = action.error.message
      })
  }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

/* Types */
// TODO Maybe move to types file

export interface ReactionData {
  thumbsUp: number
  hooray: number
  heart: number
  rocket: number
  eyes: number
}

export interface PostContent {
  title: string
  content: string
  userId?: string
  date: string
  reactions: ReactionData
}

export interface Post extends PostContent {
  id: string
}

export interface PostSliceState {
  posts: Post[]
  status: Status
  error?: string
}
