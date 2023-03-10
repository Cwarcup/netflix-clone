import { Magic } from "magic-sdk"

// used for client-side Magic instance to verify user
const createMagicClient = (): Magic | null => {
  return typeof window !== "undefined"
    ? new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY as string)
    : null
}

export const magicClient = createMagicClient()
