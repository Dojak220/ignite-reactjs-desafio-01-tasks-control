import { v4 as uuidv4 } from 'uuid';

import { useState } from "react"

import { ITask } from "./components/Task"

import { Header } from "./components/Header"
import { NewTaskForm } from './components/NewTaskForm';
import { TasksList } from './components/TasksList';

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

  function handleTasksChanged(newTasks: ITask[]) {
    setTasks(newTasks)
  }

  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <NewTaskForm onNewTask={handleNewTask} />
        <TasksList tasks={[...tasks]} onTasksChange={handleTasksChanged} />
      </main>
    </>
  )
}