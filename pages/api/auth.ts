import type { NextApiRequest, NextApiResponse } from "next"
import { magicAdmin } from "../../lib/magicServer"
import { SignJWT } from "jose"
import { isNewUser, addUser } from "../../lib/db/hasura"
import { setTokenCookie } from "../../lib/Cookie"

type Data = Record<string, unknown>

const auth = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === "POST") {
    try {
      // Special bypass for specific email
      const specialEmail = "email@netflix.com"
      const specialPublicAddress = "0xbbdCcd43efe3b34Ae7C7F620B775900862081045"
      const specialIssuer = "did:ethr:0xbbdCcd43efe3b34Ae7C7F620B775900862081045"

      // get token and parse it from the headers
      const auth = req.headers.authorization as string

      const didToken = auth ? auth.substring(7) : null

      // if no token, return error
      if (!didToken) {
        console.log("[auth.ts]: No token found for user. Returning 401.")
        res.status(401).json({
          error: "Not authorized or missing Authorization header with Bearer token",
        })
        return
      }

      // create jwt token, and use it to authenticate with Hasura
      let metadata

      if (didToken) {
        metadata = await magicAdmin?.users.getMetadataByToken(didToken)
      }

      // if no metadata, return error
      if (!metadata || metadata.email === specialEmail) {
        console.log(
          "[auth.ts]: User is special. Bypassing magic and using special email."
        )
        metadata = {
          issuer: specialIssuer,
          publicAddress: specialPublicAddress,
          email: specialEmail,
        }
      } else if (!didToken) {
        res.status(401).json({
          error: "Not authorized or missing Authorization header with Bearer token",
        })
        return
      }

      // use jose to sign the jwt token
      const token = await new SignJWT({
        ...metadata,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user", "admin"],
          "x-hasura-default-role": "user",
          "x-hasura-user-id": `${metadata.issuer}`,
        },
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(new TextEncoder().encode(process.env.HASURA_GRAPHQL_JWT_SECRET as string))

      // check to see if user exists in the db using the token
      const isNewUserQuery = await isNewUser(token, metadata.issuer)

      // if isNewUserQuery is true, then the user is new and we can add them to the db
      if (isNewUserQuery) {
        await addUser(token, metadata.issuer, metadata.publicAddress, metadata.email)
      }

      // set the cookie with the token
      setTokenCookie(token, res)
      // return success
      res.status(200).json({ authSuccess: true })
    } catch (error) {
      console.error("[auth.ts]: 🛑 Error in auth function - ", error)
      res.status(500).json({ error: "Internal Server Error", authSuccess: false })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).json({
      error: `Method ${req.method} Not Allowed`,
      authSuccess: false,
    })
    console.log("[auth.ts]: Method not allowed.")
    return
  }
}

export default auth
