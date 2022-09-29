<template lang="pug">
.post
  .bg-img(:style="'background-image:url('+post.img+')'")
  .content
    div
      h3.title.text-colored {{ post.title }}
      p.description {{description }}
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
      description: null,
    }
  },
  methods: {
    fillter() {
      if (this.post.description.length > 200) {
        this.description = this.post.description.substring(0, 200) + '...'
      } else {
        this.description = this.post.description
      }
    },
  },
  created() {
    this.fillter()
  },
}
</script>

<style scoped>
.post {
  @apply flex flex-col gap-6;
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
  @apply text-lg font-medium;
  @apply sm:text-2xl;
}
.ant-btn {
  @apply w-max text-xs py-1 px-4 flex items-center text-albescent;
  @apply sm:py-2 sm:px-6;
}
</style>
