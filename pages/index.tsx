import Head from "next/head"
import styles from "@/styles/Home.module.css"
import Banner from "@/components/Banner/Banner"
import Navbar from "@/components/Navbar/Navbar"
import Card from "@/components/Card/Card"

export default function Home() {
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
      <Card
        imgURL="/static/breaking_bad_banner.jpeg"
        size="large"
        id="1"
        shouldScale={true}
      />
      <Card
        imgURL="/static/breaking_bad_banner.jpeg"
        size="medium"
        id="2"
        shouldScale={true}
      />
      <Card
        imgURL="/static/breaking_bad_banner.jpeg"
        size="small"
        id="3"
        shouldScale={true}
      />
    </div>
  )
}
