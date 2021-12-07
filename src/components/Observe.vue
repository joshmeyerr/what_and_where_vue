<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'Observe',
  mounted() {
    const options = {
      root: this.root,
      threshold: this.threshold,
    };
    this.observe = new IntersectionObserver((entry) => {
      this.$emit('on-change', entry[0], this.unobserve);
    }, options);
    this.observe.observe(this.$el);
  },
};
</script>
<style></style>
