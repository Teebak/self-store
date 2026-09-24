// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Self.',
      meta: [
        { name: 'description', content: 'Self. — beauty, kept simple. Baghdad and online.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Anton&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Manrope:wght@300;400;500;600&display=swap'
        }
      ]
    }
  }
})
