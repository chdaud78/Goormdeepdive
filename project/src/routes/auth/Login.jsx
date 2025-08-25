import { auth } from '@/api/auth.js'
import {useState} from "react";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    const response = await auth.login({
      email: email,
      password: password,
    })
    console.log(response)
  }

  return (
    <div>
      <div>
        <label htmlFor="">이메일</label>
        <input onChange={(e) => setEmail(e.target.value)} type="text"/>
      </div>
      <div>
        <label htmlFor="">비밀번호</label>
        <input onChange={(e) => setPassword(e.target.value)} type="password"/>
      </div>
      <button type="button" onClick={handleLogin}>
        로그인
      </button>
    </div>
  )
}
