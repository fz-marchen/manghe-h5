// import { loginPassword } from '/@/api';
// import { useCookies } from '@vueuse/integrations/useCookies';
import { defineStore } from 'pinia';
// import { watch } from 'vue';
// import { AnyObject } from '/#/global';

// const { VITE_TOKEN_KEY } = import.meta.env;
// const token = useCookies().get(VITE_TOKEN_KEY as string);

interface StoreUser {
  _platform: string;
  user: Object;
  _token: string;
}

export const useCommonStore = defineStore({
  id: 'common',
  state: (): StoreUser => ({
    // token: token,
    _platform: '',
    user: {},
    _token: '',
  }),
  getters: {
    token(state): any {
      return state._token || localStorage.getItem('token');
    },
    platform(state): any {
      return state._platform || localStorage.getItem('platform');
    },
  },
  actions: {
    setPlatform(_platform: string) {
      this._platform = _platform ? _platform : '';

      console.log('_platform', _platform);
      localStorage.setItem('platform', _platform);
    },

    setUser(user) {
      this.user = user ? user : '';
      this._token = user.token;
      localStorage.setItem('token', user.token);
    },
  },
});
