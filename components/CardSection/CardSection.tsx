import Card from "../Card/Card"
import styles from "./CardSection.module.css"
import type { CardType, CardSize } from "@/types"

type CardSectionProps = {
  title: string
  size: CardSize
  cards: CardType[]
}

const CardSection = (props: CardSectionProps) => {
  const { title, cards, size } = props

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {cards.map((card) => (
          <Card key={card.id} {...card} size={size} />
        ))}
      </div>
    </section>
  )
}

export default CardSection
