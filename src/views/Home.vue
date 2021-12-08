<template>
  <div class="home">
    <!-- Question Area -->
    <div class="question-area">
      <div class="bg-gray-200 flex flex-col h-96 justify-center items-center">
        <div class="question text-xl">Welcome Blah Blah</div>
        <div class="icon-group flex">
          <ButtonIcon
            v-for="(icon, index) in faCategoryOptions"
            :key="index"
            class="m-4"
            :iconClass="icon.class"
          />
        </div>
      </div>
    </div>

    <!-- Photo Area -->
    <div class="photo-area w-full">
      <div class="photo-grid">
        <PhotoItem
          v-scroll-observer="{
            stateOne: 'fade-top',
            stateTwo: 'fade-bottom',
            options: { threshold: 0.1 },
          }"
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
import ButtonIcon from '../components/ButtonIcon.vue';

export default {
  name: 'Home',
  data() {
    return {
      apiKey: '563492ad6f917000010000013b1b3452f00b42d88ee884421dcc2fbe',
      pexelsArr: [],
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
    };
  },
  components: {
    PhotoItem,
    ButtonIcon,
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

        const { photos } = res.data;
        photos.forEach((photo) => {
          this.pexelsArr.push({ src: photo.src.large, show: false });
        });
      } catch (error) {
        console.log(error);
      }
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
        // animation-delay: random(9) / 10 + s;
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
