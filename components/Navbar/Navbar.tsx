import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri"
import styles from "./Navbar.module.css"
import { magicClient } from "@/lib/magicClient"

const Navbar = () => {
  const router = useRouter()

  // state to handle dropdown menu
  const [isOpen, setIsOpen] = useState(false)

  const [username, setUsername] = useState<string | null>(null)

  const [didToken, setDidToken] = useState<string | null>(null)

  const handleShowDropdown = () => {
    setIsOpen(!isOpen)
  }

  // gets the username from the Magic user object and sets the username state variable
  useEffect(() => {
    const getMagicUsername = async () => {
      try {
        const { email } = (await magicClient?.user.getMetadata()) as {
          email: string
        }

        const token = await magicClient?.user.getIdToken()

        if (token) {
          setDidToken(token)
        }

        setUsername(email)
      } catch (error) {
        console.error("Error retrieving email", error)
      }
    }

    getMagicUsername()
  }, [])

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    try {
      // attempt to log out the user
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${didToken}`,
          "Content-Type": "application/json",
        },
      })

      const logoutResponse = await response.json()

      if (logoutResponse.logoutSuccess === true) {
        // if the logout was successful, redirect to the login page
        router.push("/login")
        return
      } else {
        // if the logout was not successful, show an error message
        console.error("Error logging out")
      }
    } catch (error) {
      console.error("Error logging out", error)
      router.push("/login")
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.logoLink} href="/">
          <div className={styles.logoWrapper}>
            <h1>Ñotflix</h1>
          </div>
        </Link>

        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.navItem2}>
            <Link href="/browse/my-list">My List</Link>
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
