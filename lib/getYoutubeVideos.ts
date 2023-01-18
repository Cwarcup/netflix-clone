import type { CardType, YoutubeResponse, Item, GetVideoByIdType } from "@/types"

// function to fetch youtube videos from youtube api
// accepts a search term as a parameter
// used in index.tsx on server side rendering

const getCommonVideos = async (url: string): Promise<CardType[]> => {
  try {
    const BASE_URL = "https://youtube.googleapis.com/youtube/v3/"
    const fetchUrl = `${BASE_URL}${url}&key=${process.env.YOUTUBE_API_KEY}`

    const response = await fetch(fetchUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })

    const data = (await response.json()) as YoutubeResponse

    // mutate the data to match the CardType interface
    const YoutubeMutatedData: CardType[] = data.items.map((item: any) => {
      return {
        id: item.id.videoId || item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        imgUrl: item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt,
      } as CardType
    })

    return YoutubeMutatedData
  } catch (error) {
    console.log(error)

    return [
      {
        id: "0",
        title: "Something went wrong fetching Youtube videos",
        description: "Something went wrong fetching Youtube videos",
        imgUrl: "https://i.imgur.com/0Z0Z0Z0.png",
        publishedAt: new Date().toISOString(),
      } as CardType,
    ]
  }
}

export const getVideos = async (searchQuery: string): Promise<CardType[]> => {
  const url = `search?q=${searchQuery}&part=snippet&maxResults=10&type=video&videoEmbeddable=true`
  return getCommonVideos(url)
}

export const getPopularVideos = async (): Promise<CardType[]> => {
  const url = `videos?part=snippet&chart=mostPopular&maxResults=10&regionCode=US`
  return getCommonVideos(url)
}

export const getYoutubeVideoById = async (
  videoId: string
): Promise<GetVideoByIdType[]> => {
  const url = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`

  try {
    const BASE_URL = "https://youtube.googleapis.com/youtube/v3/"
    const fetchUrl = `${BASE_URL}${url}&key=${process.env.YOUTUBE_API_KEY}`

    const response = await fetch(fetchUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })

    const data = (await response.json()) as YoutubeResponse

    // mutate the data to match the CardType interface
    const YoutubeMutatedData: GetVideoByIdType[] = data.items.map(
      (item: Item) => {
        return {
          id: item.id,
          title: item.snippet.title,
          description: item.snippet.description,
          channelTitle: item.snippet.channelTitle,
          publishedAt: item.snippet.publishedAt,
          statistics: {
            viewCount: item.statistics.viewCount,
          },
        }
      }
    )
    console.log(YoutubeMutatedData)
    return YoutubeMutatedData
  } catch (error) {
    console.log(error)

    return [
      {
        id: "0",
        title: "Something went wrong fetching Youtube videos",
        description: "Something went wrong fetching Youtube videos",
        channelTitle: "Something went wrong fetching Youtube videos",
        publishedAt: new Date(),
        statistics: {
          viewCount: "0",
        },
      },
    ]
  }
}
