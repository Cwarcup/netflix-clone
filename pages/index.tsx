import Head from "next/head"
import { GetServerSideProps } from "next"
import styles from "@/styles/Home.module.css"
import Banner from "@/components/Banner/Banner"
import Navbar from "@/components/Navbar/Navbar"
import CardSection from "@/components/CardSection/CardSection"
import { redirectUser } from "@/lib/redirectUser"
import {
  getVideos,
  getPopularVideos,
  getWatchItAgainVideos,
} from "@/lib/getYoutubeVideos"

import type { CardType, WatchedVideosListType } from "@/types"

type HomeProps = {
  userVideos: WatchedVideosListType[]
  popular: CardType[]
  comedy: CardType[]
  japaneseRealityTv: CardType[]
  netflixOriginals: CardType[]
}

export default function Home({
  popular,
  userVideos,
  comedy,
  japaneseRealityTv,
  netflixOriginals,
}: HomeProps) {
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
        <CardSection title="Comedy" size="small" videos={comedy} />
        <CardSection
          title="Japanese Reality TV"
          size="small"
          videos={japaneseRealityTv}
        />
        <CardSection
          title="Netflix Originals"
          size="small"
          videos={netflixOriginals}
        />
        <CardSection title="Watch It Again" size="small" videos={userVideos} />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token, userId } = await redirectUser(context)

  if (!token || !userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  const popular = await getPopularVideos()
  const userVideos = await getWatchItAgainVideos(token, userId)

  const comedy = await getVideos("Newly released comedy movie netflix")
  const japaneseRealityTv = await getVideos(
    "Japanese reality tv netflix trailer"
  )
  const netflixOriginals = await getVideos("Netflix originals trailer")

  return {
    props: {
      popular,
      userVideos,
      comedy,
      japaneseRealityTv,
      netflixOriginals,
    },
  }
}
