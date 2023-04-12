import { defineStore } from 'pinia';
import { setItem, getItem } from "@/utils/storage";

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getItem("authorization") || "",
    }
  },
  getters: {

  },
  actions: {
    logout() {
      this.$patch({
        token: '',
      })
    },
    // async login(user, password) {
    //   const userData = await apiLogin(user, password)
    //   this.$patch({
    //     name: user,
    //     ...userData,
    //   })
    // },
    setToken(token) {
      this.token = token;
      setItem("authorization", 'Bearer ' + token)
    },
  },
})
