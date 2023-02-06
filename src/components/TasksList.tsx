import { useState } from "react";
import { EmptyMessage } from "./EmptyMessage";
import { ITask, Task } from "./Task"

import styles from "./TasksList.module.css"

interface TasksListProps {
  state: [ITask[], React.Dispatch<React.SetStateAction<ITask[]>>],
}

export function TasksList({ state }: TasksListProps) {
  const [tasks, setTasks] = state
  const [completedTasksCount, setCompletedTasksCount] = useState(tasks.filter((task => task.completed)).length)

  function handleCheckChange(id: string) {
    const tasksWithCheckChanged = tasks.map(task => {
      if (task.id === id) {
        handleCompletedTasksCountChange(task.completed);

        return { ...task, completed: !task.completed };
      }
      return task;
    })

    setTasks(tasksWithCheckChanged)
  }

  function deleteTask(id: string) {
    const filteredTasks = tasks.filter(
      (task) => {
        if (task.id === id && task.completed) {
          handleCompletedTasksCountChange(task.completed);
        }

        return task.id !== id
      }
    )

    setTasks(filteredTasks)
  }


  function handleCompletedTasksCountChange(completed: boolean) {
    completed ?
      setCompletedTasksCount(completedTasksCount - 1) :
      setCompletedTasksCount(completedTasksCount + 1)
  }

  const isTaskListEmpty = tasks.length == 0

  return (
    <div className={styles.taskList}>
      <div className={styles.taskListInfo}>
        <p className={styles.createdTasksInfo}>
          Tarefas criadas <span>{tasks.length}</span>
        </p>
        <p className={styles.finishedTasksInfo}>
          Concluídas <span>{isTaskListEmpty ? 0 : `${completedTasksCount} de ${tasks.length}`}</span>
        </p>
      </div>
      {
        !isTaskListEmpty ?
          <div className={styles.taskItems}>
            {tasks.map(task => <Task key={task.id} task={task} onToggleChecked={() => handleCheckChange(task.id)} onDeleteTask={() => deleteTask(task.id)} />)}
          </div> :
          <EmptyMessage />
      }
    </div>
  )
}