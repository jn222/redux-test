"use client"

import { selectUserById } from "@/lib/redux"
import { useSelector } from "react-redux"

export const PostAuthor = ({ userId }: { userId: string }) => {
  const author = useSelector(selectUserById(userId))

  return <span>by {author ? author.name : "Unknown author"}</span>
}
