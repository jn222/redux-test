import { find, useSelector } from "@/lib/redux"
import { useRouter } from "next/router"

export default function PostPage() {
  const router = useRouter()
  const id = router.query.id
  const post = useSelector(find(id as string))
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
        <p className="post-content">{post.content}</p>
      </article>
    </section>
  )
}
