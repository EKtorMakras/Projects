<template>
  <main class="container mx-auto px-4 py-16 text-center">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-9xl font-bold text-gray-300">404</h1>
      <h2 class="text-4xl font-bold text-gray-800 mt-4 mb-6">
        {{ title }}
      </h2>
      <p class="text-xl text-gray-600 mb-8">
        {{ message }}
      </p>
      <router-link
        :to="{ name: 'home' }"
        class="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go Back Home
      </router-link>
    </div>
  </main>
</template>

<script>
export default {
  name: "NotFoundView",
  computed: {
    title() {
      return this.$route.params.title || "Page Not Found";
    },
    message() {
      return (
        this.$route.params.message ||
        "Oops! The page you're looking for doesn't exist."
      );
    },
  },
};
</script>
