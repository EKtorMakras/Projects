import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {

    appTitle: process.env.VUE_APP_TITLE,

    search: null,

    tasks: [
      {
        id: 1,
        title: 'Wake up',
        done: false,
        dueDate: '2023-8-3'
      },
      {
        id: 2,
        title: 'Eat Breakfast',
        done: false,
        dueDate: '2023-10-18'
      },
      {
        id: 3,
        title: 'Eat bananas',
        done: false,
        dueDate:  null
      },
    ],

    snackbar: {
      show: false,
      text: '',
      color: ''
    }
  },

  getters: {
    // Tasks
    tasks(state) {
      if (!state.search) return state.tasks;

      return state.tasks.filter(task => {
         return task.title.toLowerCase().includes(state.search.toLowerCase())
      })
    },

    // Search
    search(state) {
      return state.search
    },

    // Snackbar
    snackbar(state) {
      return state.snackbar
    }
  },

  mutations: {

    // Tasks
    addTask(state, payload) {
      const newTask = {
        id: Date.now(),
        title: payload.taskTitle,
        done: false,
        dueDate: null
      }

      state.tasks.push(newTask)
    },


    doneTask(state, id) {
      const selectedTask = state.tasks.find(task => task.id === id)
      selectedTask.done = !selectedTask.done
    },


    deleteTask(state, payload) {
      state.tasks = state.tasks.filter(task => task.id !== payload.id)
    },


    editTask(state, payload) {
      const selectedTask = state.tasks.find(task => task.id === payload.id)
      selectedTask.title = payload.title
    },


    updateDate(state, payload) {
      const selectedTask = state.tasks.find(task => task.id === payload.id)
      selectedTask.dueDate = payload.dueDate
    },


    // Search
    updateSearch(state, payload) {
      state.search = payload
    },


    // Snackbar
    showSnackbar(state, payload) {
      let timeout = 0;

      if (state.snackbar.show) {
        state.snackbar.show = false
        timeout = 300
      }
      
      setTimeout(() => {
        state.snackbar.show = true
        state.snackbar.text = payload.snackbarText
        state.snackbar.color = payload.snackbarColor
      }, timeout);
    },

    closeSnackbar(state) {
      state.snackbar.show = false
    }
  },

  actions: {

    // Tasks
    addTask(context, payload) {
      context.commit('addTask', payload)
      context.commit('showSnackbar',payload)
    },

    deleteTask(context, payload) {
      context.commit('deleteTask', payload)
      context.commit('showSnackbar',payload)
    },

    editTask(context, payload) {
      context.commit('editTask', payload)
      context.commit('showSnackbar',payload)
    },

    doneTask(context, payload) {
      context.commit('doneTask', payload)
    },

    updateDate(context, payload) {
      context.commit('updateDate', payload)
      context.commit('showSnackbar',payload)
    },


    // Search
    updateSearch(context, payload) {
      context.commit('updateSearch', payload)
    },


    // Snackbar
    closeSnackbar(context) {
      context.commit('closeSnackbar')
    }
  }
})
