<template>
  <img :src="src" alt="" />
</template>
<script>
export default {
  props: {
    src: String,
  },
};
</script>
<style>
img {
  /* height: 100%;
  width: 100%; */
  object-fit: cover;
}
</style>
