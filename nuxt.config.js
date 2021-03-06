require('dotenv').config()

module.exports = {
  target: 'server',
  telemetry: false,
  /*
   ** Headers of the page
   */
  head: {
    title: 'FoGUWA',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'An interactive map that shows information about the various native flora growing on the UWA campus.'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com/',
        crossorigin: ''
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700'
      }
    ]
  },
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#3F51B5' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/pwa', '@nuxtjs/axios', '@nuxtjs/auth-next'],

  axios: {
    baseURL: process.env.BASE_URL,
  },

  auth: {
    redirect: {
      login: '/',
      callback: '/login'
    },
    strategies: {
      auth0: {
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID,
        audience: process.env.AUTH0_AUDIENCE
      }
    }
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    theme: {
      themes: {
        light: {
          primary: '#3F51B5',
          secondary: '#F7AEF8',
          info: '#907AD6',
          warning: '#D3BE70',
          error: '#b9413f',
          success: '#8BE8CB'
        }
      },
      options: {
        customProperties: true
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  env: {
    GMAPS_KEY: process.env.GMAPS_KEY,
    S3_BASE_URL: process.env.S3_BASE_URL
  }
}
