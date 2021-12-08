export default {
  beforeMount(entry, binding) {
    const { options } = binding.value;
    const animatedScrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((singleEntry) => {
        if (singleEntry.isIntersecting) {
          if (singleEntry.boundingClientRect.y <= 0) {
            singleEntry.target.classList.add(binding.value.stateOne);
          } else {
            singleEntry.target.classList.add(binding.value.stateTwo);
          }
        } else if (!singleEntry.isIntersecting) {
          singleEntry.target.classList.remove(binding.value.stateOne);
          singleEntry.target.classList.remove(binding.value.stateTwo);
          // eslint-disable-next-line no-param-reassign
          singleEntry.target.style.opacity = 0;
        }
      });
    }, options);

    animatedScrollObserver.observe(entry, binding);
  },
};
