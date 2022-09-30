<template lang="pug">
.container
  .info
    .parent
      h4 {{slideInfo.title}}
      p {{slideInfo.description}}
  .img-parent
    img(:src="slideInfo.img")
</template>

<script>
export default {
  name: 'SlideContent',
  props: ['slideInfo'],
}
</script>

<style scoped>
.container {
  @apply min-w-full flex-col-reverse sm:flex-row flex justify-center;
}
.img-parent{
  @apply max-h-96 sm:w-1/2 sm:max-h-full
}
img {
  @apply min-w-full;
}
.info {
  @apply w-full h-1/2 py-8 sm:py-0 sm:h-auto sm:w-1/2;
  background-image: url('../assets/bg-slider.png');
}
.parent {
  @apply flex flex-col justify-center h-full pl-12 pr-5 lg:pl-20 sm:pl-12 sm:pr-10 gap-6;
}
.parent h4 {
  @apply text-2xl lg:text-7xl md:text-5xl sm:text-5xl text-albescent font-DavidLibre font-normal m-0;
}
.parent p {
  @apply text-albescent font-normal text-xs md:text-sm;
}
</style>
