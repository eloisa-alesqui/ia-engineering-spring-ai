import 'nextra-theme-docs/style.css'
import '../styles/global.css'
import Script from 'next/script'

const GA_ID = 'G-1LQ9TMTP2D'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
      <Component {...pageProps} />
    </>
  )
}
