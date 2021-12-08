<template>
  <div>
    <i class="text-3xl" :class="iconClass"></i>
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
