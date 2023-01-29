import Vuex from 'vuex'
import axios from 'axios'


const createStore = () => {
  
  return new Vuex.Store({


    state: {
      loadedPosts: []
      
    },


    mutations: {

      setPosts(state, posts) {
        state.loadedPosts = posts
      },

      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      
      editPost(state, editedPost)
      {
        const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id)

        state.loadedPosts[postIndex] = editedPost
      },
    }, 


    actions: {

      nuxtServerInit(vuexContext, context){

        const url = `${process.env.baseUrl}/posts.json`

        return axios.get(url)
          .then(res => {
            const postsArr = []

            for (const key in res.data) {
              postsArr.push({
                ...res.data[ key ],
                id: key
              })
            }

            vuexContext.commit('setPosts',postsArr)
          })
          .catch(err => context.err)
      },


      setPosts(vuexContext, payload) {
        vuexContext.commit('setPosts', payload)
      },


      addPost(vuexContext, post) {

        const createdPost = {
          ...post,
          updatedDate: new Date()
        }

        const url = `${process.env.baseUrl}/posts.json`

        return axios.post(url, createdPost)
          .then(res =>
          {
            vuexContext.commit('addPost', {
              ...createdPost,
              id: res.data.name
            })
        })
        .catch(e => console.log(e))
      },


      editPost(vuexContext, editedPost) {

        const createdPost = {
          ...editedPost,
          updatedDate: new Date()
        }

        const url = `${process.env.baseUrl}/posts/${createdPost.id}.json`

        return axios.put( url,createdPost)
          .then(res => {
        
          vuexContext.commit('editPost',createdPost)
        })
        .catch(e => console.log(e))
        },
    },


    getters: {

      loadedPosts(state) {
        return state.loadedPosts
      }
    }, 
  })
}

export default createStore