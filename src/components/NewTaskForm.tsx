import { v4 as uuidv4 } from 'uuid';

import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { PlusCircle } from 'phosphor-react';

import { ITask } from "./Task";

import styles from "./NewTaskForm.module.css"

interface NewTaskFormProps {
  onNewTask: (newTask: ITask) => void
}

export function NewTaskForm({ onNewTask }: NewTaskFormProps) {
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

    onNewTask(newTask)

    setNewTaskText("")
  }

  return (
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
  )
}