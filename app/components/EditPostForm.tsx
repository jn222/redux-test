"use client"

import { selectPostById, postUpdated } from "@/lib/redux"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export const EditPostForm = ({ id }: { id: string }) => {
  const router = useRouter()

  const post = useSelector(selectPostById(id))

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const dispatch = useDispatch()

  const onTitleChanged = (e: any) => setTitle(e.target.value)
  const onContentChanged = (e: any) => setContent(e.target.value)

  const onSave = () => {
    if (title && content) {
      dispatch(postUpdated({ id, title, content }))
      router.push(`/posts/${id}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
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
      </form>
      <button type="button" onClick={onSave}>
        Save Post
      </button>
    </section>
  )
}
