import YoutubeDataArr from "@/data/youtubeData.json"
import type { CardType } from "@/types"

const mutateYoutubeRes = (data: any) => {
  const YoutubeMutatedData: CardType[] = data.items.map((item: any) => {
    return {
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      imgUrl: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt,
    }
  })

  return YoutubeMutatedData
}

export default mutateYoutubeRes
