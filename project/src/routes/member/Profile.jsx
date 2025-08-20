import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import ProfileCard from '@/components/ProfileCard.jsx'

// 방법2 react use
/*async function fetchUser() {
  const res = await fetch('/users.json')
  if (!res.ok) {
    throw new Error('데이터 불러오기 실패')
  }
  return res.json()
}

const userPromise = fetchUser()*/

// 방법 4 axios + react query
async function fetchUsers() {
  const res = await axios.get('/users.json')
  return res.data
}

export default function Profile() {
  // 방법1 useEffect + fetch
  /*const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/users.json')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('데이터 로드 실패:', err))
  }, [])*/

  //방법2 react use
  /*  const user = use(userPromise)*/

  //방법3 axios
  /*const [users, setUsers] = useState([])

  useEffect(() => {
    axios
      .get('/users.json')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err))
  }, [])*/

  // 방법 4 axios + react query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'], // 캐시 key(중복 요청 방지)
    queryFn: fetchUsers, // 호출 함수
    staleTime: 1000 * 60, // 1분 동안은 fresh로 간주
  })

  if (isLoading) {
    return <p>로딩중...</p>
  }
  if (isError) {
    return <p>에러 발생: {error.message}</p>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">👨‍👩‍👧‍👦 우리 팀 프로필 👨‍👩‍👧‍👦</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {data.map((item, idx) => (
          <ProfileCard key={idx} {...item} />
        ))}
      </div>
    </div>
  )
}
