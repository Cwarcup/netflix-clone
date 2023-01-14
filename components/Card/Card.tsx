import Image from "next/image"
import { useState } from "react"
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
  const { imgURL, size = "medium", id, shouldScale } = props

  const [imgSrc, setImgSrc] = useState(imgURL)

  const handleOnError = () => {
    console.log("Error loading image")
    setImgSrc(
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80"
    )
  }
  return (
    <div className={styles.container}>
      <div className={imgSizes[size]}>
        <Image
          src={imgURL}
          alt="Picture of the author"
          fill
          className={styles.cardImg}
          onError={handleOnError}
        />
      </div>
    </div>
  )
}

export default Card
