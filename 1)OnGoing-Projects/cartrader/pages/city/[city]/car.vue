<template>
  <div>
      <div class="flex mt-32">

        <NuxtErrorBoundary>
          <!-- Car Side Bar -->
          <CarSideBar />
  
          <!-- Car Cards -->
          <NuxtPage />

          <!-- Error -->
          <template #error="{error}">
            <div class="text-center mx-auto flex flex-col">
              <h1 class="text-5xl text-red-400 mb-5">Sorry something went wrong</h1>
              <code>{{ error }}</code>
              <button 
                class="text-white bg-blue-400 px-10 py-3 rounded mt-4"
                @click="error.value = null"
              >
                Go Back
            </button>
            </div>
          </template>
        </NuxtErrorBoundary>

      </div>
  </div>
</template>


<script setup>

  const route = useRoute()

  const { toTitleCase } = useUtilities()

  useHead ({
      title: `${toTitleCase(route.params.make) || 'Cars'} in ${toTitleCase(route.params.city)}`
  })

  definePageMeta({
    layout: 'custom'
  })

</script>
