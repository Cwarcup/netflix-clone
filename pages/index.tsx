import Head from "next/head"
import styles from "@/styles/Home.module.css"
import Banner from "@/components/Banner/Banner"
import Navbar from "@/components/Navbar/Navbar"
import Card from "@/components/Card/Card"
import CardSection from "@/components/CardSection/CardSection"

// hard coded data
const videosArr = [
  {
    imgURL: "/static/breaking_bad_banner.jpeg",
    id: "0",
    shouldScale: true,
  },
  {
    imgURL: "/static/breaking_bad_banner.jpeg",
    id: "1",
    shouldScale: true,
  },
  {
    imgURL: "/static/breaking_bad_banner.jpeg",
    id: "3",
    shouldScale: true,
  },
  {
    imgURL: "/static/breaking_bad_banner.jpeg",
    id: "1",
    shouldScale: true,
  },
  {
    imgURL: "/static/breaking_bad_banner.jpeg",
    id: "4",
    shouldScale: true,
  },
  {
    imgURL: "/static/breaking_bad_banner.jpeg",
    id: "1",
    shouldScale: true,
  },
  {
    imgURL: "/static/breaking_bad_banner.jpeg",
    id: "4",
    shouldScale: true,
  },
  {
    imgURL: "/static/breaking_bad_banner.jpeg",
    id: "1",
    shouldScale: true,
  },
  {
    imgURL: "/static/breaking_bad_banner.jpeg",
    id: "4",
    shouldScale: true,
  },
  {
    imgURL: "/static/breaking_bad_banner.jpeg",
    id: "1",
    shouldScale: true,
  },
]

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
      <div className={styles.sectionWrapper}>
        <CardSection
          title="Continue Watching"
          size="large"
          videos={videosArr}
        />
      </div>
      <CardSection title="Continue Watching" size="small" videos={videosArr} />
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
        imgURL="https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80"
        size="small"
        id="3"
        shouldScale={true}
      />
    </div>
  )
}
