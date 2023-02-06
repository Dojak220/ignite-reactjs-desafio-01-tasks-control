import { ITask, Task } from "./Task"

import styles from "./TasksList.module.css"

interface TasksListProps {
  tasks: ITask[],
  onCheckChange: (id: string) => void
  onDeleteTask: (id: string) => void
}

export function TasksList({tasks, onCheckChange, onDeleteTask}: TasksListProps) {
  function handleCheckChange(id: string) {
    onCheckChange(id)
  }

  function deleteTask(id: string) {
    onDeleteTask(id)
  }

  return (
    <div className={styles.taskItems}>
      {tasks.map(task => <Task key={task.id} task={task} onToggleChecked={() => handleCheckChange(task.id)} onDeleteTask={() => deleteTask(task.id)}/>)}
    </div>
  )
}