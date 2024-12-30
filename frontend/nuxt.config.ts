// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  pages: true, 
  css: ['bootstrap/dist/css/bootstrap.min.css'],
  build: {
    transpile: ['bootstrap']
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost:5000/api',
    },
  },
  plugins: ['~/plugins/axios.js']
})
