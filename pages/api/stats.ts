import type { NextApiRequest, NextApiResponse } from "next"
import { verifyToken } from "./../../lib/verifyToken"
import {
  findVideoIdByUserId,
  updateStats,
  insertStats,
} from "../../lib/db/hasura"
import type { VideoStatsType } from "../../types"

type Data = Record<string, unknown>

// route to get a users stats
const stats = async function (req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    // read token from cookies
    const token = req?.cookies?.token || null

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
      const { favourited = null, watched = true } = req.body

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
        res.status(404).send({ message: "No stats found for this videoId" })
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
