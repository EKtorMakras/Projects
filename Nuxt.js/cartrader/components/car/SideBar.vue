<template>
  <div class="shadow border w-72 mr-10 z-30 self-start">

        <!-- Location -->
          <div class="relative cursor-pointer border-b">
            <div 
              class="flex justify-between gap-7 p-5 " 
              @click="updateModal('location')"
            >
              <h3 >Location</h3>
              <h3 class="text-blue-400 capitalize">{{ route.params.city }}</h3>
            </div>
            <form 
              v-if="modal.location" 
              class="location absolute border shadow left-[110%] p-5 -top-12 -m-1 bg-white"
              @submit.prevent="onChangeLocation"
            >
              <input type="text" class="border p-1 rounded" v-model="city">
              <button class="bg-blue-400 w-full mt-2 rounded text-white p-1">
               Apply
             </button>
          </form>
          </div>

          <!-- Make -->
          <div class="relative cursor-pointer border-b">
            <div 
              class="p-5 flex justify-between gap-7" 
              @click="updateModal('make')"
            >
              <h3>Make</h3>
              <h3 class="text-blue-400 capitalize">{{ route.params.make || 'Any' }}</h3>
            </div>
            <div 
              v-if="modal.make" 
              class="make absolute border shadow left-[110%] p-5 -top-20 -m-1 w-[600px] flex justify-between flex-wrap bg-white"
            >
              <h4 
                v-for="make in makes"
                :key="make"
                class="w-1/3 mb-2"
                @click="onChangeMake(make)"
              >
                {{ make }}
            </h4>
            </div>
          </div>


          <!-- Price -->
          <div class="relative cursor-pointer">
            <div 
              class="p-5 flex justify-between gap-7"
              @click="updateModal('price')"
            >
              <h3>Price</h3>
              <h3 class="text-blue-400 capitalize">{{ priceRangeText }}</h3>
            </div>

            <form 
              v-if="modal.price"
              class="price absolute border shadow left-[110%] p-5 top-2 -m-1 bg-white flex flex-col gap-5"
              @submit.prevent="onChangePrice"
            >
                <input 
                  type="number" 
                  placeholder="Min" 
                  v-model="priceRange.min"
                  class="border p-1 rounded"
                >
                <input 
                  type="number" 
                  placeholder="Max" 
                  v-model="priceRange.max"
                  class="border p-1 rounded"
                >
                <button class="bg-blue-400 w-full mt-2 rounded text py-2 text-white">Apply</button>
            </form>
          </div>
        </div>
</template>


<script setup>


  const route = useRoute()
  const router = useRouter()

  const { makes } = useCars()

  const modal = ref({
    make: false,
    location: false,
    price: false
  })

  const priceRange = ref({
    min: route.query.minPrice ?? '',
    max: route.query.maxPrice ?? '',
  })

  const priceRangeText = computed(() => {

    const minPrice = route.query.minPrice
    const maxPrice = route.query.maxPrice

    if(!minPrice && !maxPrice) return 'Any'
    else if (!minPrice && maxPrice) {
      return `< $${maxPrice}`
    }
    else if (minPrice && !maxPrice) {
      return `> $${minPrice}`
    }
    else {
      return `$${minPrice} - $${maxPrice}`
    }
})
 
  const city = ref('')

  const updateModal = (providedKey) => {
    for (const [ key, value ] of Object.entries(modal.value)) {
      if (key !== providedKey) {
        modal.value [ key] = false
      }
      else {
        modal.value[ providedKey ] = !modal.value[ providedKey ]
      }
    }
  }

  const onChangeLocation = () => {
    if (!city.value) return;
    if (!isNaN(parseInt(city.value))) {
      throw createError({
        statusCode: 400,
        message: 'Invalid city format'
      })
    }
    updateModal('location')
    navigateTo(`/city/${city.value}/car/${route.params.make}`)
  }


  const onChangeMake = (make) => {
    updateModal('make')
    navigateTo(`/city/${route.params.city}/car/${make}`)
  }


  const onChangePrice = () => {
    if (priceRange.value.max && priceRange.value.min) {
        if(priceRange.value.min > priceRange.value.max) return
    }
    updateModal('price')

    router.push({
      query: {
          minPrice: priceRange.value.min,
          maxPrice: priceRange.value.max
        }
    })
  }


  

</script>
