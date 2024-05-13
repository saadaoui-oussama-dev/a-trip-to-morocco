<template lang="pug">
.post
  .bg-img(:style="`background-image:url('${post.banner}')`")
  .content
    div(class="sm:hidden")
      h3.title.text-colored {{ title[0] }}
      p.description {{ description[0] }}
    div(class="hidden sm:block")
      h3.title.text-colored {{ title[1] }}
      p.description {{ description[1] }}
    .info
      //- .price-parent
      //-   span.text-colored.p-1 STARTING FROM
      //-   span.text-colored.price {{ post.price }}
      .ant-btn(@click="goTo") Learn More
        iconsArrowRight
</template>

<script>
export default {
  name: 'PostComponent',
  props: ['path', 'post', 'type'],
  data() {
    return {
      description: [],
      title: [],
    }
  },
  methods: {
    goTo() {
      let target = this.path ? this.path : ''
      this.$router.push(`${target}trips/${this.type}-${this.post.id}`)
    },
  },
  created() {
    this.title[0] =
      this.post.title.length > 40
        ? this.post.title.substring(0, 40).trim() + '...'
        : this.post.title
    this.title[1] =
      this.post.title.length > 60
        ? this.post.title.substring(0, 60).trim() + '...'
        : this.post.title
    this.description[0] =
      this.post.description.length > 100
        ? this.post.description.substring(0, 100).trim() + '...'
        : this.post.description
    this.description[1] =
      this.post.description.length > 180
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
  @apply px-2 max-h-80 overflow-hidden flex flex-col justify-between flex-grow;
}
.bg-img {
  @apply w-full h-36 sm:h-52 md:h-44 lg:h-60 bg-cover bg-center;
}
.img {
  @apply max-w-full opacity-0;
}
.title {
  @apply text-lg mb-2;
  @apply md:text-2xl sm:text-xl;
}
.description {
  @apply text-xs text-stone mb-1.5;
}
.info {
  @apply flex flex-col gap-2 lg:flex-row sm:gap-0 justify-between;
}
.price-parent {
  @apply flex items-end justify-between lg:justify-start gap-1;
}
.price-parent span:first-child {
  @apply text-xs;
}
.price {
  @apply text-2xl font-medium;
  @apply sm:text-2xl;
}
.ant-btn {
  @apply text-xs py-2 px-4 flex items-center justify-center text-albescent;
  @apply lg:justify-start lg:w-max lg:py-2 lg:px-6;
}
.w .content {
  @apply w-52 sm:w-72 lg:w-80;
}
</style>
