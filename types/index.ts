export type CardSize = "small" | "medium" | "large"

export type CardType = {
  imgUrl: string
  id: string
  publishedAt: string
  title: string
  description: string
  shouldScale?: boolean
}
