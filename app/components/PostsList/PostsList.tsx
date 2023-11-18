"use client"
import {
  Status,
  fetchPosts,
  selectPosts,
  selectStatus,
  useDispatch,
  useSelector
} from "@/lib/redux"
import Link from "next/link"
import { PostAuthor } from "../PostAuthor"
import { ReactionButtonList } from "../ReactionButtonList"
import { useEffect } from "react"

export const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectPosts)
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))

  const postStatus = useSelector(selectStatus)
  useEffect(() => {
    if (postStatus === Status.Idle) {
      dispatch(fetchPosts())
    }
  })

  const renderedPosts = orderedPosts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <Link href={`/posts/${post.id}`}>
        <h3>
          <u>{post.title}</u>
        </h3>
      </Link>
      {post.userId && <PostAuthor userId={post.userId} />}
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtonList post={post} />
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}
