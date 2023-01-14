import Head from "next/head"
import styles from "@/styles/Home.module.css"
import Banner from "@/components/Banner/Banner"
import Navbar from "@/components/Navbar/Navbar"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix Clone</title>
        <meta name="description" content="Created by Curtis Warcup" />
      </Head>
      <Navbar username="Curtis" />
      <Banner
        title="The Witcher"
        subTitle="A Netflix Original Series"
        imgUrl="/static/clifford.webp"
      />
      {/* <Card /> */}
    </div>
  )
}
