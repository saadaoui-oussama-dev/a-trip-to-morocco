<template lang="pug">
.city
  .image(:style="`background-image: url('${city.img}');`")
  .centered
    iconsArrowDown(color="#F7EBDB")
    h3 {{ city.name }}
    h1 {{ city.title }}
    p {{ city.description }}
    .ant-btn(@click="$router.push(`/cities/${city.id}`)") Learn More
</template>

<script>
export default {
  name: 'CityComponent',
  props: ['city'],
}
</script>

<style scoped>
.city {
  @apply relative min-h-184 flex flex-col sm:block sm:min-h-152 lg:min-h-184 xl:min-h-248;
}
.image {
  @apply w-full h-full sm:absolute bg-cover bg-center;
}
.centered {
  background-image: url('~/assets/images/zellige.svg');
  @apply w-full h-3/5 py-8 sm:py-0 sm:h-full sm:bg-none bg-blend-overlay sm:absolute bg-heath sm:bg-city flex justify-center items-center flex-col sm:opacity-0 sm:hover:opacity-100;
  transition: opacity 0.5s, background-color 0.5s;
}
.centered > *:not(svg, .ant-btn) {
  @apply text-albescent text-center;
}
svg {
  @apply mb-2 sm:mb-1;
}
h3 {
  @apply mb-0 px-5 text-xl;
  @apply md:mb-2 md:px-10;
}
h1 {
  @apply mb-5 px-5 text-base sm:text-3xl;
  @apply md:px-10;
}
p {
  @apply mb-4 px-8 sm:px-16;
  font-size: 11px;
}
.ant-btn {
  @apply py-2 px-6 bg-albescent text-heath text-xs;
}
.ant-btn:hover,
.ant-btn:focus,
.ant-btn:active {
  @apply text-heath;
  background: #e7dfd4;
}
</style>
