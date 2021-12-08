/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    pexelsApi: '563492ad6f917000010000013b1b3452f00b42d88ee884421dcc2fbe',
    positionStackApi: 'e20b679c7dfd93c7c031fbdec6731af9',
    herokuProxy: 'https://jmproxy.herokuapp.com/',

    faOptions: {
      categories: [
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
      location: 'fas fa-globe-americas',
    },
    questionList: {
      location: 'First, lets get your location',
      category: 'Next, lets choose some categories',
      travel: 'Finally, how fare are you willing to travel?',
    },
    questionIndex: 0,
    resArray: Array(25),
    location: {
      coordinates: {
        latitude: null,
        longitude: null,
      },
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
      },
    },
  },
  mutations: {
    updatePexels(state, result) {
      for (let i = 0; i < result.length; i++) {
        state.resArray[i] = result[i].src.large;
      }
      console.log(result);
    },
    updateCoordinates(state, coordinates) {
      state.location.coordinates.latitude = coordinates.latitude;
      state.location.coordinates.longitude = coordinates.longitude;
    },
    updateAddress(state, result) {
      state.location.address.city = result.locality;
      state.location.address.state = result.region_code;
    },
  },
  actions: {
    async getPexels({ commit, state, dispatch }) {
      // try {
      //   const res = await axios.get(
      //     'https://jmproxy.herokuapp.com/https://api.pexels.com/v1/search?query=food&per_page=25&size=large&orientation=square',
      //     {
      //       headers: {
      //         'Content-Type': 'application/json',
      //         Authorization: this.pexelsApi,
      //       },
      //     },
      //   );
      //   const { photos } = res.data;
      //   commit('updatePexels', photos);
      // } catch (error) {
      //   console.log(error);
      // }
    },
    async currentLocation({ commit, state, dispatch }) {
      const success = (position) => {
        const coordinates = position.coords;
        commit('updateCoordinates', coordinates);
        dispatch('positionReverse');
      };

      const error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        console.log(error);
      };

      await navigator.geolocation.getCurrentPosition(success, error);
    },
    async positionForward({ commit, state, dispatch }, query) {
      // try {
      //   const res = await axios.get(
      //     `${state.herokuProxy}http://api.positionstack.com/v1/forward?access_key=${state.positionStackApi}&query=${query}`,
      //   );
      // } catch (error) {
      //   console.log(error);
      // }
    },
    async positionReverse({ commit, state, dispatch }) {
      const { latitude, longitude } = state.location.coordinates;
      console.log(latitude, longitude);
      try {
        const res = await axios.get(
          `${state.herokuProxy}http://api.positionstack.com/v1/reverse?access_key=${state.positionStackApi}&query=${latitude},${longitude}`,
        );
        commit('updateAddress', res.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
