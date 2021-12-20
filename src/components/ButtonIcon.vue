<template>
  <div class="cursor-pointer">
    <i class="text-4xl" :class="iconClass"></i>
  </div>
</template>
<script>
export default {
  name: 'ButtonIcon',
  props: {
    iconClass: String,
  },
};
</script>
<style lang=""></style>
