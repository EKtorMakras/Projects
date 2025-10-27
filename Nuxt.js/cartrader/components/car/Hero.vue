<template>
  <div
      class="relative h-screen w-100 bg-no-repeat bg-cover bg-bottom bg-[url('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')]">

      <div class="z-10 absolute w-full h-full flex justify-center items-center">
        <div class="text-center w-1/2 flex flex-col items-center">
          <h1 class="text-7xl font-serif mb-10 text-white">Find Your Drive</h1>

          <!-- Home Search Bar -->
          <CarSearchBar />

        </div>
      </div>
      <div class="z-1 absolute w-full h-full bg-black opacity-50"></div>
    </div>
</template>


<script setup></script>