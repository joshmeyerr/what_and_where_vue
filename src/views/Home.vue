<template>
  <div class="home">
    <!-- Question Area -->
    <div class="question-area overflow-hidden m-4 shadow-lg rounded-lg">
      <div class="bg-gray-200 flex flex-col h-96 justify-center items-center">
        <LocationQuestion v-if="questionIndex === 0" />
      </div>
    </div>

    <!-- Photo Area -->
    <div class="photo-area w-full">
      <div class="photo-grid m-4">
        <PhotoItem
          class="item shadow-lg rounded-lg"
          v-scroll-observer="{
            stateOne: 'fade-top',
            stateTwo: 'fade-bottom',
            options: { threshold: 0.1 },
          }"
          v-for="(photo, index) in resArray"
          :key="index"
          :src="photo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PhotoItem from '../components/PhotoItem.vue';
// import ButtonIcon from '../components/ButtonIcon.vue';
import LocationQuestion from '../components/questions/LocationQuestion.vue';

export default {
  name: 'Home',
  data() {
    return {};
  },
  components: {
    PhotoItem,
    // ButtonIcon,
    LocationQuestion,
  },
  mounted() {
    this.getPexels();
  },
  computed: {
    ...mapState(['resArray', 'questionIndex']),
  },
  methods: {
    ...mapActions(['getPexels']),
  },
};
</script>
<style lang="scss">
@mixin setDelay($rowCount) {
  & > * {
    @for $i from 1 through $rowCount {
      &:nth-child(#{$rowCount}n + #{$i}) {
        animation-delay: $i * 110 + ms;
        // animation-delay: random(9) / 10 + s;
      }
    }
  }
}
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 0.5rem;

  $rowCount: 6;
  @include setDelay($rowCount);
}
.item {
  opacity: 0;
  animation-fill-mode: both;
}

.fade-top {
  animation: 1s fadeTop;
  animation-fill-mode: both;
}

.fade-bottom {
  animation: 1s fadeBottom;
  animation-fill-mode: both;
}

@keyframes fadeBottom {
  0% {
    opacity: 0;
    transform: translateY(2rem);
  }
  100% {
    opacity: 1;
    visibility: visible;
    transform: none;
  }
}
@keyframes fadeTop {
  0% {
    opacity: 0;
    transform: translateY(-2rem);
  }
  100% {
    opacity: 1;
    visibility: visible;
    transform: none;
  }
}
</style>
