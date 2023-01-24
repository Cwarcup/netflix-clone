import { jwtVerify } from "jose"

export const verifyToken = async (token: string): Promise<string> => {
  const decoded = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.HASURA_GRAPHQL_JWT_SECRET as string)
  )
  return decoded.payload.issuer as string
}
