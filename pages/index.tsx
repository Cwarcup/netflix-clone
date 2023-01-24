import Head from "next/head"
import styles from "@/styles/Home.module.css"
import Banner from "@/components/Banner/Banner"
import Navbar from "@/components/Navbar/Navbar"
import CardSection from "@/components/CardSection/CardSection"
import {
  getVideos,
  getPopularVideos,
  getWatchItAgainVideos,
} from "@/lib/getYoutubeVideos"

import type { CardType, WatchedVideosListType } from "@/types"
import { verifyToken } from "@/lib/verifyToken"

type HomeProps = {
  disney: CardType[]
  popular: CardType[]
  userVideos: WatchedVideosListType[]
}

export default function Home({ disney, popular, userVideos }: HomeProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix Clone</title>
        <meta name="description" content="Created by Curtis Warcup" />
      </Head>
      <Navbar />
      <Banner
        title="Breaking Bad"
        subTitle="A Netflix Original Series"
        imgUrl="/static/breaking_bad_banner.jpeg"
        videoId="2gTC4uWP3_Y"
      />
      <div className={styles.sectionWrapper}>
        <CardSection title="Popular" size="large" videos={popular} />
        <CardSection title="Disney" size="small" videos={disney} />
        <CardSection title="Watch It Again" size="small" videos={userVideos} />
      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const token = context.req ? context.req.cookies.token : null
  const userId = await verifyToken(token)

  // if no user id, redirect to login page
  if (!userId) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  const disney = await getVideos("Disney Trailers")
  const popular = await getPopularVideos()
  const userVideos = await getWatchItAgainVideos(token, userId)

  return {
    props: {
      disney,
      popular,
      userVideos,
    },
  }
}
