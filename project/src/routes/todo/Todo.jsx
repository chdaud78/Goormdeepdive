import { useState } from 'react'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card.jsx'

const Todo = () => {
  const [tasks, setTask] = useState([])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (input.trim() === '') {
      return
    }
    setTask([...tasks, { id: Date.now(), text: input, done: false }])
    setInput('')
  }

  const delTodo = (id) => {
    setTask(tasks.filter((task) => task.id !== id))
  }
  const toggleTask = (id) => {
    setTask(tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)))
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-md rounded-2xl">
      <CardHeader>
        <h1 className="text-xl font-bold text-center">📝 To-Do List</h1>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-center gap-2">
          <input
            className="flex-1 border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="할 일을 입력하세요"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            type="text"
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={addTodo}
          >
            추가
          </button>
        </div>
      </CardContent>

      <CardFooter>
        <ul className="w-full space-y-2">
          {tasks.length === 0 && <p className="text-gray-500 text-center">할 일이 없습니다.</p>}
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <span
                onClick={() => toggleTask(task.id)}
                className={`cursor-pointer ${
                  task.done ? 'line-through text-gray-400' : 'text-gray-800'
                }`}
              >
                {task.text}
              </span>
              <button
                onClick={() => delTodo(task.id)}
                className="text-red-500 hover:text-red-700 text-sm transition"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </CardFooter>
    </Card>
  )
}

export default Todo
