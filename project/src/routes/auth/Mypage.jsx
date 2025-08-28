import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { me } from '@/api/me.js'
import { token } from '@/api/token.js'
import { queryClient } from '@/lib/queryClient.js'

export default function Mypage() {
  const [hasToken, setHasToken] = useState(Boolean(token.get()))
  const [myProfile, setMyProfile] = useState({ name: '', email: '', avatarUrl: '', bio: '' })
  const [serverErrorMe, setServerErrorMe] = useState('')
  const [pw, setPw] = useState({ currentPassword: '', newPassword: '' })

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['me', hasToken],
    queryFn: async () => {
      const res = await me.get()
      return res.data
    },
    enabled: !!hasToken,
  })

  const patchMeM = useMutation({
    mutationFn: async (myProfile) => {
      const res = await me.patchMe(myProfile)
      return res.data
    },
    onMutate: () => setServerErrorMe(''),
    onSuccess: (data) => {
      queryClient.setQueryData(['me', hasToken], data)
      alert('프로필이 저장되었습니다.')
    },
    onError: (err) => setServerErrorMe(err?.message || '프로필 저장 실패'),
  })

  // 비밀번호 변경 뮤테이션
  const changePwM = useMutation({
    mutationFn: async ({ currentPassword, newPassword }) => {
      const res = await me.changePassword({ currentPassword, newPassword })
      return res.data
    },
    onMutate: () => {},
    onSuccess: () => {
      alert('비밀번호가 변경되었습니다.')
      setPw({ currentPassword: '', newPassword: '' })
    },
    onError: (err) => alert(err?.message || '비밀번호 변경 실패'),
  })

  useEffect(() => {
    if (data) {
      setMyProfile({
        name: data.name || '',
        email: data.email || '',
        avatarUrl: data.avatarUrl || '',
        bio: data.bio || '',
      })
    }
  }, [data])

  if (isLoading) {
    return <div>로딩중...</div>
  }
  if (error) {
    return <div>에러: {error?.message}</div>
  }

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">마이페이지</h1>
        </header>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">내 정보</h2>

          {isLoading ? (
            <p>불러오는 중...</p>
          ) : error && serverErrorMe ? (
            <p className="rounded-lg border border-red-200 bg-red-50 p-2 text-sm text-red-700">
              {serverErrorMe || '정보를 불러오지 못했습니다.'}
            </p>
          ) : (
            <>
              <div className="mb-4 grid gap-3 sm:grid-cols-2">
                <label className="grid gap-2 text-sm">
                  이름
                  <input
                    name="name"
                    value={myProfile.name}
                    onChange={(e) => setMyProfile((p) => ({ ...p, name: e.target.value }))}
                    className="h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400"
                  />
                </label>
                <label className="grid gap-2 text-sm">
                  email
                  <input
                    name="email"
                    value={myProfile.email}
                    onChange={(e) => setMyProfile((p) => ({ ...p, email: e.target.value }))}
                    className="h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400"
                  />
                </label>
                <label className="sm:col-span-2 grid gap-2 text-sm">
                  아바타 URL
                  <input
                    name="avatarUrl"
                    value={myProfile.avatarUrl}
                    onChange={(e) => setMyProfile((p) => ({ ...p, avatarUrl: e.target.value }))}
                    className="h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400"
                  />
                </label>
                <label className="sm:col-span-2 grid gap-2 text-sm">
                  소개
                  <textarea
                    name="bio"
                    rows={4}
                    value={myProfile.bio}
                    onChange={(e) => setMyProfile((p) => ({ ...p, bio: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-slate-400"
                  />
                </label>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => patchMeM.mutate(myProfile)}
                  disabled={patchMeM.isPending}
                  className="h-11 rounded-xl bg-slate-900 px-4 font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
                >
                  {patchMeM.isPending ? '저장 중...' : '프로필 저장'}
                </button>
                <button
                  onClick={() => refetch()}
                  className="h-11 rounded-xl border border-slate-300 bg-white px-4 hover:bg-slate-50"
                >
                  새로고침
                </button>
              </div>
            </>
          )}
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">비밀번호 변경</h2>

          <div className="mb-3 grid gap-3 sm:grid-cols-2">
            <label className="grid gap-2 text-sm">
              현재 비밀번호
              <input
                type="password"
                value={pw.currentPassword}
                onChange={(e) => setPw((p) => ({ ...p, currentPassword: e.target.value }))}
                className="h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400"
              />
            </label>
            <label className="grid gap-2 text-sm">
              새 비밀번호
              <input
                type="password"
                value={pw.newPassword}
                onChange={(e) => setPw((p) => ({ ...p, newPassword: e.target.value }))}
                className="h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-400"
              />
            </label>
          </div>

          <button
            onClick={() => changePwM.mutate(pw)}
            disabled={changePwM.isPending || !pw.currentPassword || !pw.newPassword}
            className="h-11 rounded-xl bg-slate-900 px-4 font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {changePwM.isPending ? '변경 중...' : '비밀번호 변경'}
          </button>
        </section>
      </div>
    </div>
  )
}
