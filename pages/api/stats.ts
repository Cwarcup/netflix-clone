import { verifyToken } from "./../../lib/verifyToken"
import type { NextApiRequest, NextApiResponse } from "next"
import type { VideoStatsType } from "../../types"

import {
  findVideoIdByUserId,
  updateStats,
  insertStats,
} from "../../lib/db/hasura"

type Data = {
  message?: string
  data: any
  error?: string
}

type ReqType = {
  videoId?: string
  favourited?: boolean | null
  watched?: boolean
}

// route to get a users stats

const stats = async function (req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    // read token from cookies
    const token = req?.cookies?.token || null
    console.log("token: ", token)

    if (!token) {
      res.status(403).end("Forbidden. No token provided by cookie.")
      return
    }
    // need to decode the token
    const userId = await verifyToken(token)

    if (!userId) {
      res.status(403).end("Forbidden. No user id found.")
      return
    }

    // if method is post, get the body, otherwise get the query
    const inputParams: { videoId: string } =
      req.method === "POST" ? req.body : req.query
    // get the videoId from the query
    const { videoId } = inputParams

    // check if the user has stats for this video
    const findVideo = await findVideoIdByUserId(token, userId, videoId)

    if (req.method === "POST") {
      const { favourited = null, watched = true } = req.body as ReqType

      if (!findVideo) {
        // create a new video stats object
        const insertStatsRes = await insertStats(token, {
          watched,
          userId,
          videoId,
          favourited,
        } as VideoStatsType)

        res.send({ message: "Stats created", data: insertStatsRes })
      } else {
        // update the video stats object
        const updateStatsRes = await updateStats(token, {
          watched,
          userId,
          videoId,
          favourited,
        } as VideoStatsType)

        res.send({ message: "Stats updated", data: updateStatsRes })
      }
    } else {
      // must be a GET request
      if (!findVideo) {
        res.status(404).end("Video Not Found")
        return
      }
      res.send({ data: findVideo })
    }
  } catch (error) {
    console.error("Error occurred: ", error)
    res.status(500).end("Internal Server Error")
    return
  }
}

export default stats
