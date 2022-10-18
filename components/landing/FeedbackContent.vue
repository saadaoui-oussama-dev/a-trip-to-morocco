<template lang="pug">
.slide
  .img(:style="`background-image: url('${slideInfo.image}')`")
  div
    p {{ slideInfo.description }}
    p.text-stone.mb-0 {{ slideInfo.author }}
</template>

<script>
export default {
  name: 'feedbackContent',
  props: ['slideInfo'],
}
</script>

<style scoped>
.slide {
  @apply flex flex-col gap-10 items-center px-8 lg:px-12 sm:px-6;
}
.img {
  @apply bg-cover bg-center w-64 h-40 lg:w-80 lg:h-48;
}
p {
  @apply text-center text-xs;
}
</style>
