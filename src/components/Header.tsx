import styles from "./Header.module.css";

import tasksControlLogo from "../assets/rocket.svg"

export function Header() {
  return (
    <header className={styles.header}>
      <img src={tasksControlLogo}/>
      <span>to</span> <span>do</span>
    </header>
  )
}