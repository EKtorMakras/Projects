<template>
  <div class="container mx-auto h-screen">
    <div class="flex justify-center items-center h-full">
        <div class="flex flex-col w-[80vw]">

          <!-- Single Accordion -->
          <div 
          class="accordion p-4 flex flex-col"
          :class="{'bg-gray-100': isOpen}"
          >
            <div class="flex items-center gap-3 py-3 cursor-pointer mb-4" @click="toggleContent">
              <h1 class="accordion-title uppercase text-slate-500 font-bold">Historic Event</h1>
              <font-awesome-icon :icon="icon" class=" text-slate-500"/>
            </div>
            <transition 
              name="content"
              @enter="enter"
              @after-enter="after-enter"
              @leave="leave"
            >
              <div class="content" v-show="isOpen">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis excepturi ea corrupti reprehenderit sint. Obcaecati excepturi ad maiores ipsa accusantium hic ea animi corrupti explicabo ducimus aliquid, quidem id eligendi!
                </p>
              </div>
            </transition>
          </div>


        </div>
    </div>
  </div>
</template>


<script setup>

const isOpen = ref(true)

const icon = computed(() =>
{
  return `fa-solid fa-chevron-${isOpen.value ? 'up' : 'down'}`
})


const toggleContent = () =>
{
  isOpen.value = !isOpen.value
  console.log(isOpen.value)
}

</script>


<style>
  /* .hidden {
    transform: scaleY(0);
  } */

  .content{
    transition: transform 1s ease;
  }

  .content-enter-from,.content-leave-to {
    transform: scaleY(0);
  }

  .content-enter-active {
    transition: transform .2s ease-in-out;
  }
</style>