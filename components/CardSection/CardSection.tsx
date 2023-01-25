import Link from "next/link"
import Card from "../Card/Card"
import styles from "./CardSection.module.css"
import clsx from "classnames"
import type { CardType, CardSize } from "@/types"

type CardSectionProps = {
  title: string
  size: CardSize
  videos: CardType[]
  shouldWrap?: boolean
  shouldScale?: boolean
}

const CardSection = (props: CardSectionProps) => {
  const { title, videos, size, shouldScale, shouldWrap = false } = props

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={clsx(styles.cardWrapper, shouldWrap && styles.wrap)}>
        {videos.map((video) => (
          <Link href={`/video/${video.id}`} key={video.id}>
            <Card {...video} size={size} shouldScale={shouldScale} />
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CardSection
