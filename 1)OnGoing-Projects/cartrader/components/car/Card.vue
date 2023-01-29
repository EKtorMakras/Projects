<template>
  <div class="shadow border w-full overflow-hidden mb-5 cursor-pointer relative">
  <img 
    :src="favored ? heartFilled : heartOutline" 
    alt="" 
    class="absolute w-7 right-2 top-2 z-20" 
    @click="emit('favor',car.id)"
  >
      <div class="flex h-full" @click="navigateTo(`/car/${car.name}-${car.id}`)">
          <NuxtImg
            :src="car.url"
            alt="" 
            class="w-[40%] h-full object-contain self-center"
          />

          <div class="p-4 flex flex-col gap-4">
            <div>
              <h2 class="text-xl text-blue-700 mb-3">
                {{ car.name }}
              </h2>
              <p class="text-gray-700">
                {{ car.description }}
              </p>
            </div>
            <h2 class="mt-auto text-xl">${{ car.price }}</h2>
          </div>
      </div>
  </div>
</template>


<script setup>

  import heartFilled from '@/assets/images/heartFilled.png'
  import heartOutline from '@/assets/images/heartOutline.png'

  const props = defineProps({
    car: {
      type: Object,
      required: true
    },
    favored: Boolean
  })
  
  const emit = defineEmits(['favor'])


</script>
