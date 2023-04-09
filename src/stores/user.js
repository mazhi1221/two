import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: null,
    }
  },
  getters: {
    doubleCount: (state) => state.counter * 2,
    doublePlusOne() {
      return this.doubleCount + 1
    },
  },
  actions: {
    setUser() {
      this.count++
    },
  },
})
