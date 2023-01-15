import Image from "next/image"
import { useState } from "react"
import styles from "./Card.module.css"
import clx from "classnames"
import { motion } from "framer-motion"
import type { CardSize } from "@/types"

const imgSizes = {
  large: styles.lgItem,
  medium: styles.mdItem,
  small: styles.smItem,
}

type CardProps = {
  imgURL: string
  id: string
  shouldScale: boolean
  size: CardSize
}

const Card = (props: CardProps) => {
  const { imgURL, size = "medium", id, shouldScale = true } = props

  const [imgSrc, setImgSrc] = useState(imgURL)

  const handleOnError = () => {
    console.log("Error loading image")
    setImgSrc(
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80"
    )
  }

  const scale = parseInt(id) === 0 ? { scaleY: 1.1 } : { scale: 1.1 }

  const shouldHover = shouldScale && {
    whileHover: { ...scale },
  }

  return (
    <div className={styles.container}>
      <motion.div
        whileHover={{ scale: 1.2 }}
        className={clx(styles.imgMotionWrapper, imgSizes[size])}
        {...shouldHover}
      >
        <Image
          src={imgURL}
          alt="Picture of the author"
          fill
          className={styles.cardImg}
          onError={handleOnError}
        />
      </motion.div>
    </div>
  )
}

export default Card
