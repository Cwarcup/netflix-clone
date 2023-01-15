import Card from "../Card/Card"
import styles from "./CardSection.module.css"
import type { CardType, CardSize } from "@/types"

type CardSectionProps = {
  title: string
  size: CardSize
  videos: CardType[]
}

const CardSection = (props: CardSectionProps) => {
  const { title, videos, size } = props

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video) => (
          <Card key={video.id} {...video} size={size} />
        ))}
      </div>
    </section>
  )
}

export default CardSection
