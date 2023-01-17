import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri"
import { magicClient } from "@/lib/magicClient"

import styles from "./Navbar.module.css"

const Navbar = () => {
  const router = useRouter()

  // state to handle dropdown menu
  const [isOpen, setIsOpen] = useState(false)

  const [username, setUsername] = useState<string | null>(null)

  const handleShowDropdown = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const getMagicUsername = async () => {
      try {
        const { email } = (await magicClient?.user.getMetadata()) as {
          email: string
        }

        setUsername(email)
      } catch (error) {
        console.log("Error retrieving email", error)
      }
    }

    getMagicUsername()
  }, [])

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    try {
      // attempt to log out the user
      await magicClient?.user.logout()
      setUsername(null)
      router.push("/login")
    } catch (error) {
      console.log("Error logging out", error)
      router.push("/login")
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.logoLink} href="/">
          <div className={styles.logoWrapper}>
            <Image
              src="/static/netflix.svg"
              alt="Netflix logo"
              width={128}
              height={34}
            />
          </div>
        </Link>

        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.navItem2}>
            <Link href="/my-list">My List</Link>
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button onClick={handleShowDropdown} className={styles.usernameBtn}>
              <p className={styles.username}>
                {username ? username : <Link href="/login">Sign In</Link>}
              </p>
              {isOpen ? (
                <RiArrowDropUpLine
                  size={24}
                  color="#FFFFFF"
                  title="Close dropdown"
                />
              ) : (
                <RiArrowDropDownLine
                  size={24}
                  color="#FFFFFF"
                  title="Expand dropdown"
                />
              )}
            </button>
            {isOpen ? (
              <div className={styles.navDropdown}>
                <div>
                  <a
                    className={styles.linkName}
                    onClick={(e) => handleLogout(e)}
                  >
                    Sign Out
                  </a>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            ) : null}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
