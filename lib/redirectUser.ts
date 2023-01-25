import { GetServerSidePropsContext } from "next"
import { verifyToken } from "./verifyToken"

// is responsible to checking for the token within the cookies
// token is then verified

export const redirectUser = async (context: GetServerSidePropsContext) => {
  const { req } = context
  const token = req?.cookies?.token || null

  const userId = await verifyToken(token)

  return {
    userId,
    token,
  }
}
