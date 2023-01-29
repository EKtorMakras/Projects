<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <admin-post-form @submitForm="handleFormSubmit"/>
    </section>
  </div>
</template>

<script>
import AdminPostForm from '@/components/admin/AdminPostForm'

export default {

  components: {
    AdminPostForm
  },

  layout: 'admin',


  methods: {

    handleFormSubmit(post) {

      this.$store.dispatch('addPost', post)
        .then(() =>{
          this.$router.push('/admin')
        })
    }
  }
}
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>
