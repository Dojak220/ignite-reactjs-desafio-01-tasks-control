import { Trash } from "phosphor-react"

import styles from "./Task.module.css"

export interface ITask {
  id: string,
  task: string,
  completed: boolean
}

interface TaskProps {
  task: ITask,
  onToggleChecked: (id: string) => void,
  onDeleteTask: (id: string) => void
}

export function Task({task, onToggleChecked, onDeleteTask}: TaskProps) {

  function handleDeleteTask() {
    onDeleteTask(task.id);
  }

  return (
    <li className={styles.task}>
      <input type="checkbox" checked={task.completed} onChange={() => onToggleChecked(task.id)}/>
      <p>{task.task}</p>
      <button onClick={handleDeleteTask} title="Deletar tarefa">
        <Trash size={24}/>
      </button>
    </li>
  )
}