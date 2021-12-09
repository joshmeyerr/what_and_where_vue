<template>
  <div>
    <div class="text-3xl font-bold">{{ questionList.location }}</div>
    <div class="parent-cont flex justify-center items-center">
      <!-- Button Current -->
      <transition name="exit">
        <div
          v-if="useCurrentLocation"
          class="flex flex-col border-solid border-4 border-black 
          cursor-pointer rounded-lg
          m-12 p-8 "
          @click="currentLocation"
        >
          <div class="text-xl">Where you are now</div>
          <ButtonIcon
            class="mt-4"
            :iconClass="faOptions.location.current"
            @click="currentLocation"
          />
        </div>
      </transition>

      <!-- OR -->
      <transition name="exit">
        <div v-if="useCurrentLocation" class="text-4xl font-black">OR</div>
      </transition>

      <!-- Button Destination -->
      <transition name="exit">
        <div
          v-if="useCurrentLocation"
          class="flex flex-col border-solid border-4 border-black cursor-pointer rounded-lg m-12 p-8"
          @click="toggleUseCurrentLocation"
        >
          <div class="text-xl">Where you are going</div>
          <ButtonIcon class="mt-4" :iconClass="faOptions.location.destination" />
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import ButtonIcon from '../ButtonIcon.vue';

export default {
  name: 'Location',
  components: {
    ButtonIcon,
  },
  methods: {
    ...mapActions(['currentLocation', 'destinationLocation']),
    ...mapMutations(['toggleUseCurrentLocation']),
  },
  computed: {
    ...mapState([
      'questionList',
      'questionAnswers',
      'locationAutocomplete',
      'useCurrentLocation',
      'faOptions',
    ]),
  },
};
</script>
<style lang="scss">
@mixin offSetDelay() {
  @for $i from 1 through 3 {
    &:nth-child(#{$i}) {
      animation-delay: $i * 190 + ms;
    }
  }
}

.exit-leave-active {
  @include offSetDelay();
  animation: 2s exitView cubic-bezier(0.64, 0.01, 0, 1);
  animation-fill-mode: both;
  // animation-delay: 3s;
}

@keyframes exitView {
  0% {
    transform: none;
  }
  75% {
    // opacity: 0;
  }
  100% {
    transform: translateY(30vh);
    // opacity: 0;
  }
}
</style>

        <!-- <input
          class="mt-4"
          type="text"
          v-model="questionAnswers.location.searchString"
          @keyup="destinationLocation(questionAnswers.location.searchString)"
        />
        <ul>
          <li v-for="(location, index) in locationAutocomplete" :key="index">
            {{ location.properties.address_line1 }}, {{ location.properties.city }},
            {{ location.properties.state_code }}
          </li>
        </ul> -->