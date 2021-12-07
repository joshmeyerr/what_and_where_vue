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
        <!-- <transition-group appear name="fade"> -->
        <!-- <div class="item" v-for="(item, index) in 30" :key="index"></div> -->
        <!-- <div
          class="item"
          v-VueAnimateOnScroll="'fade'"
          v-for="(item, index) in 50"
          :key="index"
        ></div> -->
        <!-- <div class="item" v-VueAnimateOnScroll="2"></div> -->
        <!-- </transition-group> -->
        <Observe><PhotoItem /></Observe>
      </div>
    </div>
  </div>
</template>

<script>
import Observe from '../components/Observe.vue';
import PhotoItem from '../components/PhotoItem.vue';

export default {
  name: 'Home',
  components: {
    Observe,
    PhotoItem,
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
  height: 13rem;
  // width: 13rem;
}

// .fade-enter-active {
//   animation: 2s fade;
// }
.fade {
  animation: 2s fade;
}

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
