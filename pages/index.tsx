import Head from "next/head"
import styles from "@/styles/Home.module.css"
import Banner from "@/components/Banner/Banner"
import Navbar from "@/components/Navbar/Navbar"
import Card from "@/components/Card/Card"
import CardSection from "@/components/CardSection/CardSection"
import getYoutubeVideos from "@/lib/getYoutubeVideos"

import type { CardType } from "@/types"

type HomeProps = {
  disney: CardType[]
  travel: CardType[]
  comedy: CardType[]
  horror: CardType[]
}

export default function Home({ disney, travel, comedy, horror }: HomeProps) {
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
        <CardSection title="Disney" size="large" videos={disney} />
        <CardSection title="Travel" size="small" videos={travel} />
        <CardSection title="Comedy" size="small" videos={comedy} />
        <CardSection title="Horror" size="small" videos={horror} />
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const disney = await getYoutubeVideos("Disney Trailers")
  const travel = await getYoutubeVideos("Travel Documentary Trailers")
  const comedy = await getYoutubeVideos("Comedy Show Trailers")
  const horror = await getYoutubeVideos("Horror Movie Trailers")

  return {
    props: {
      disney,
      travel,
      comedy,
      horror,
    },
  }
}
