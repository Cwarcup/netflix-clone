import Head from "next/head"
import styles from "@/styles/Home.module.css"
import Banner from "@/components/Banner/Banner"
import Navbar from "@/components/Navbar/Navbar"
import CardSection from "@/components/CardSection/CardSection"
import { getVideos, getPopularVideos } from "@/lib/getYoutubeVideos"

import type { CardType } from "@/types"

type HomeProps = {
  disney: CardType[]
  popular: CardType[]
}

export default function Home({ disney, popular }: HomeProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix Clone</title>
        <meta name="description" content="Created by Curtis Warcup" />
      </Head>
      <Navbar username="Curtis" />
      <Banner
        title="Breaking Bad"
        subTitle="A Netflix Original Series"
        imgUrl="/static/breaking_bad_banner.jpeg"
      />
      <div className={styles.sectionWrapper}>
        <CardSection title="Popular" size="large" videos={popular} />
        <CardSection title="Disney" size="large" videos={disney} />
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const disney = await getVideos("Disney Trailers")

  const popular = await getPopularVideos()

  return {
    props: {
      disney,
      popular,
    },
  }
}
