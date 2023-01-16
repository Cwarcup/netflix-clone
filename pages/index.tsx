import Head from "next/head"
import styles from "@/styles/Home.module.css"
import Banner from "@/components/Banner/Banner"
import Navbar from "@/components/Navbar/Navbar"
import Card from "@/components/Card/Card"
import CardSection from "@/components/CardSection/CardSection"
import mutateYoutubeRes from "@/lib/mutateYoutubeRes"
import YoutubeRawData from "@/data/youtubeData.json"

export default function Home() {
  const hardCodedData = mutateYoutubeRes(YoutubeRawData)
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
        <CardSection
          title="Continue Watching"
          size="large"
          videos={hardCodedData}
        />
        <CardSection
          title="Continue Watching"
          size="small"
          videos={hardCodedData}
        />
      </div>
    </div>
  )
}
