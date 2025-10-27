<template>
  <div class="rounded shadow mt-20">
    <div>
      <CarMessageCard />
    </div>
  </div>
</template>


<script setup>

  definePageMeta({
      layout: 'custom',
      middleware: ['auth']
  })


</script>