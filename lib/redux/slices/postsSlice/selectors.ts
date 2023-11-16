import type { ReduxState } from "@/lib/redux"
import { createSelector } from "@reduxjs/toolkit"
import { Post } from "./postsSlice"

export const selectPosts = (state: ReduxState) => state.posts
export const find = (id: string) =>
  createSelector(selectPosts, (posts: Post[]) =>
    posts.find((post) => post.id === id)
  )
