import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri"

import styles from "./Navbar.module.css"
type Props = {
  username: string
}

const Navbar = (props: Props) => {
  // state to handle dropdown menu
  const [isOpen, setIsOpen] = useState(false)

  const handleShowDropdown = () => {
    setIsOpen(!isOpen)
  }

  const { username } = props
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
              <p className={styles.username}>{username}</p>
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
                  <Link href="/login" className={styles.linkName}>
                    Sign Out
                  </Link>
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
