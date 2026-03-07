import Vue from 'vue'
import Vuex from 'vuex'

import Localbase from 'localbase'
let db = new Localbase('db')
db.config.debug = false


Vue.use(Vuex)

export default new Vuex.Store({

  state: {

    appTitle: process.env.VUE_APP_TITLE,

    search: null,

    sorting: false,

    tasks: [],

    snackbar: {
      show: false,
      text: '',
      color: '',
      timeout: ''
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
    },

    // Sorting
    sorting(state) {
      return state.sorting
    }
  },

  mutations: {

    // Tasks
    addTask(state, newTask) {
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

    setTasks(state, tasks) {
      state.tasks = tasks
    },


    // Search
    updateSearch(state, payload) {
      state.search = payload
    },


    // Sorting
    toggleSorting(state) {
      state.sorting =!state.sorting
    },


    // Snackbar
    showSnackbar(state, payload) {
      clearTimeout(state.snackbar.timeout)
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

      state.snackbar.timeout = setTimeout(() => {
        state.snackbar.show = false
        state.snackbar.text = ''
      }, 2500)
    },

    closeSnackbar(state) {
      state.snackbar.show = false
    },
  },

  actions: {

    // Tasks
    addTask(context, payload) {

      const newTask = {
        id: Date.now(),
        title: payload.taskTitle,
        done: false,
        dueDate: null
      }

      // Add task to indexedDB
      db.collection('tasks').add(newTask).then(() => {
        context.commit('addTask', newTask)
          context.commit('showSnackbar',payload)        
      })
    },

    deleteTask(context, payload) {
      db.collection('tasks').doc({id: payload.id}).delete()
        .then(() => {
          context.commit('deleteTask', payload)
          context.commit('showSnackbar',payload)
        })
    },

    editTask(context, payload) {
      
      db.collection('tasks').doc({id: payload.id}).update({
        title: payload.title
      }).then(() => {
        context.commit('editTask', payload)
        context.commit('showSnackbar',payload)
      })
    },

    doneTask({state, commit}, id) {
      const selectedTask = state.tasks.find(task => task.id === id)
      db.collection('tasks').doc({ id: id }).update({
        done: !selectedTask.done
      }).then(() => {
        commit('doneTask', id)
      })
    },

    updateDate(context, payload) {
      console.log(payload)
      db.collection('tasks').doc({id: payload.id}).update({
        dueDate: payload.dueDate
      }).then(() => {
        context.commit('updateDate', payload)
      context.commit('showSnackbar',payload)
      })
    },

    setTasks(context, tasks) {
      db.collection('tasks').set(tasks)
      context.commit('setTasks', tasks)
    },

    getTasks(context) {
      db.collection('tasks').get().then(tasks => {
        context.commit('setTasks', tasks)
      })
    },

    // Search
    updateSearch(context, payload) {
      context.commit('updateSearch', payload)
    },


    // Sorting
    toggleSorting(context) {
      context.commit('toggleSorting')
    },


    // Snackbar
    closeSnackbar(context) {
      context.commit('closeSnackbar')
    },

    
  }
})
