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
      <div ref="photoGrid" class="photo-grid">
        <PhotoItem
          v-observe="{ class: 'fade-bottom', options: { threshold: 0.5 } }"
          v-for="(photo, index) in pexelsArr"
          :key="index"
          :photoIndex="index"
          class="item"
          :src="photo.src"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import PhotoItem from '../components/PhotoItem.vue';

export default {
  name: 'Home',
  data() {
    return {
      apiKey: '563492ad6f917000010000013b1b3452f00b42d88ee884421dcc2fbe',
      pexelsArr: [],
      windowWidth: window.innerWidth,
    };
  },
  components: {
    PhotoItem,
  },
  mounted() {
    this.getPexels();
    this.parsePhotoWidth();
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

        const { photos } = res.data;
        photos.forEach((photo) => {
          this.pexelsArr.push({ src: photo.src.large, show: false });
        });
      } catch (error) {
        console.log(error);
      }
    },
    parsePhotoWidth() {
      // eslint-disable-next-line no-restricted-globals
      // console.log(this.windowWidth / 200);

      const photoCount = Math.floor(this.windowWidth / 200);
      console.log(photoCount);
      console.log(this.$refs.photoGrid);
      this.$refs.photoGrid.style.rowCount = photoCount;
    },
  },
};
</script>
<style lang="scss">
@mixin setDelay($rowCount) {
  & > * {
    @for $i from 1 through $rowCount {
      &:nth-child(#{$rowCount}n + #{$i}) {
        animation-delay: $i * 110 + ms;
      }
    }
  }
}
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.5rem;

  $rowCount: 6;
  @include setDelay($rowCount);
}
.item {
  // $rowCount: 1;
  // @include setDelay($rowCount);
  // animation-name: fade-in-up;
  // animation: 2s fade;
  // height: 13rem;
  // width: 13rem;
  opacity: 0;
}

// .fade-enter-active {
//   animation: 2s fade;
// }
.fade-bottom {
  animation: 2s fade;
}
.visible {
  // opacity: 1;
}

@keyframes fade {
  0% {
    opacity: 0;
    transform: translateY(15rem);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
</style>
