<template>
  <div class="admin-post-page">
    <section class="update-form">
      <admin-post-form :post="loadedPost" @submitForm="handleFormSubmit"/>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import AdminPostForm from '@/components/admin/AdminPostForm'

export default {
  components: {
    AdminPostForm
  },


  layout: 'admin',


  asyncData(context) {

    const url = `${process.env.baseUrl}/posts/${context.params.postid}.json`

    return axios.get(url)
      .then(res => {
        return {
          loadedPost: {
            ...res.data,
            id: context.params.postid
          }
        }
      })
      .catch(e => context.error(e))
  },


  methods: {

    handleFormSubmit(editedPost) {

      this.$store.dispatch('editPost', editedPost)
        .then(() =>{
          this.$router.push('/admin')
        })
    }
  }
}



</script>

<style>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
