import "../styles/globals.css";
import type { AppProps } from "next/app";
import styles from "styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { asPath, locale } = router;

  const newLocale = locale === "en" ? "fr" : "en";

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <ul className={styles.nav}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
          <Link href={asPath} locale={newLocale}>
            {newLocale.toUpperCase()}
          </Link>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
