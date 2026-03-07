import Layout from 'nextra-theme-docs'
import 'nextra-theme-docs/style.css'

export default function App({ Component, pageProps }) {
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  )
}
