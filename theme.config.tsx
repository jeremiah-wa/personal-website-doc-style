import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: (
    <>
      {/* TODO: Add Logo */}
      <span>Jeremiah Wangaruro</span>
    </>
  ),
  project: {
    link: 'https://github.com/jeremiah-wa',
  },
  chat: {
    link:'https://www.linkedin.com/in/jeremiahwangaruro',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M22.23 0H1.77A1.76 1.76 0 0 0 0 1.75v20.5A1.76 1.76 0 0 0 1.77 24h20.46A1.76 1.76 0 0 0 24 22.25V1.75A1.76 1.76 0 0 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.54a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM20.45 20.45h-3.56v-5.6c0-1.34-.03-3.06-1.86-3.06-1.86 0-2.14 1.45-2.14 2.95v5.71h-3.56V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.38-1.86c3.61 0 4.28 2.38 4.28 5.47v6.28z"
        />
      </svg>
    )
  },
  editLink: {text: '', component: null},
  docsRepositoryBase: 'https://github.com/jeremiah-wa/personal-website-doc-style',
  footer: {
    text: '',
  },
  useNextSeoProps() {
    return {
      titleTemplate: 'Jeremiah Wangaruro'
    }
  },
  head: (
    <>
      <meta
        name="description"
        content="Jeremiah Wangaruro's Portfolio"
      />
      <link rel="icon" href="./static/logo.jpg" type="image/jpeg" />
    </>
  )
}

export default config
