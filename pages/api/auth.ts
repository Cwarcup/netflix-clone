// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { magicAdmin } from "../../lib/magicServer"
import jwt from "jsonwebtoken"

type Data = {
  name?: any
  error?: string
}

const auth = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === "POST") {
    try {
      // get token and parse it
      const auth = req.headers.authorization as string
      console.log("auth", auth)

      const didToken = auth ? auth.substring(7) : null
      console.log("didToken", didToken)

      if (!didToken) {
        res.status(401).json({ error: "Not authorized" })
        return
      }

      console.log(magicAdmin)

      const metadata = await magicAdmin?.users.getMetadataByToken(didToken)
      console.log("metadata", metadata)

      // create jwt token
      if (!metadata) {
        res.status(401).json({ error: "Not authorized" })
        return
      }

      // can use this token to authenticate with Hasura
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
      console.log("token", token)
      res.status(200).json({ name: metadata })

      if (!metadata) {
        res.status(401).json({ error: "Not authorized" })
        return
      }
      res.status(200).json({ name: metadata })
    } catch (error) {
      console.log("Something went wrong logging in", error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  } else {
    res.status(405).json({ error: "Method not allowed. Use a POST method" })
    return
  }
}

export default auth
