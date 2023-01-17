import "@/styles/globals.css"
import { Roboto } from "@next/font/google"
import type { AppProps } from "next/app"
import { useEffect, useState } from "react"
import { magicClient } from "@/lib/magicClient"
import { useRouter } from "next/router"
import Loading from "@/components/Loading/Loading"

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
})

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getMagicUsername = async () => {
      const isLoggedIn = await magicClient?.user.isLoggedIn()

      if (!isLoggedIn) {
        router.push("/login")
        return
      }

      router.push("/")
    }

    getMagicUsername()
  }, [])

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false)
    }
    router.events.on("routeChangeComplete", handleComplete)
    router.events.on("routeChangeError", handleComplete)

    return () => {
      router.events.off("routeChangeComplete", handleComplete)
      router.events.off("routeChangeError", handleComplete)
    }
  }, [router])

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
