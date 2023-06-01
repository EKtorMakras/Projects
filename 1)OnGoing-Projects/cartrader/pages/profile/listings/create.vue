<template>
  <div class="flex flex-col items-center">
    <div>
      <h1 class="text-6xl mt-24">Create a new listing</h1>
    </div>
    <form class="shadow rounded p-5 mt-5 mb-10 flex flex-wrap gap-5 justify-between w-[50%]">
      <CarAddSelect 
          :title="`Make *`" 
          :options="makes" 
          :name="`make`" 
          @change-input="handleChangeInput"
      />
      <CarAddInput
          v-for="input in inputs"
          :key="input.id"
          :title="input.title"
          :name="input.name"
          :placeholder="input.placeholder"
          @change-input="handleChangeInput"
      />
      <CarAddTextarea
          :title="`Description *`"
          :name="`Description`"
          :placeholder="''"
          @change-input="handleChangeInput"
      />
      <CarAddImage @change-input="handleChangeInput"/>

      <div>
        <button 
          class="bg-blue-400 text-white rounded py-2 px-7 mt-4 hover:bg-blue-500"
          @click="handleSubmit"
        >
          Submit
        </button>

        <p v-if="errorMessage" class="mt-4 text-red-400">
          {{ errorMessage }}
        </p>
      </div>
    </form>
  </div>
</template>


<script setup>

  definePageMeta({
        layout: 'custom',
        middleware: ['auth']
  })


  const props = defineProps({
    listing: Object
  })


const {makes} = useCars()

const user = useSupabaseUser()


  const info = useState('addInfo', () => {
      return {
        make: '',
        model: '',
        year: '',
        miles: '',
        price: '',
        city: '',
        seats: '',
        features: '',
        description: '',
        image: null,
      }
  })

  const errorMessage = ref('')


  const handleChangeInput = (data,name) => {
    info.value[name] = data
  }


  const isButtonDisabled = computed(() => {
    for (let key in info.value) {
    console.log(info.value[key])
    if (!info.value[key]) return true;
  }
  return false;
  })


  const inputs = [
    {
      id: 1,
      title: `Model *`,
      name: 'model',
      placeholder: 'Civic'
    },
    {
      id: 2,
      title: `Year *`,
      name: 'year',
      placeholder: '2018'
    },
    {
      id: 3,
      title: `Price *`,
      name: 'price ',
      placeholder: '20000'
    },
    {
      id: 4,
      title: `Miles *`,
      name: 'miles',
      placeholder: '12,344'
    },
    {
      id: 5,
      title: `City *`,
      name: 'city',
      placeholder: 'Miami'
    },
    {
      id: 6,
      title: `Number of Seats *`,
      name: 'seats',
      placeholder: '5'
    },
    {
      id: 7,
      title: `Features*`,
      name: 'features',
      placeholder: 'Leather Interior,No accidents'
    },
  ]

  async function handleSubmit() {
    const body = {
        ...info.value,
        features: info.value.features.split(', '),
        numberOfSeats: parseInt(info.value.seats),
        miles: parseInt(info.value.miles),
        price: parseInt(info.value.price),
        name: `${info.value.name} ${info.value.model}`,
        listerId: user.value.id
    }

    delete body.seats;

    try {
      const response = await $fetch('/api/car/listings', {
        method: 'post',
      })

      navigateTo('/profile/listings')
    }

    catch (err) {
      console.log(err)
      errorMessage.value = err.statusMessage
    }
  }

</script>