import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: 'IA Engineering con Spring AI',
  description: 'Guía práctica para integrar IA en aplicaciones Java con Spring AI',
}

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap()
  return (
    <html lang="es" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={
            <Navbar
              logo={<strong>IA Engineering con Spring AI</strong>}
              projectLink="https://github.com/eloisa-alesqui/ia-engineering-spring-ai"
            />
          }
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/eloisa-alesqui/ia-engineering-spring-ai/blob/main"
          footer={
            <Footer>
              IA Engineering con Spring AI — Guía práctica para el desarrollador Java
            </Footer>
          }
          sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: true }}
          toc={{ backToTop: 'Volver arriba' }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
