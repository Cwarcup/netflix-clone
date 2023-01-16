import type { CardType } from "@/types"

// function to fetch youtube videos from youtube api
// accepts a search term as a parameter
// used in index.tsx on server side rendering
const getYoutubeVideos = async (searchQuery: string): Promise<CardType[]> => {
  const url = `https://youtube.googleapis.com/youtube/v3/search?q=${searchQuery}&key=${process.env.YOUTUBE_API_KEY}&part=snippet&maxResults=10&type=video&videoEmbeddable=true`
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })

  const data = await response.json()

  // mutate the data to match the CardType interface
  const YoutubeMutatedData: CardType[] = data.items.map((item: any) => {
    return {
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      imgUrl: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt,
    } as CardType
  })

  return YoutubeMutatedData
}

export default getYoutubeVideos
