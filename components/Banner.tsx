import Image from "next/image"

import styles from "./Banner.module.css"

type BannerProps = {
  title: string
  subTitle: string
  imgUrl: string
}

export default function Banner(props: BannerProps) {
  const { title, subTitle, imgUrl } = props

  const handleOnPlay = () => {
    console.log("Play")
  }
  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <div className={styles.nseriesWrapper}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.subTitle}>{subTitle}</h3>

          <div className={styles.playBtnWrapper}>
            <button className={styles.btnWithIcon} onClick={handleOnPlay}>
              <Image
                src="/static/play_arrow.svg"
                alt="Play icon"
                width={32}
                height={32}
              />
              <span className={styles.playText}>Play</span>
            </button>
            <button className={styles.moreInfoBtn}>
              <Image
                src="/static/fill.svg"
                alt="Info icon"
                width={28}
                height={28}
              />
              <span className={styles.moreInfoText}>More Info</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={styles.bannerImg}
        style={{
          backgroundImage: `url(${imgUrl}`,
        }}
      ></div>
    </div>
  )
}
