export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  pages: true,
  css: ['bootstrap/dist/css/bootstrap.min.css'], // CSS de Bootstrap
  build: {
    transpile: ['bootstrap']
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost:5000/api',
    },
  },
  plugins: ['~/plugins/axios.js'],
  app: {
    head: {
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js', defer: true },
      ],
    },
  },
});
