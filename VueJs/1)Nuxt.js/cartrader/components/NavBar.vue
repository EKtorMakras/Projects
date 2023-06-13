<template>
    <!-- Navbar -->
    <header class="sticky top-0 z-50 flex justify-between items-center space-x-1 border-b bg-white px-4 py-6 shadow-md">
      <NuxtLink to="/" class="text-2xl font-mono">
        cartrader
      </NuxtLink>
      <div v-if="user" class="flex">
        <NuxtLink to="/profile/listings" class="mr-5">
            Profile
        </NuxtLink>
        <p class="cursor-pointer" @click="logout">Logout</p>
      </div>
      <div v-else>
        <NuxtLink to="/login">
          Login
        </NuxtLink>
      </div>
    </header>
</template>

<script setup>

  const user = useSupabaseUser()
  const supabase = useSupabaseClient()

  const logout = async () => {

    // 1)make user.value = null
    user.value = null

    // 2)Remove jwt token from Cookies

    const { error } = supabase.auth.signOut()  //There is a bug in supabase/nuxt3 module otherwise this is all we need 

    try {
      await $fetch('/api/_supabase/session', {
      method: 'POST',
      body: {
        event: 'SIGNED_OUT',
        session: null
      }
    })
    }
    catch (err) {
      return console.log(err)
   }

    // 3)Navigate to home page
    navigateTo('/')
  }
</script>
