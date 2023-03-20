import { setItem, getItem, removeItem } from "@/utils/storage";
import { defineStore } from 'pinia';

//state 是 store 的数据 (data)，getters 是 store 的计算属性 (computed)，而 actions 则是方法 (methods)
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getItem("authorization")
    }
  },
  getters: {
    token_: (state) => state.token,
  },
  actions: {
    setUser() {
      this.count++
    },
  },
})
