<template lang="pug">
.container
  .info
    .parent
      h4 {{slideInfo.title}}
      p {{slideInfo.description}}
  img(:src="slideInfo.img" id="img" )
</template>

<script>
export default {
  name: 'SlideContent',
  props: ['slideInfo'],
}
</script>

<style scoped>
.container {
  @apply min-w-full flex-col sm:flex-row flex justify-center;
}
img {
  @apply w-full h-1/2 sm:h-auto sm:w-1/2;
}
.info {
  @apply w-full h-1/2 py-28 sm:py-0 sm:h-auto sm:w-1/2;
}
.parent {
  @apply flex flex-col justify-center h-full pl-12 pr-5 sm:pl-20 sm:pr-10 gap-6;
}
.parent h4 {
  @apply text-2xl lg:text-7xl md:text-5xl sm:text-5xl text-albescent font-DavidLibre font-normal m-0;
}
.parent p {
  @apply text-albescent font-normal text-xs md:text-sm;
}
</style>
