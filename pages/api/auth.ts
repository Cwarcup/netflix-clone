// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { magicAdmin } from "../../lib/magicServer"
import jwt from "jsonwebtoken"
import { isNewUser, addUser } from "../../lib/db/hasura"
import { setTokenCookie } from "../../lib/createCookie"

type Data = {
  name?: any
  error?: any
  isNewUserQuery?: any
  message?: any
  addUserMutation?: any
  authSuccess?: boolean
}

const auth = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === "POST") {
    try {
      // get token and parse it from the headers
      const auth = req.headers.authorization as string
      const didToken = auth ? auth.substring(7) : null

      // if no token, return error
      if (!didToken) {
        res.status(401).json({
          error:
            "Not authorized or missing Authorization header with Bearer token",
        })
        return
      }

      // create jwt token, and use it to authenticate with Hasura
      const metadata = await magicAdmin?.users.getMetadataByToken(didToken)

      // if no metadata, return error
      if (!metadata) {
        res
          .status(401)
          .json({ error: "Not authorized. Unable to get metadata from token" })
        return
      }

      // create a token use this token to authenticate with Hasura
      const token = jwt.sign(
        {
          ...metadata,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-default-role": "user",
            "x-hasura-user-id": `${metadata.issuer}`,
          },
        },
        process.env.HASURA_GRAPHQL_JWT_SECRET as string
      )

      // check to see if user exists in the db using the token
      const isNewUserQuery = await isNewUser(token, metadata.issuer)

      // if isNewUserQuery is true, then the user is new and we can add them to the db
      isNewUserQuery &&
        (await addUser(
          token,
          metadata.issuer,
          metadata.publicAddress,
          metadata.email
        ))

      // set the cookie with the token
      setTokenCookie(token, res)
      // return success
      res.status(200).json({ authSuccess: true })
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", authSuccess: false })
    }
  } else {
    res.status(405).json({
      error: "Method not allowed. Use a POST method",
      authSuccess: false,
    })
    return
  }
}

export default auth
