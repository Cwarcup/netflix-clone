import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

import { useState, useRef } from "react"
import { isValidEmail } from "@/lib/isValidEmail"

import styles from "@/styles/Login.module.css"

type Props = {}

const Login = (props: Props) => {
  // create a ref for the email input
  const emailInputRef = useRef<HTMLInputElement>(null)

  // create a state for the email input
  const [email, setEmail] = useState<string | null>(null)

  // fn to handle login with email
  const handleLoginWithEmail = () => {
    // get the value from the email input
    const email = emailInputRef.current?.value || null
    // need to check if the email is valid
    // if not, show an error message
    if (email && !isValidEmail(email)) {
      alert("Please enter a valid email address")
      return
    }

    // set the email state
    setEmail(email)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix - Sign In</title>
        <meta
          name="description"
          content="Created by Curtis Warcup. Netflix clone."
        />
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
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
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault()
              handleLoginWithEmail()
            }}
          >
            <label className={styles.emailLabel} htmlFor="email">
              Email
            </label>

            <input
              className={styles.emailInput}
              type="text"
              placeholder="Enter your email"
              ref={emailInputRef}
              aria-label="Email Address"
            />

            <button
              className={styles.loginBtn}
              type="submit"
              onClick={handleLoginWithEmail}
              aria-label="Sign In"
            >
              Sign In
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Login
