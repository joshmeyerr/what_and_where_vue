/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    pexelsApi: '563492ad6f917000010000013b1b3452f00b42d88ee884421dcc2fbe',
    positionStackApi: 'e20b679c7dfd93c7c031fbdec6731af9',
    geoApifyApi: '30506b10d4594fd3a1e72329d95fec0e',
    herokuProxy: 'https://jmproxy.herokuapp.com/',

    questionIndex: 0,
    resArray: Array(25),

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
      location: {
        current: 'fas fa-globe-americas',
        destination: 'fas fa-plane',
      },
    },

    questionList: {
      location: 'First, lets get the location',
      category: 'Next, lets choose some categories',
      travel: 'Finally, how fare are you willing to travel?',
    },
    questionAnswers: {
      location: {
        searchString: '',
        coordinates: {
          latitude: '',
          longitude: '',
        },
        address: {
          street: '',
          city: '',
          state: '',
          zip: '',
        },
      },
    },

    locationAutocomplete: [],
    useCurrentLocation: true,
  },
  mutations: {
    updatePexels(state, payload) {
      for (let i = 0; i < payload.length; i++) {
        state.resArray[i] = payload[i].src.large;
      }
    },
    updateCoordinates(state, payload) {
      state.questionAnswers.location.coordinates.latitude = payload.latitude;
      state.questionAnswers.location.coordinates.longitude = payload.longitude;
    },
    updateAddress(state, payload) {
      state.questionAnswers.location.address.city = payload.locality;
      state.questionAnswers.location.address.state = payload.region_code;
    },
    toggleUseCurrentLocation(state) {
      state.useCurrentLocation = !state.useCurrentLocation;
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
    async destinationLocation({ commit, state, dispatch }, payload) {
      const punctuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
      let location = payload.replace(punctuation, '');
      location = location.replace(/\s+/g, '+');

      console.log(location);
      try {
        if (location) {
          const res = await axios.get(
            `${state.herokuProxy}https://api.geoapify.com/v1/geocode/autocomplete?text=${location}&filter=countrycode:us,ca&apiKey=${state.geoApifyApi}`,
            {
              headers: {},
            },
          );

          state.locationAutocomplete = res.data.features;
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
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
