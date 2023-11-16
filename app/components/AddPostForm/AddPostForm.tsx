"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { nanoid } from "@reduxjs/toolkit"
import { postsSlice } from "@/lib/redux"
import { useRouter } from "next/navigation"
// todo redirect

export const AddPostForm = () => {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState("")

  const dispatch = useDispatch()

  const onTitleChanged = (e: any) => setTitle(e.target.value)
  const onContentChanged = (e: any) => setContent(e.target.value)

  const onSave = () => {
    if (title && content) {
      dispatch(
        postsSlice.actions.postAdded({
          id: nanoid(),
          title,
          content
        })
      )
      setTitle("")
      setContent("")
      setError("")
      router.push('/posts')
    } else {
      setError("Can't save")
    }
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSave}>Save Post</button>
        {error && <p>{error}</p>}
      </form>
    </section>
  )
}
