import { v4 as uuidv4 } from 'uuid';

import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react"
import { PlusCircle } from "phosphor-react"

import { Header } from "./components/Header"
import { ITask } from "./components/Task"
import { TasksList } from './components/TasksList';
import { EmptyMessage } from './components/EmptyMessage';

import "./global.css"

import styles from "./App.module.css"

const taskList: ITask[] = [
  { id: uuidv4(), task: "Fazer html", completed: false },
  { id: uuidv4(), task: "Fazer css", completed: false },
  { id: uuidv4(), task: "Fazer js", completed: false },
]

export default function App() {
  const [tasks, setTasks] = useState<ITask[]>(taskList)
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

    const newTask = { id: uuidv4(), task: newTaskText, completed: false }

    setTasks([...tasks, newTask])

    setNewTaskText("")
  }

  function handleCheckChange(id: string) {
    setTasks(tasks => tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }))
  }

  function deleteTask(taskToDeleteId: string) {
    const filteredTasks = tasks.filter((task) =>
      task.id !== taskToDeleteId
    )

    setTasks(filteredTasks)
  }

  const isTaskListEmpty = tasks.length == 0

  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <form onSubmit={handleCreateNewTask} className={styles.taskForm}>
          <textarea
            name="task"
            value={newTaskText}
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskInvalid}
            required
            placeholder="Adicione uma nova tarefa"
          />
          <div>
            <button type="submit">
              Criar
              <PlusCircle size={16} />
            </button>
          </div>
        </form>
        <div className={styles.taskList}>
          <div className={styles.taskListInfo}>
            <p>
              Tarefas criadas <span>0</span>
            </p>
            <p>
              Concluídas <span>0</span>
            </p>
          </div>
          {
            !isTaskListEmpty ?
              <TasksList tasks={tasks} onCheckChange={handleCheckChange} onDeleteTask={deleteTask} /> :
              <EmptyMessage />
          }
        </div>
      </main>
    </>
  )
}