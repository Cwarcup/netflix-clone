import Head from "next/head"
import { GetServerSideProps } from "next"
import Navbar from "@/components/Navbar/Navbar"
import { redirectUser } from "@/lib/redirectUser"
import { getMyList } from "@/lib/getYoutubeVideos"
import CardSection from "@/components/CardSection/CardSection"
import styles from "../../styles/MyList.module.css"
import type { WatchedVideosListType } from "@/types"

type Props = {
  myListVideos: WatchedVideosListType[]
}

const MyList = ({ myListVideos }: Props) => {
  return (
    <div>
      <Head>
        <title>My list</title>
        <meta
          name="description"
          content="Created by Curtis Warcup"
        />
      </Head>
      <main className={styles.main}>
        <Navbar />
        <div className={styles.sectionWrapper}>
          <CardSection
            title="My List"
            videos={myListVideos}
            size="small"
            shouldWrap
            shouldScale={false}
          />
        </div>
      </main>
    </div>
  )
}

export default MyList

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId, token } = await redirectUser(context)
  if (!userId || !token) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  let myListVideos: WatchedVideosListType[] = []
  try {
    const result = await getMyList(token, userId)
    if (Array.isArray(result)) {
      myListVideos = result
    } else {
      console.error("getMyList did not return an array:", result)
    }
  } catch (error) {
    console.error("Error getting my list", error)
  }

  return {
    props: {
      myListVideos,
    },
  }
}
