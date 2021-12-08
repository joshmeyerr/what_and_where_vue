<template>
  <div>
    <div class="text-3xl font-bold">{{ questionList.location }}</div>
    <div class="flex">
      <div class="flex flex-col m-12">
        <div class="text-xl">Current Location</div>
        <ButtonIcon class="mt-4" :iconClass="faOptions.location" @click="currentLocation" />
      </div>
      <div class="text-3xl font-black mt-12">OR</div>
      <div class="flex flex-col m-12">
        <div class="text-xl">Destination</div>
        <input class="mt-4" type="text" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import ButtonIcon from '../ButtonIcon.vue';

export default {
  name: 'Location',
  components: {
    ButtonIcon,
  },
  methods: {
    ...mapActions(['currentLocation']),
  },
  computed: {
    ...mapState(['questionList', 'faOptions']),
  },
};
</script>
<style lang=""></style>
