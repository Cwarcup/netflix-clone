export type CardSize = "small" | "medium" | "large"

export type CardType = {
  imgUrl: string
  id: string
  publishedAt: string
  title: string
  description: string
  shouldScale?: boolean
  statistics?: {
    viewCount: string
  }
}

export type GetVideoByIdType = {
  id: string
  title: string
  description: string
  channelTitle: string
  publishedAt: string
  statistics: {
    viewCount: string
  }
}

export interface YoutubeResponse {
  kind: string
  etag: string
  items: Item[]
  pageInfo: PageInfo
}

export interface Item {
  kind: string
  etag: string
  id: string
  snippet: Snippet
  contentDetails: ContentDetails
  statistics: Statistics
}

export interface ContentDetails {
  duration: string
  dimension: string
  definition: string
  caption: string
  licensedContent: boolean
  contentRating: ContentRating
  projection: string
}

export interface ContentRating {}

export interface Snippet {
  publishedAt: Date
  channelId: string
  title: string
  description: string
  thumbnails: Thumbnails
  channelTitle: string
  categoryId: string
  liveBroadcastContent: string
  localized: Localized
  defaultAudioLanguage: string
}

export interface Localized {
  title: string
  description: string
}

export interface Thumbnails {
  default: Default
  medium: Default
  high: Default
  standard: Default
}

export interface Default {
  url: string
  width: number
  height: number
}

export interface Statistics {
  viewCount: string
  likeCount: string
  favoriteCount: string
  commentCount: string
}

export interface PageInfo {
  totalResults: number
  resultsPerPage: number
}

export type videoStatsType = {
  id: number
  userId: string
  videoId: string
  favourited: boolean | null
  watched: boolean
}
