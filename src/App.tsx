import { v4 as uuidv4 } from 'uuid';

import { useState } from "react"

import { ITask } from "./components/Task"

import { Header } from "./components/Header"
import { NewTaskForm } from './components/NewTaskForm';
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

  function handleNewTask(newTask: ITask) {
    setTasks((tasks) => [...tasks, newTask])
  }

  const isTaskListEmpty = tasks.length == 0
  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <NewTaskForm onNewTask={handleNewTask} />
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
              <TasksList state={[tasks, setTasks]} /> :
              <EmptyMessage />
          }
        </div>
      </main>
    </>
  )
}