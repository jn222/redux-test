"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { postAdded, selectUsers } from "@/lib/redux"
import { useRouter } from "next/navigation"
// todo redirect

export const AddPostForm = () => {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [userId, setUserId] = useState("")
  const [error, setError] = useState("")

  const dispatch = useDispatch()

  const users = useSelector(selectUsers)

  // TODO can genericize
  const onTitleChanged = (e: any) => setTitle(e.target.value)
  const onContentChanged = (e: any) => setContent(e.target.value)
  const onAuthorChanged = (e: any) => setUserId(e.target.value)

  const onSave = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId))
      setTitle("")
      setContent("")
      setUserId("")
      setError("")
      router.push("/posts")
    } else {
      setError("Can't save")
    }
  }

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

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
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />

        <button type="button" onClick={onSave} disabled={!canSave}>
          Save Post
        </button>
        {error && <p>{error}</p>}
      </form>
    </section>
  )
}
