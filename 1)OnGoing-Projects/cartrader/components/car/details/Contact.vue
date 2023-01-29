<template>
  <div class="mt-10">
      <div class="flex w-[400px] flex-col justify-between gap-6">
        <input type="text" class="border p-1" placeholder="Name">
        <input type="email" class="border p-1" placeholder="Email">
        <input type="text" class="border p-1" placeholder="Phone">


        <div class="flex  w-[400px]">
          <textarea class="border p-1 w-full" placeholder="Message"></textarea>
        </div>

        <button type="submit" class="bg-blue-400 text-white px-10 py-3 rounded">Submit</button>
      </div>
    </div>
</template>


<script setup></script>