export default {
  beforeMount(entry, binding) {
    let { options } = binding.value;
    const animatedScrollObserver = new IntersectionObserver((entries) => {
      options = 1;
      entries.forEach((singleEntry) => {
        if (singleEntry.isIntersecting) {
          singleEntry.target.classList.add(binding.value.class);
        } else {
          //   singleEntry.target.classList.remove(binding.value.class);
        }
      });
    }, options);

    animatedScrollObserver.observe(entry, binding);
  },
};
