import { useEffect, useState } from 'react'

import { me } from '@/api/me.js'

export default function Mypage() {
  const [myProfile, setMyProfile] = useState({})

  useEffect(() => {
    me.get().then((res) => {
      setMyProfile(res.data)
    })
  }, [])

  return (
    <div>
      <div>{myProfile.name}</div>
    </div>
  )
}
