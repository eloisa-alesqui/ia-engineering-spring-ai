import Image from 'next/image'

export default {
  logo: (
    <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Image src="/images/logo.png" alt="Alesqui Intelligence" width={40} height={40} />
      <strong style={{ fontSize: '1.1rem' }}>IA Engineering con Spring AI</strong>
    </span>
  ),
  project: {
    link: 'https://github.com/eloisa-alesqui/ia-engineering-spring-ai',
  },
  docsRepositoryBase: 'https://github.com/eloisa-alesqui/ia-engineering-spring-ai/blob/main',
  banner: {
    key: 'libro-wip',
    text: '📖 Libro en construcción — nuevos capítulos cada semana',
  },
  footer: {
    text: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Image src="/images/logo.png" alt="Alesqui Intelligence" width={18} height={18} />
        © {new Date().getFullYear()} Alesqui Intelligence — IA Engineering con Spring AI
      </span>
    ),
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Guía práctica para integrar IA en aplicaciones Java con Spring AI" />
    </>
  ),
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
  },
  editLink: {
    text: null,
  },
  feedback: {
    content: null,
  },
}
