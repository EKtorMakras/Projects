<template>
    <form 
      @submit.prevent="searchSubmit" 
      class="font-serif w-[100%] text-2xl rounded-full bg-white flex justify-between overflow-hidden drop-shadow-2xl mx-auto"
      :class="cityErr ? `outline outline-red-400 outline-1` : ''"
    >
        <input 
          type="text" 
          class="py-3 px-5 w-full text-2xl rounded-full focus: outline-none text-neutral-600"
          placeholder="search by city..."
          v-model="city"
          @keydown="cityErr = false"
          @blur="cityErr = false"
        >
        <button
          class="bg-sky-500 px-2 text-white hover:bg-sky-600 transition ease-in-out duration-350 w-[30%]"
        >
          Search
        </button>
      </form>
</template>


<script setup>

  // Constants

const city = ref('')

const cityErr = ref(false)

  // Methods
const searchSubmit = () => {
    if (!city.value) {
      cityErr.value = true
      return
    }
     navigateTo(`/city/${city.value}/car`)
  }
  

  
</script>
