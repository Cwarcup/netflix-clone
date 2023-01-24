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

type HomeProps = {
  disney: CardType[]
  popular: CardType[]
  userVideos: WatchedVideosListType[]
}

export default function Home({ disney, popular, userVideos }: HomeProps) {
  console.log(userVideos)
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

export async function getServerSideProps() {
  const disney = await getVideos("Disney Trailers")
  const popular = await getPopularVideos()
  const userVideos = await getWatchItAgainVideos(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweDkyYmM0MTA1MTk2OWVkZWRCREMxMzFkMDk5RDQ0QjczRDQwYURDMDEiLCJwdWJsaWNBZGRyZXNzIjoiMHg5MmJjNDEwNTE5NjllZGVkQkRDMTMxZDA5OUQ0NEI3M0Q0MGFEQzAxIiwiZW1haWwiOiJjdXJ0aXMuZ3dhcmN1cEBnbWFpbC5jb20iLCJvYXV0aFByb3ZpZGVyIjpudWxsLCJwaG9uZU51bWJlciI6bnVsbCwid2FsbGV0cyI6W10sImlhdCI6MTY3NDUwODc5MywiZXhwIjoxNjc1MTEzNTkzLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsImFkbWluIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiZGlkOmV0aHI6MHg5MmJjNDEwNTE5NjllZGVkQkRDMTMxZDA5OUQ0NEI3M0Q0MGFEQzAxIn19.cde67C2wHzBobhJwYiq8q0WS8R3QaIuwwZ9UsgSpv2E",
    "did:ethr:0x92bc41051969ededBDC131d099D44B73D40aDC01"
  )

  console.log(userVideos)
  return {
    props: {
      disney,
      popular,
      userVideos,
    },
  }
}
