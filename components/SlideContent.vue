<template lang="pug">
.container
  .info
    .parent
      h4 {{slideInfo.title}}
      p {{slideInfo.description}}
  .img-bg(:style="'background-image:url('+slideInfo.img+')'")
</template>

<script>
export default {
  name: 'SlideContent',
  props: ['slideInfo'],
}
</script>

<style scoped>
.container {
  @apply min-w-full min-h-full flex-col-reverse justify-between sm:flex-row flex justify-center;
}
.info {
  @apply w-full h-1/2 pb-10 pt-8 sm:py-0 sm:h-auto sm:w-1/2;
}
.parent {
  @apply flex flex-col justify-center h-full px-5 lg:pl-20 sm:pl-12 sm:pr-10 gap-6;
}
.parent h4 {
  @apply text-2xl lg:text-7xl md:text-5xl sm:text-5xl text-albescent font-DavidLibre font-normal m-0;
}
.parent p {
  @apply text-albescent font-normal text-xs md:text-sm;
}
.img-bg{
  @apply sm:w-1/2 sm:h-auto h-96 w-full bg-cover bg-center;
}
</style>
