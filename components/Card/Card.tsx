import Image from "next/image"
import styles from "./Card.module.css"

// card should have 3 sizes: small, medium, large
// onHover, should increase the size of the card

type CardSize = "small" | "medium" | "large"

type CardProps = {
  imgURL: string
  size: CardSize
  id: string
  shouldScale: boolean
}

const imgSizes = {
  large: styles.lgItem,
  medium: styles.mdItem,
  small: styles.smItem,
}

const Card = (props: CardProps) => {
  const { imgURL, size, id, shouldScale } = props

  return (
    <div className={styles.container}>
      <div className={imgSizes[size]}>
        <Image
          src={imgURL}
          alt="Picture of the author"
          fill
          className={styles.cardImg}
        />
      </div>
    </div>
  )
}

export default Card
