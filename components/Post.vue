<template lang="pug">
.post
  img.img(:src="post.img")
  .content
    h3.title(:class="color.text") {{post.title}}
    p.description {{post.description}}
    .info
      .price-parent
        span STARTING FROM
        span.price ${{post.price}}
      NuxtLink.ant-btn(:to="post.url" :class="color.btn") Learn More
        iconsArrowRight
  
</template>

<script>
export default {
  name: 'postComponent',
  props: ['post', 'color'],
}
</script>

<style scoped>
.content {
  @apply px-2 max-h-80 sm:max-w-sm;
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
