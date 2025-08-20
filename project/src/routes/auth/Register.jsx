import { useState } from 'react'

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  })
  const [errors, setErrors] = useState({})

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) {
      e.name = '이름을 입력하세요.'
    }
    if (!/^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(form.email)) {
      e.email = '이메일 형식이 올바르지 않습니다.'
    }
    if (!form.password) {
      e.password = '비밀번호를 입력하세요.'
    }
    if (form.password !== form.confirm) {
      e.confirm = '비밀번호가 일치하지 않습니다.'
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validate()) {
      return
    }
    console.log(form)
    alert('회원가입 성공')
  }

  return (
    <div>
      <h2>회원 가입</h2>
      <form action="" onSubmit={onSubmit}>
        <div>
          <label htmlFor="">이름</label>
          <input name="name" value={form.name} onChange={onChange} type="text" />
          {errors.name ? <p>{errors.name}</p> : ''}
        </div>
        <div>
          <label htmlFor="">이메일</label>
          <input name="email" value={form.email} onChange={onChange} type="text" />
          {errors.email ? <p>{errors.email}</p> : ''}
        </div>
        <div>
          <label htmlFor="">비밀번호</label>
          <input name="password" value={form.password} onChange={onChange} type="password" />
          {errors.password ? <p>{errors.password}</p> : ''}
        </div>
        <div>
          <label htmlFor="">비밀번호 확인</label>
          <input name="confirm" value={form.confirm} onChange={onChange} type="password" />
          {errors.confirm ? <p>{errors.confirm}</p> : ''}
        </div>
        <button>회원 가입</button>
      </form>
    </div>
  )
}
