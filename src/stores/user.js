import { setItem, getItem, removeItem } from "@/utils/storage";
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getItem("authorization")
    }
  },
  actions: {
    setUser() {
      this.count++
    },
  },
})
