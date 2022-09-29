<template lang="pug">
.gallery
  .content
    h1 Our Gallery
    .columns
      .group(v-for="(group, index) in $store.getters['gallery/GET_GALLERY']" :key="index")
        figure.bg-cover.bg-center.m-0(
          v-for="(image, index) in group" :key="'image' + index"
          :style="`background-image: url('${image.url}'); grid-area: ${image.coords};`"
        )
</template>

<script>
export default {
  name: 'GalleryComponent',
}
</script>

<style scoped>
.gallery {
  @apply w-full px-2 flex justify-center bg-kashmir;
  background-image: url(~/assets/noise-kashmir.svg);
  @apply sm:px-6 lg:px-10;
}
.content {
  @apply w-full max-w-6xl mt-10 pb-4;
  @apply sm:mt-16 md:mt-20 sm:pb-8 md:pb-12;
}
h1 {
  @apply mb-4 text-4xl text-albescent;
  @apply sm:mb-6 sm:text-6xl md:mb-8 lg:text-7xl xl:text-8xl;
}
.columns {
  @apply grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5;
}
.group {
  @apply grid grid-cols-2 grid-rows-3 gap-3 md:gap-5;
  grid-template-rows: repeat(3, minmax(0, 9rem));
}
</style>
