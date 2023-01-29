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

  const { makes } = useCars()

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

  const handleChangeInput = (data,name) => {
    info.value[name] = data
  }

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
      title: `Miles *`,
      name: 'miles',
      placeholder: '12,344'
    },
    {
      id: 4,
      title: `City *`,
      name: 'city',
      placeholder: 'Miami'
    },
    {
      id: 5,
      title: `Number of Seats *`,
      name: 'seats',
      placeholder: '5'
    },
    {
      id: 6,
      title: `Features*`,
      name: 'features',
      placeholder: 'Leather Interior,No accidents'
    },
  ]
</script>