const state = {
    userName:''
  }
  const mutations = {
    changeuserName(state, data) {
      state.userName = data
    },
  }
  export default {
    state,
    mutations
  }
  