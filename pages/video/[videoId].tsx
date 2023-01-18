import { useRouter } from "next/router"
import { useState } from "react"
import Modal from "react-modal"

import styles from "@/styles/VideoModal.module.css"

// to bind modal to your appElement
Modal.setAppElement("#__next")

type Props = {}

const VideoForId = (props: Props) => {
  const [videoIsPlaying, setVideoIsPlaying] = useState(false)

  const router = useRouter()

  const { videoId } = router.query // unique id for each video

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
            // onclick, play the video
            onClick={handleVideoPlayPause}
          ></div>
          {/* div to add gray gradient from the bottom of the video up */}
        </div>
      </Modal>
    </>
  )
}

export default VideoForId
