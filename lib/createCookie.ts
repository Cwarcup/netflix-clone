import cookie from "cookie"
import { NextApiResponse } from "next"

const MAX_AGE = 7 * 24 * 60 * 60 // 7 days

export const setTokenCookie = (token: string, res: NextApiResponse) => {
  const setCookie = cookie.serialize("token", token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === "production",
    path: "/",
  })
  res.setHeader("Set-Cookie", setCookie)
}

export const removeTokenCookie = (res: NextApiResponse) => {
  const val = cookie.serialize("token", "", {
    maxAge: -1,
    path: "/",
  })

  res.setHeader("Set-Cookie", val)
}
