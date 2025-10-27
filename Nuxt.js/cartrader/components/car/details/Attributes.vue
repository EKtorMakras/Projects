<template>
  <div class="mr-10 mt-5 border-b pb-5">
    <div 
      class="flex  text-lg mt-2" 
      v-for="feature in car.features" :key="feature"
    >
        <span class="rounded text-lime-800 mr-3">
          <font-awesome-icon icon="fa-solid fa-check" />
        </span>
        <p>{{ feature }}</p>
    </div>
  </div>
</template>


<script setup>

  const props = defineProps({
      car: {
        type: Object,
        required: true
      }
  })

</script>