<template>
  <div class="flex flex-col w-full mt-2">
    <label for="" class="text-cyan-500 mb-1 text-sm">{{ title }}</label>
    <textarea 
      type="text"
      class="p-2 border w-100 rounded text-slate-600 focus-visible:outline-slate-300"
      :placeholder="placeholder"
      v-model="state"
      :name="name"
      @input="onChange"
    ></textarea>
  </div>
</template>


<script setup>
 
  const props = defineProps({
    title: String,
    name: String,
    placeholder: String
  })

  const state = ref('')
  const emits = defineEmits (['changeInput'])

  const onChange = () => {
      emits('changeInput',state.value,props.name)
  }
 
</script>