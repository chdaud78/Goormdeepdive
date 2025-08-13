import { useState } from "react"

const Todo = () => {
  const [tasks, setTask] = useState([])
  const [input, setInput] = useState("")

  const addTodo = () => {
    if (input.trim() === "") {
      return
    }
    setTask([...tasks, { id: Date.now(), text: input, done: false }])
    setInput("")
  }

  const delTodo = (id) => {
    setTask(tasks.filter((task) => task.id !== id))
  }
  const toggleTask = (id) => {
    setTask(tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)))
  }

  return (
    <div className="container">
      <h1>To-Do List</h1>

      <div className="input-group">
        <input
          placeholder="할 일을 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          type="text"
        />
        <button onClick={addTodo}>추가</button>
      </div>
      <ul>
        {tasks.length === 0 && <p>할 일이 없습니다.</p>}
        {tasks.map((task) => (
          <li key={task.id} className={task.done ? "done" : ""}>
            <span onClick={() => toggleTask(task.id)}>{task.text}</span>
            <button onClick={() => delTodo(task.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todo
