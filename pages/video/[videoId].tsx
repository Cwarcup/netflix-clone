import { useRouter } from "next/router"

type Props = {}

const VideoForId = (props: Props) => {
  const router = useRouter()

  const { videoId } = router.query // unique id for each video
  return <div>hello video page: {videoId}</div>
}

export default VideoForId
