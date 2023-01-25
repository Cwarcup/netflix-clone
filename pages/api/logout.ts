import { verifyToken } from "@/lib/verifyToken"
import type { NextApiRequest, NextApiResponse } from "next"
import { removeTokenCookie } from "lib/Cookie"
import { magicAdmin } from "@/lib/magicServer"

const logout = async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!req.cookies.token) {
      res
        .status(200)
        .json({ message: "No token found. User is already logged out" })
      return
    }

    const token = req.cookies.token

    const userId = await verifyToken(token)

    if (!userId) {
      res.status(401).json({ message: "Invalid token" })
      return
    }

    // remove token cookie from browser
    removeTokenCookie(res)

    try {
      // attempt to log out via magicAdmin
      await magicAdmin.users.logoutByIssuer(userId)
    } catch (error) {
      console.error("Error logging out Magic user", error)
    }
    // send user back to login page
    res.status(200).json({ message: "User logged out", logoutSuccess: true })
  } catch (error: any) {
    console.error(error)
    res
      .status(error?.status || 401)
      .end(error?.message || "User is not logged in")
  }
}

export default logout
