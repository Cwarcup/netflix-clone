import styles from "./Footer.module.css"
import { RiGithubFill, RiLinkedinFill } from "react-icons/ri"

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerLinkWrapper}>
        <a
          href="https://github.com/Cwarcup/netflix-clone"
          target="_blank"
          rel="noreferrer"
        >
          <RiGithubFill className={styles.footerIcon} />
        </a>
        <a
          href="https://www.linkedin.com/in/curtiswarcup/"
          target="_blank"
          rel="noreferrer"
        >
          <RiLinkedinFill className={styles.footerIcon} />
        </a>
      </div>
      <p className={styles.footerText}>
        Created by{" "}
        <a
          className={styles.portfolioLink}
          href="https://www.cwarcup.com/"
          target="_blank"
          rel="noreferrer"
        >
          Curtis Warcup
        </a>
      </p>
    </footer>
  )
}

export default Footer
