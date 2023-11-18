import { Post, ReactionData, useDispatch, reactionAdded } from "@/lib/redux"

const reactionEmoji: Record<keyof ReactionData, string> = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀"
}

export const ReactionButtonList = ({ post }: { post: Post }) => {
  const dispatch = useDispatch()
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() =>
          dispatch(
            reactionAdded({
              postId: post.id,
              //  TODO figure out how to keep implicit typing with object.entries
              reaction: name as keyof ReactionData
            })
          )
        }
      >
        {emoji} {post.reactions[name as keyof ReactionData]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}
