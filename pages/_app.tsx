import "@/styles/globals.css"
import { Roboto_Slab } from "@next/font/google"
import type { AppProps } from "next/app"

const roboto_slab = Roboto_Slab({
  subsets: ["latin"],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${roboto_slab.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
