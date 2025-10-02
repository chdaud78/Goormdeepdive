import { startTransition, useMemo, useOptimistic, useTransition } from 'react'
import { postsApi } from '@/api/post.js'

export function LikeButton({ postId, initiallyLiked = false, initialCount = 0, onSettled }) {
  const [isPending, startTrans] = useTransition()

  const base = useMemo(
    () => ({ liked: !!initiallyLiked, likes: Number(initialCount) || 0 }),
    [initiallyLiked, initialCount]
  )

  const [optimistic, setOptimistic] = useOptimistic(base, (curr, action) => {
    const delta = action.like === curr.liked ? 0 : action.like ? +1 : -1
    return { liked: action.like, count: curr.count + delta }
  })

  const onToggle = () => {
    const nextLike = !optimistic.liked
    setOptimistic({ like: nextLike })
    startTransition(async () => {
      try {
        const res = await postsApi.like(postId, nextLike)
      } catch {
        setOptimistic({ like: !nextLike })
      }
    })
  }

  return (
    <button
      onClick={onToggle}
      disabled={isPending}
      className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 disabled:opacity-60"
      aria-pressed={optimistic.liked}
      title={optimistic.liked ? '좋아요 취소' : '좋아요'}
    >
      <span>{optimistic.liked ? '❤️' : '🤍'}</span>
      <span className="text-sm">{optimistic.likes}</span>
      {isPending && <span className="text-xs text-slate-500">업데이트 중…</span>}
    </button>
  )
}

export default LikeButton
