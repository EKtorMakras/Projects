// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({


  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@nuxt/image-edge',
    "@vueuse/nuxt"
  ],


  // Css
  css: [
      "@fortawesome/fontawesome-svg-core/styles.css"
  ],


  // Build
  build: {
    transpile: [
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-brands-svg-icons",
        "@fortawesome/free-regular-svg-icons",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
    ]
  },
})
