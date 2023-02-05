import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react"
import { PlusCircle } from "phosphor-react"
import { Header } from "./components/Header"

import "./global.css"

import styles from "./App.module.css"

export default function App() {
  const [tasks, setTasks] = useState(["Tarefa 1"])
  const [newTaskText, setNewTaskText] = useState("")

  function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("")
    setNewTaskText(event.target.value)
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Preencha este campo!!")
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    setTasks([...tasks, newTaskText])

    setNewTaskText("")
  }

  return (
    <>
      <Header />
      <main>
        <form onSubmit={handleCreateNewTask}  className={styles.taskForm}>
          <textarea
            name="task"
            value={newTaskText}
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskInvalid}
            required
            placeholder="Adicione uma nova tarefa"
          />
          <div className={styles.createButton}>
            <button type="submit">
              Criar
              <PlusCircle size={16} />
            </button>
          </div>
        </form>
        <div>
          Tarefas criadas <span>0</span>
        </div>
        <div>
          Concluídas <span>0</span>
        </div>
      </main>
      <footer>
        <div>
          Você ainda não tem tarefas cadastradas
        </div>
        <div>
          Crie tarefas e organize seus itens a fazer
        </div>
      </footer>
    </>
  )
}