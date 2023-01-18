import { useRouter } from "next/router"
import { useState } from "react"
import Modal from "react-modal"
import clsx from "classnames"

import styles from "@/styles/VideoModal.module.css"

// to bind modal to your appElement
Modal.setAppElement("#__next")

type Props = {}

const VideoForId = (props: Props) => {
  const router = useRouter()
  const { videoId } = router.query // unique id for each video
  const [videoIsPlaying, setVideoIsPlaying] = useState(false)

  const handleModalClose = () => {
    router.back()
  }

  const handleVideoPlayPause = () => {
    const player = document.getElementById("youtube-player")
    // remove the gradient
    const gradient = document.getElementById("video-gradient")
    gradient?.classList.add(styles.videoGradientHide)

    if (player) {
      if (videoIsPlaying) {
        player.setAttribute(
          "src",
          `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=0&rel=1&showinfo=0`
        )
      } else {
        player.setAttribute(
          "src",
          `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&rel=1&`
        )
      }
    }

    setVideoIsPlaying(!videoIsPlaying)
  }

  const testVideo = {
    title: "test title",
    publishTime: "test publish time",
    description: "test description",
    channelTitle: "test channel title",
    statistics: {
      viewCount: 1000,
      likeCount: 100,
    },
  }

  const { title, publishTime, description, channelTitle, statistics } =
    testVideo

  return (
    <>
      <div>hello video page: {videoId}</div>
      <Modal
        isOpen={true}
        contentLabel="Watch Video"
        shouldCloseOnEsc={true}
        onRequestClose={handleModalClose}
        overlayClassName={styles.overlay}
        className={styles.modal}
      >
        <div className={styles.videoPlayerContainer}>
          <iframe
            id="youtube-player"
            className={styles.videoPlayer}
            width="100%"
            height="360"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1&showinfo=0`}
          ></iframe>
          <div
            id="video-gradient"
            className={styles.videoGradient}
            onClick={handleVideoPlayPause}
          ></div>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.titleText}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Genes: </span>
                <span className={styles.channelTitle}>test genes</span>
              </p>

              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>
                  {statistics.viewCount}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default VideoForId
