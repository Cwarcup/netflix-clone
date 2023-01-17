import styles from "./Loading.module.css"

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <p className={styles.loader}>Loading...</p>
    </div>
  )
}

export default Loading
