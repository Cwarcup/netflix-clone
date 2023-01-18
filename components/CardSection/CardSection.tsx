import Link from "next/link"
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
          <Link href={`/videos/${video.id}`} key={video.id}>
            <Card {...video} size={size} />
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CardSection
