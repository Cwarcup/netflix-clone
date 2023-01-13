import Head from "next/head"

import styles from "@/styles/Home.module.css"

export default function Home() {
  return (
    <>
      <Head>
        <title>Netflix Clone</title>
        <meta name="description" content="Created by Curtis Warcup" />
      </Head>
      <main className={styles.main}>Netflix</main>
    </>
  )
}
