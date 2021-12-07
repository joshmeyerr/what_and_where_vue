<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'Observe',
  data() {
    return {};
  },
  props: {
    root: String,
    threshold: Number,
    itemIndex: Number,
  },
  methods: {
    unobserve() {
      this.observe.unobserve(this.$el);
    },
  },
  mounted() {
    const options = {
      root: this.root,
      threshold: this.threshold,
    };
    this.observe = new IntersectionObserver((entry) => {
      this.$emit('onChange', entry[0], this.unobserve);
    }, options);
    this.observe.observe(this.$el);
  },
};
</script>
<style></style>
