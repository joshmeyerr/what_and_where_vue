/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    faCategoryOptions: [
      {
        class: 'fas fa-utensils',
        value: 'food',
      },
      {
        class: 'fas fa-glass-martini-alt',
        value: 'drinks',
      },
      {
        class: 'fas fa-drum',
        value: 'concert',
      },
      {
        class: 'fas fa-film',
        value: 'movies',
      },
      {
        class: 'fas fa-hotel',
        value: 'hotel',
      },
    ],
    pexelsApi: '563492ad6f917000010000013b1b3452f00b42d88ee884421dcc2fbe',
    resArray: Array(25),
  },
  mutations: {
    updatePexels(state, result) {
      for (let i = 0; i < result.length; i++) {
        state.resArray[i] = result[i].src.large;
      }
      console.log(result);
    },
  },
  actions: {
    async getPexels({ commit, state, dispatch }) {
      try {
        const res = await axios.get(
          'https://jmproxy.herokuapp.com/https://api.pexels.com/v1/search?query=food&per_page=25&size=large&orientation=square',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.pexelsApi,
            },
          },
        );

        const { photos } = res.data;

        commit('updatePexels', photos);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
