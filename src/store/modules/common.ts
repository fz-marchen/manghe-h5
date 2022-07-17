// import { loginPassword } from '/@/api';
// import { useCookies } from '@vueuse/integrations/useCookies';
import { defineStore } from 'pinia';
// import { watch } from 'vue';
// import { AnyObject } from '/#/global';

// const { VITE_TOKEN_KEY } = import.meta.env;
// const token = useCookies().get(VITE_TOKEN_KEY as string);

interface StoreUser {
  platform: string;
  user: Object;
}

export const useCommonStore = defineStore({
  id: 'common',
  state: (): StoreUser => ({
    // token: token,
    platform: '',
    user: {},
  }),
  getters: {
    token(state): any {
      return state.user.token;
    },
  },
  actions: {
    setPlatform(platform: string) {
      this.platform = platform ? platform : '';
    },

    setUser(user: string) {
      this.user = user ? user : '';
    },
  },
});
