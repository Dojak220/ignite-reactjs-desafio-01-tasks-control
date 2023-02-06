import { ITask, Task } from "./Task"

import styles from "./TasksList.module.css"

interface TasksListProps {
  state: [ITask[], React.Dispatch<React.SetStateAction<ITask[]>>],
}

export function TasksList({state}: TasksListProps) {
  const [tasks, setTasks] = state

  function handleCheckChange(id: string) {
    setTasks(tasks => tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }))
  }

  function deleteTask(id: string) {
    const filteredTasks = tasks.filter((task) =>
      task.id !== id
    )

    setTasks(filteredTasks)
  }

  return (
    <div className={styles.taskItems}>
      {tasks.map(task => <Task key={task.id} task={task} onToggleChecked={() => handleCheckChange(task.id)} onDeleteTask={() => deleteTask(task.id)}/>)}
    </div>
  )
}