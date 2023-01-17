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

  const [userMsg, setUserMsg] = useState<string | null>(null)

  // if emailInput is being typed in, clear the user message
  const handleEmailInputTyping = () => {
    setUserMsg(null)
  }

  // fn to handle login with email
  const handleLoginWithEmail = () => {
    console.log("button clicked")
    // get the value from the email input
    const email = emailInputRef.current?.value || null
    // need to check if the email is valid
    // if not, show an error message

    if (!email) {
      setUserMsg("Please enter an email address")
      return
    }

    if (!isValidEmail(email)) {
      console.log(isValidEmail(email))
      setUserMsg("Please enter a valid email address")
      return
    }

    // set the email state
    setEmail(email)
    // clear the user message
    setUserMsg(null)
  }

  console.log("email", email)

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
              onChange={handleEmailInputTyping}
              aria-label="Email Address"
            />

            {userMsg && <p className={styles.userMsg}>{userMsg}</p>}

            <button
              className={styles.loginBtn}
              type="submit"
              onClick={handleLoginWithEmail}
              aria-label="Sign In"
            >
              Sign In
            </button>
            {/* remember me input and text, is not functional */}
            <div className={styles.rememberMeWrapper}>
              <div className={styles.rememberMeInputWrapper}>
                <input
                  className={styles.rememberMeInput}
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  value="rememberMe"
                />
                <label className={styles.rememberMeLabel} htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <Link href="/" className={styles.helpLink}>
                Need help?
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Login
