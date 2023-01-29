<template>
  <div>
      <CarCards v-if="cars.length > 0" :cars="cars"/>
      <div 
        v-else
        class="flex items-center justify-center h-full"
      >
        <h1 class="text-3xl text-gray-300">
          No cars found with these filters...
        </h1>
      </div>
  </div>
</template>


<script setup>

const route = useRoute()

const { data:cars , refresh } = await useFetchCars(route.params.city, {
  minPrice: route.query.minPrice,
  maxPrice: route.query.maxPrice,
  make: route.params.make
})

watch(() => route.query, () => {
  window.location.reload(true)
})

</script>
