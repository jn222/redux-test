"use client"

import { PostAuthor } from "@/app/components/PostAuthor"
import { ReactionButtonList } from "@/app/components/ReactionButtonList"
import { selectPostById, useSelector } from "@/lib/redux"
import Link from "next/link"

export default function PostPage({
  params: { id }
}: {
  params: { id: string }
}) {
  const post = useSelector(selectPostById(id))
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }
  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        {post.userId && <PostAuthor userId={post.userId} />}
        <p className="post-content">{post.content}</p>
        <ReactionButtonList post={post} />
        <Link href={`/posts/${id}/edit`} className="button">
          <u>Edit Post</u>
        </Link>
      </article>
    </section>
  )
}
