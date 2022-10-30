<template lang="pug">
.limited
  .content
    div(
      v-for="(image, index) in list"
      :key="index"
      :style="`background-image: url('${image}')`"
    )
</template>

<script>
export default {
	name: 'ImagesSectionComponent',
  props: ['list'],
}
</script>

<style scoped>
.limited {
  @apply bg-cotton;
  background-image: url(~/assets/images/noise-cotton.svg);
}
.content {
  @apply grid grid-cols-2 py-9 gap-1;
  @apply md:py-14 lg:py-16 sm:gap-2 lg:gap-3;
}
.content div {
  @apply h-60 bg-cover bg-center;
}
@media (min-width: 400px) {
  .content div {
    @apply h-80 sm:h-120 md:h-144 lg:h-160;
  }
}
</style>
