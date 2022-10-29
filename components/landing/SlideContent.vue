<template lang="pug">
.slide-content
  .info
    .parent
      h4 {{ slideInfo.title }}
      p {{ slideInfo.description }}
  .img-bg(:style="`background-image: url('${slideInfo.img}')`")
</template>

<script>
export default {
  name: 'SlideContent',
  props: ['slideInfo'],
}
</script>

<style scoped>
.slide-content {
  @apply min-w-full h-full flex-col-reverse sm:flex-row flex bg-teal;
  background-image: url('~/assets/images/noise-teal.png');
}
.info {
  @apply w-full h-1/2 pb-10 pt-8 sm:py-0 sm:h-auto sm:w-1/2;
}
.parent {
  @apply flex flex-col justify-center h-full px-5 lg:pl-20 sm:pl-12 sm:pr-10 gap-6;
}
.parent h4 {
  @apply text-2xl sm:text-5xl md:text-5xl lg:text-7xl text-albescent font-DavidLibre font-normal m-0;
}
.parent p {
  @apply text-albescent font-normal text-xs md:text-sm;
}
.img-bg {
  @apply w-full sm:w-1/2 h-96 sm:h-full bg-cover bg-center;
}
</style>
