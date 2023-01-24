import { getWatchedVideos } from "@/lib/db/hasura"
import type {
  CardType,
  YoutubeResponse,
  Item,
  GetVideoByIdType,
  WatchedVideosListType,
} from "@/types"
import hardCodedVideos from "@/data/youtubeData.json"

// used to convert the date string to a more readable format
function convertDateString(dateString: Date): string {
  let date = new Date(dateString)
  let options = { year: "numeric", month: "long", day: "numeric" } as any
  return date.toLocaleDateString("en-US", options)
}

// function to fetch youtube videos from youtube api
const fetchVideos = async (url: string) => {
  const BASE_URL = "https://youtube.googleapis.com/youtube/v3/"
  const fetchUrl = `${BASE_URL}${url}&key=${process.env.YOUTUBE_API_KEY}`

  const response = await fetch(fetchUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })

  return (await response.json()) as YoutubeResponse
}

const getCommonVideos = async (url: string): Promise<CardType[]> => {
  try {
    // conditional to use the hard coded data when in development
    const isDev = process.env.DEVELOPMENT === "true"
    const data = isDev ? hardCodedVideos : await fetchVideos(url)

    // mutate the data to match the CardType interface
    const YoutubeMutatedData: CardType[] = data.items.map((item: any) => {
      const imgUrl =
        item.snippet.thumbnails?.maxres?.url ??
        item.snippet.thumbnails?.standard?.url ??
        item.snippet.thumbnails?.high.url ??
        item.snippet.thumbnails?.medium.url

      return {
        id: item.id.videoId || item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        imgUrl: imgUrl,
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
    const data = await fetchVideos(url)

    // mutate the data to match the CardType interface
    const YoutubeMutatedData: GetVideoByIdType[] = data.items.map(
      (item: Item) => {
        return {
          id: item.id,
          title: item.snippet.title,
          description: item.snippet.description.replace(/\n/g, "<br>"),
          channelTitle: item.snippet.channelTitle,
          publishedAt: convertDateString(item.snippet.publishedAt),
          statistics: {
            viewCount: item.statistics.viewCount || "0",
          },
        }
      }
    )

    return YoutubeMutatedData
  } catch (error) {
    console.log(error)

    return [
      {
        id: "0",
        title: "Something went wrong fetching Youtube videos",
        description: "Something went wrong fetching Youtube videos",
        channelTitle: "Something went wrong fetching Youtube videos",
        publishedAt: convertDateString(new Date()),
        statistics: {
          viewCount: "0",
        },
      },
    ]
  }
}

export const getWatchItAgainVideos = async (
  token: string,
  userId: string
): Promise<WatchedVideosListType[]> => {
  const videos = await getWatchedVideos(token, userId)

  const videosList = videos.map((video) => {
    return {
      id: video.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
    }
  })

  return videosList
}
