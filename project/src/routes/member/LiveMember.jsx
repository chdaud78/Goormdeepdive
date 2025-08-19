import { useState } from 'react'

import { Card, CardContent } from '@/components/ui/card.jsx'

export default function LiveMember() {
  const emojiStatus = [
    { val: '❤️', id: 'emoji1' },
    { val: '👑', id: 'emoji2' },
    { val: '🥕', id: 'emoji3' },
    { val: '🔥', id: 'emoji4' },
    { val: '✈️', id: 'emoji5' },
    { val: '💼', id: 'emoji6' },
  ]

  const [name, setName] = useState('')
  const [job, setJob] = useState('')
  const [emoji, setEmoji] = useState('')

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-4">라이브 프로필 배지 에디터</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent>
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-1 font-medium">
                이름
              </label>
              <input
                id="name"
                placeholder="이름을 입력하세요"
                className="border border-gray-300 rounded px-3 py-2"
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </div>
            <div className="flex flex-col mt-5">
              <label htmlFor="job" className="mb-1 font-medium">
                직무
              </label>
              <select
                className="border border-gray-300 rounded px-3 py-2"
                onChange={(e) => setJob(e.target.value)}
                name="job"
                id="job"
              >
                <option value="">직업을 선택하세요</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="AI">AI</option>
                <option value="Designer">Designer</option>
              </select>
            </div>
            <div className="flex flex-col mt-5">
              <p className="mb-1 font-medium">이모지</p>
              <div className="flex gap-3">
                {emojiStatus.map((item, idx) => (
                  <div key={idx}>
                    <input
                      name="emoji"
                      id={item.id}
                      value={item.val}
                      onChange={(e) => setEmoji(e.target.value)}
                      type="radio"
                      className="hidden peer"
                    />
                    <label
                      className="text-2xl border-1 rounded-sm p-2 block cursor-pointer peer-checked:bg-blue-200"
                      htmlFor={item.id}
                    >
                      {item.val}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="flex items-center justify-center">
          <CardContent className="flex gap-3">
            <div className="text-4xl">{emoji}</div>
            <div className="text-center flex flex-col items-center">
              <p className="text-lg font-semibold">{name || '이름 없음'}</p>
              <p className="text-gray-500">{job || '직무 없음'}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
