import { useRouter } from "next/router"
import { RiPlayFill, RiInformationLine } from "react-icons/ri"

import styles from "./Banner.module.css"

type BannerProps = {
  title: string
  subTitle: string
  imgUrl: string
  videoId: string
}

export default function Banner(props: BannerProps) {
  const { title, subTitle, imgUrl, videoId } = props

  const router = useRouter()

  const handleOnPlay = () => {
    console.log("play")
    router.push(`/video/${videoId}`)
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
              <RiPlayFill size={32} color="black" title="Play" />
              <span className={styles.playText}>Play</span>
            </button>
            <button className={styles.moreInfoBtn}>
              <RiInformationLine size={28} color="white" title="More Info" />
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
      <div id="video-gradient" className={styles.videoGradient}></div>
    </div>
  )
}
