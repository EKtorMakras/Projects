<template>
    <div>
  
       <!-- Car Hero -->
        <CarDetailsHero :car="car"/>
  
        <!-- Car Attributes -->
        <CarDetailsAttributes :car="car"/>
  
        <!-- Car Description -->
        <CarDetailsDescription :car="car"/>
  
        <!-- Car Contact -->
        <CarDetailsContact :car="car"/>

    </div>
</template>


<script setup>

  const route = useRoute()

  const { toTitleCase } = useUtilities()

  const {data: car} = await useFetchCar(route.params.id)
console.log(car,route.params.id)

  useHead ({
      title: `${toTitleCase(route.params.name)}`
  })


  definePageMeta({
    layout: 'custom'
  })


 

</script>