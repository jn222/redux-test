import type { ReduxState } from "@/lib/redux"
import { createSelector } from "@reduxjs/toolkit"
import { Post } from "./postsSlice"

export const selectPosts = (state: ReduxState) => state.posts.posts
export const selectPostById = (id: string) =>
  createSelector(selectPosts, (posts: Post[]) =>
    posts.find((post) => post.id === id)
  )
export const selectStatus = (state: ReduxState) => state.posts.status
