import { auth } from '@/api/auth.js'

export default function Login() {
  const handleLogin = async () => {
    const response = await auth.login({
      email: 'a@a.com',
      password: '123456',
    })
    console.log(response)
  }

  return (
    <div>
      <button type="button" onClick={handleLogin}>
        로그인
      </button>
    </div>
  )
}
