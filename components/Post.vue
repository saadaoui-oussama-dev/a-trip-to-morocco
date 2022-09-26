<template lang="pug">
.post
  img.img(:src="post.img")
  .content
    h3.title.text-colored {{ post.title }}
    p.description {{ post.description }}
    .info
      .price-parent
        span.text-colored STARTING FROM
        span.text-colored.price ${{ post.price }}
      NuxtLink.ant-btn(:to="post.url") Learn More
        iconsArrowRight
</template>

<script>
export default {
  name: 'PostComponent',
  props: ['post'],
}
</script>

<style scoped>
.content {
  @apply px-2 max-h-80 sm:max-w-sm overflow-hidden;
}
.img {
  @apply w-full mb-6;
}
.title {
  @apply text-2xl mb-2;
  @apply md:text-2xl sm:text-xl;
}
.description {
  @apply text-xs text-stone mb-3;
}
.info {
  @apply flex justify-between;
}
.price-parent {
  @apply flex items-end gap-1;
}
.price-parent span:first-child {
  @apply text-xs;
}
.price {
  @apply text-xl font-medium;
  @apply sm:text-2xl;
}
.ant-btn {
  @apply w-max text-xs py-1 px-4 flex items-center text-albescent;
  @apply sm:py-2 sm:px-6;
}
</style>
