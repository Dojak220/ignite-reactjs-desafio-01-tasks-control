import { ClipboardText } from "phosphor-react";

import styles from "./EmptyMessage.module.css"

export function EmptyMessage() {
  return (
    <div className={styles.emptyList}>
      <ClipboardText size={56} />
      <p>
        <strong>Você ainda não tem tarefas cadastradas</strong>
        <br />
        Crie tarefas e organize seus itens a fazer
      </p>
      <p>
      </p>
    </div>
  )
}