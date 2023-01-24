import { jwtVerify } from "jose"

export const verifyToken = async (
  token: string | null
): Promise<string | null> => {
  if (!token) {
    return null
  }

  const userId = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.HASURA_GRAPHQL_JWT_SECRET as string)
  )

  return userId.payload.issuer as string
}
