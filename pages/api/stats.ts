import { verifyToken } from "./../../lib/verifyToken"
import type { NextApiRequest, NextApiResponse } from "next"
import type { videoStatsType } from "../../types"

import {
  findVideoIdByUserId,
  updateStats,
  insertStats,
} from "../../lib/db/hasura"

type Data = {
  message?: string
  data?: any
  error?: string
}

type ReqBodyType = {
  videoId: string
  favourited: boolean | null
  watched: boolean
}
// route to get a users stats

const stats = async function (req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    try {
      // read token from cookies
      const token = req?.cookies?.token || null

      if (!token) {
        res.status(403).end("Forbidden. No token provided by cookie.")
        return
      }

      // get the videoId from the query
      const {
        videoId,
        favourited = null,
        watched = true,
      } = req.body as ReqBodyType

      // need to decode the token
      const userId = await verifyToken(token)

      if (!userId) {
        res.status(403).end("Forbidden. No user id found.")
        return
      }

      // check if the user has stats for this video
      const videoStats = await findVideoIdByUserId(token, userId, videoId)

      if (!videoStats) {
        // create a new video stats object
        const updateStatsRes = await insertStats(token, {
          watched,
          userId,
          videoId,
          favourited,
        } as videoStatsType)
        res.send({ message: "Stats created", data: updateStatsRes })
      } else {
        // update the video stats object
        const updateStatsRes = await updateStats(token, {
          watched,
          userId,
          videoId,
          favourited,
        } as videoStatsType)
        res.send({ message: "Stats updated", data: updateStatsRes })
      }
    } catch (error) {
      console.error("Error occurred: ", error)
      res.status(500).end("Internal Server Error")
      return
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default stats
