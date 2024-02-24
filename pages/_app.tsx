import "@/styles/globals.css"
import { Roboto } from "@next/font/google"
import type { AppProps } from "next/app"
import { useEffect, useState } from "react"
import { magicClient } from "@/lib/magicClient"
import { useRouter } from "next/router"
import Loading from "@/components/Loading/Loading"

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google"

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
})

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false) // set to false to work on dynamic routes

  // comment out to work on dynamic routes
  useEffect(() => {
    const getMagicUsername = async () => {
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
      <GoogleAnalytics gaId="G-2CE3D542JK" />
      <GoogleTagManager gtmId="GTM-2CE3D542JK" />
    </>
  )
}
