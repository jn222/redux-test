import { EditPostForm } from "@/app/components/EditPostForm"

export default function PostPage({
  params: { id }
}: {
  params: { id: string }
}) {
  return <EditPostForm id={id} />
}

export const metadata = {
  title: "Edit Post"
}
