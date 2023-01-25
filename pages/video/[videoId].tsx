import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { GetServerSideProps } from "next"
import Modal from "react-modal"
import clsx from "classnames"
import Navbar from "@/components/Navbar/Navbar"
import { getYoutubeVideoById } from "@/lib/getYoutubeVideos"
import DislikeIcon from "@/components/icons/DislikeIcon"
import LikeIcon from "@/components/icons/LikeIcon"

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
  const [toggleLike, setToggleLike] = useState(false)
  const [toggleDislike, setToggleDislike] = useState(false)
  const { title, publishedAt, description, channelTitle, statistics } = video

  const handleModalClose = () => {
    router.back()
  }

  const runRatingService = async (favourited: boolean) => {
    return await fetch("/api/stats", {
      method: "POST",
      body: JSON.stringify({
        videoId,
        favourited,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
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

  const handleLikeBtnClick = async () => {
    setToggleLike(true)
    setToggleDislike(false)
    await runRatingService(true)
  }

  const handleDislikeBtnClick = async () => {
    setToggleDislike(true)
    setToggleLike(false)
    runRatingService(false)
  }

  // use the videoId to query the database to see if the video has been liked or disliked
  useEffect(() => {
    const handleLikeDislikeService = async () => {
      const response = await fetch(`/api/stats?videoId=${videoId}`, {
        method: "GET",
      })
      const videoData = await response.json()

      if (videoData.data.length > 0) {
        if (videoData.data[0].favourited === true) {
          setToggleLike(true)
        } else {
          setToggleDislike(true)
        }
      }
    }
    handleLikeDislikeService()
  }, [videoId])

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
          <div className={styles.likeDislikeBtnWrapper}>
            <div className={styles.likeBtnWrapper}>
              <button
                className={styles.btnWrapper}
                onClick={handleLikeBtnClick}
              >
                <LikeIcon selected={toggleLike} />
              </button>
            </div>
            <button
              className={styles.btnWrapper}
              onClick={handleDislikeBtnClick}
            >
              <DislikeIcon selected={toggleDislike} />
            </button>
          </div>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get the videoId from the context
  const videoId = context?.params?.videoId as string

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
  const listOfVideos = ["2gTC4uWP3_Y", "GXrDYboUnnw", "Md1AK72ihM4"]

  // Get the paths we want to pre-render based on posts
  const paths = listOfVideos.map((id) => ({
    params: { videoId: id },
  }))

  return { paths, fallback: "blocking" }
}

export default VideoForId
