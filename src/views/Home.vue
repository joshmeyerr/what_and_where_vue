<template>
  <div class="home">
    <!-- Question Area -->
    <div class="question-area">
      <div class="bg-gray-200 flex h-96 justify-center items-center">
        <div class="question text-xl">Welcome Blah Blah</div>
        <div class="down-arrow">>>></div>
      </div>
    </div>

    <!-- Photo Area -->
    <div class="photo-area w-full">
      <div class="photo-grid">
        <transition-group appear name="fade">
          <Observe
            v-for="(item, index) in pexelsArr"
            :key="index"
            :index="index"
            class="item"
            @onChange="onChange"
            :threshold="0.5"
          >
            <PhotoItem :src="pexelsArr[index]" />
          </Observe>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Observe from '../components/Observe.vue';
import PhotoItem from '../components/PhotoItem.vue';

export default {
  name: 'Home',
  data() {
    return {
      apiKey: '563492ad6f917000010000013b1b3452f00b42d88ee884421dcc2fbe',
      pexelsArr: [],
    };
  },
  components: {
    Observe,
    PhotoItem,
  },
  mounted() {
    this.getPexels();
  },
  methods: {
    async getPexels() {
      try {
        const res = await axios.get(
          'https://jmproxy.herokuapp.com/https://api.pexels.com/v1/search?query=food&per_page=50&size=large&orientation=square',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.apiKey,
            },
          },
        );

        // console.log(res.data.photos);
        const { photos } = res.data;
        photos.forEach((photo) => {
          this.pexelsArr.push(photo.src.large);
        });

        console.log(this.pexelsArr);
      } catch (error) {
        console.log(error);
      }
    },
    onChange(entry, unobserve) {
      if (entry.isIntersecting) {
        // console.log(entry.target.attributes.index.value);

        unobserve();
      }
    },
  },
};
</script>
<style lang="scss">
@mixin setDelay($stagger) {
  &:nth-child(#{$stagger}n) {
    animation-delay: 100ms;
    background-color: red;
  }
  &:nth-child(#{$stagger}n - 1) {
    animation-delay: 300ms;
    background-color: green;
  }
}
.photo-grid {
  // @include setDelay(4);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
.item {
  @include setDelay(2);
  // animation-name: fade-in-up;
  // animation: 2s fade;
  // height: 13rem;
  // width: 13rem;
}

.fade-enter-active {
  animation: 2s fade;
}
// .fade {
//   animation: 2s fade;
// }

@keyframes fade {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  to {
    opacity: 1;
    // transform: none;
  }
}
</style>
