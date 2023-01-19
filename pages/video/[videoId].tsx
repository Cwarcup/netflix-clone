import { useRouter } from "next/router"
import { useState } from "react"
import Modal from "react-modal"
import clsx from "classnames"
import Navbar from "@/components/Navbar/Navbar"
import { getYoutubeVideoById } from "@/lib/getYoutubeVideos"

import styles from "@/styles/VideoModal.module.css"

// to bind modal to your appElement
Modal.setAppElement("#__next")

type Props = {
  video: {
    title: string
    publishedAt: string
    description: string
    channelTitle: string
    statistics: {
      viewCount: number
    }
  }
}

const VideoForId = ({ video }: Props) => {
  const router = useRouter()
  const { videoId } = router.query // unique id for each video
  const [videoIsPlaying, setVideoIsPlaying] = useState(false)

  const { title, publishedAt, description, channelTitle, statistics } = video

  const handleModalClose = () => {
    router.back()
  }

  const handleVideoPlayPause = () => {
    const player = document.getElementById("youtube-player")
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
      <Navbar />
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
              <p className={styles.titleText}>{title}</p>
              <p
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
            <div className={styles.col2}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>By: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Released: </span>
                <span className={styles.channelTitle}>{publishedAt}</span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>
                  {statistics.viewCount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export async function getStaticProps(context: any) {
  // get the videoId from the context
  const videoId: string = context.params.videoId

  // get the video from the youtube api
  const videoArray = await getYoutubeVideoById(videoId)

  // and revalidate every 10 seconds.
  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  // list to pre-render
  const listOfVideos = ["oBrkbWSB3Ls", "Znsa4Deavgg", "NthGfn_ddRQ"]

  // Get the paths we want to pre-render based on posts
  const paths = listOfVideos.map((id) => ({
    params: { videoId: id },
  }))

  return { paths, fallback: "blocking" }
}

export default VideoForId
