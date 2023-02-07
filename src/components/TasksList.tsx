import { useState } from "react";
import { EmptyMessage } from "./EmptyMessage";
import { ITask, Task } from "./Task"

import styles from "./TasksList.module.css"

interface TasksListProps {
  tasks: ITask[],
  onTasksChange: (tasks: ITask[]) => void;
}

export function TasksList({ tasks, onTasksChange }: TasksListProps) {
  const completedTasksInitialCount = tasks.filter((task => task.completed)).length
  const [completedTasksCount, setCompletedTasksCount] = useState(completedTasksInitialCount)

  function handleCheckChange(id: string) {
    const tasksWithCheckChanged = tasks.map(task => {
      if (task.id === id) {
        handleCompletedTasksCountChange(task.completed);

        return { ...task, completed: !task.completed };
      }
      return task;
    })

    onTasksChange(tasksWithCheckChanged)
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

    onTasksChange(filteredTasks)
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