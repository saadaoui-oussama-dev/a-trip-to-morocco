<template lang="pug">
.slide
  img(:src="slideInfo.img")
  .content
    p.feedback {{slideInfo.feedback}}
    p.writer {{slideInfo.writer}}

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
img {
  @apply px-4 lg:px-16 sm:px-12;
}
.content {
  @apply flex flex-col gap-4 items-center;
}
p {
  @apply text-center text-xs;
}
.writer {
  @apply text-stone;
}
</style>
