<template lang="pug">
.post
  .bg-img(:style="'background-image:url('+post.img+')'")
  .content
    div
      h3.title.text-colored {{ post.title }}
      p.description(class="sm:hidden") {{ description[0] }}
      p.description(class="hidden sm:block") {{ description[1] }}
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
  data() {
    return {
      description: [],
    }
  },
  created() {
    this.description[0] = this.post.description.length > 100
      ? this.post.description.substring(0, 100).trim() + '...'
      : this.post.description
    this.description[1] = this.post.description.length > 180
      ? this.post.description.substring(0, 180).trim() + '...'
      : this.post.description
  },
}
</script>

<style scoped>
.post {
  @apply flex flex-col gap-2 sm:gap-4;
}
.content {
  @apply px-2 max-h-80 sm:max-w-sm overflow-hidden flex flex-col justify-between flex-grow;
}
.bg-img {
  @apply w-full h-36 lg:h-60 md:h-44 sm:h-64 bg-cover bg-center;
}
.img {
  @apply max-w-full opacity-0;
}
.title {
  @apply text-lg mb-2;
  @apply md:text-2xl sm:text-xl;
}
.description {
  @apply text-xs text-stone mb-1;
}
.info {
  @apply flex flex-col gap-2 sm:flex-row sm:gap-0 justify-between;
}
.price-parent {
  @apply flex items-end justify-between sm:justify-start gap-1;
}
.price-parent span:first-child {
  @apply text-xs;
}
.price {
  @apply text-2xl font-medium;
  @apply sm:text-2xl;
}
.ant-btn {
  @apply  text-xs py-2 px-4 flex items-center justify-center text-albescent;
  @apply sm:justify-start sm:w-max sm:py-2 sm:px-6;
}
</style>
