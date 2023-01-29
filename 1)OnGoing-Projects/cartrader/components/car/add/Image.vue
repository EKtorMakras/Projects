<template>
  <div class="col-md-5 offset-md-1 mt-2 w-full">
    <label class="text-cyan-500 mb-1 text-sm">
      Image
    </label>
    <form class="mt-2">
        <div class="form-group">
          <div class="relative cursor-pointer">
            <input 
              type="file" 
              accept="image/*"
              class="absolute opacity-0 cursor-pointer"
              @change="onImageUpload"
            >
            <span class="cursor-pointer text-slate-600">Browse File</span>
          </div>
          <div 
              v-if="image.preview"
              class="border p-2 mt-3 w-56"
            >
            <img 
            :src="image.preview"
            class="img-fluid"
            >
         </div>
        </div>
    </form>
  </div>
</template>

<script setup>

  const emits = defineEmits(['changeInput'])

  const image = useState('carImage', () => {
    return {
      preview: null,
        image: null
      }
  })

const onImageUpload = (evt) =>
{
    const input = evt.target

  if (input.files) {
    const reader = new FileReader()
      
    reader.onload = (e) => {
      console.log(e)
        image.value.preview = e.target.result
    }
      image.value.image = input.files[0]
      reader.readAsDataURL(input.files[0])
      emits('changeInput',input.files[0],'image')
    }
  }

</script>