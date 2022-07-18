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
  _token: string;
}

export const useCommonStore = defineStore({
  id: 'common',
  state: (): StoreUser => ({
    // token: token,
    platform: '',
    user: {},
    _token: '',
  }),
  getters: {
    token(state): any {
      return state._token || localStorage.getItem('token');
    },
  },
  actions: {
    setPlatform(platform: string) {
      this.platform = platform ? platform : '';
    },

    setUser(user) {
      this.user = user ? user : '';
      this._token = user.token;
      localStorage.setItem('token', user.token);
    },
  },
});
