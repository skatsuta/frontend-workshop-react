import { FormEvent, useState } from "react"
import './App.css'

type Task = {
  id: string
  title: string
  completed: boolean
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    const task: Task = {
      id: crypto.randomUUID(),
      title: input,
      completed: false,
    }

    setTasks([...tasks, task])
    setInput('')
  }

  function handleCheckboxChange(task: Task): void {
    setTasks(tasks.map(t => {
      return t.id === task.id ? {
        ...t,
        completed: !t.completed,
      } : t
    }))
  }

  return (
    <>
      <h1>Sample Todo App</h1>
      {
        tasks.length > 0 ? 
        <>
          <h2>My tasks</h2>
          <ul>
            {tasks.map(task => (
              <>
                <li key={task.id}>
                  <input type="checkbox" checked={task.completed}
                    onChange={() => handleCheckboxChange(task)} />
                  {task.completed ? <s>{task.title}</s> : task.title}
                </li>
              </>
            ))}
          </ul>
        </> :
        <p>Add a task.</p>
      }

      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={event => setInput(event.target.value)} />
        <button type="submit">Add</button>
      </form>
    </>
  )
}

export default App
