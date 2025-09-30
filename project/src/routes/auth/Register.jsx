import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { auth } from '@/api/auth.js'
import { Card, CardContent, CardHeader } from '@/components/ui/card.jsx'
import { ROUTES } from '@/lib/routes.js'

const RegisterSchema = z
  .object({
    email: z.string().trim().toLowerCase().email('올바른 이메일 형식이 아닙니다.'),
    name: z
      .string()
      .trim()
      .min(2, '이름은 2자 이상 입력해주세요.')
      .max(30, '이름은 30자 이하로 입력해 주세요.'),
    password: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .regex(/[A-Za-z]/, '영문자를 포함해주세요.')
      .regex(/\d/, '숫자를 포함해 주세요.'),
    confirm: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .regex(/[A-Za-z]/, '영문자를 포함해주세요.')
      .regex(/\d/, '숫자를 포함해 주세요.'),
  })
  .refine((data) => data.password === data.confirm, {
    path: ['confirm'],
    message: '비밀번호가 일치하지 않습니다.',
  })

export default function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  })
  const [errors, setErrors] = useState({})

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  /*  const validate = () => {
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
    if (form.password !== form.confirm || !form.confirm) {
      e.confirm = '비밀번호가 일치하지 않습니다.'
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }*/
  const [pending, setPending] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    const parsed = RegisterSchema.safeParse(form)
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors
      setErrors({
        email: fieldErrors.email?.[0],
        name: fieldErrors.name?.[0],
        password: fieldErrors.password?.[0],
        confirm: fieldErrors.confirm?.[0],
      })

      return
    }

    try {
      setPending(true)
      await auth.register(parsed.data)
      navigate('/login', { replace: true })
    } catch (err) {
      console.error(err)
      if (err.status === 409) alert('이미 존재하는 이메일입니다.')
      setErrors({ _form: err?.message || '회원가입에 실패했어요. 다시 시도해주세요' })
    } finally {
      setPending(false)
    }
  }

  return (
    <div>
      <Card className="w-100 flex-1">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center mb-4">회원 가입</h2>
        </CardHeader>
        <CardContent className="flex flex-col">
          <form action="" onSubmit={onSubmit}>
            <div className="flex flex-col mb-4">
              <label htmlFor="">이름</label>
              <input
                className="border border-gray-300 rounded px-3 py-2"
                name="name"
                value={form.name}
                onChange={onChange}
                type="text"
              />
              {errors.name ? <p className="text-sm text-red-500">{errors.name}</p> : ''}
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="">이메일</label>
              <input
                className="border border-gray-300 rounded px-3 py-2"
                name="email"
                value={form.email}
                onChange={onChange}
                type="text"
              />
              {errors.email ? <p className="text-sm text-red-500">{errors.email}</p> : ''}
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="">비밀번호</label>
              <input
                className="border border-gray-300 rounded px-3 py-2"
                name="password"
                value={form.password}
                onChange={onChange}
                type="password"
              />
              {errors.password ? <p className="text-sm text-red-500">{errors.password}</p> : ''}
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="">비밀번호 확인</label>
              <input
                className="border border-gray-300 rounded px-3 py-2"
                name="confirm"
                value={form.confirm}
                onChange={onChange}
                type="password"
              />
              {errors.confirm ? <p className="text-sm text-red-500">{errors.confirm}</p> : ''}
            </div>
            <button
              disabled={pending}
              className="w-full flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition"
            >
              {pending ? '가입 처리 중' : '회원 가입'}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
