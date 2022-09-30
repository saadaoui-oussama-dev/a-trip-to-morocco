<template lang="pug">
.banner
  .content
    div
      h1 Explore a colorful Morocco
      p.text We are experts at creating a Moroccan experience perfectly tailored to our guests needs. These are some of our most popular itineraries, and they may be customized to the utmost extent of your imaginations.
      .ant-btn.heath Book a trip now
      .mb-32
        .contact
          iconsPhone
          p +212 674 271 222
        .contact
          iconsMessage
          p contact@atriptomoroco.com
      iconsArrowDown.mb-10
    img(src="~/assets/images/banner.png")
</template>

<script>
export default {
  name: 'BannerComponent',
}
</script>

<style scoped>
.banner {
  @apply w-full max-w-page m-auto pt-7 sm:pr-0 sm:pl-6 lg:pl-10 flex justify-center bg-albescent;
}
.content {
  @apply w-full max-w-6xl px-2 sm:px-0 relative flex items-end justify-center sm:justify-between overflow-hidden gap-5;
}
.content > div {
  @apply flex items-center flex-col sm:items-start;
}
h1 {
  @apply mb-4 text-3xl sm:text-4xl md:text-7xl lg:text-8xl text-center sm:text-left text-heath font-DavidLibre;
}
.text {
  @apply mb-2 px-3 sm:px-0 text-sm text-center sm:text-left text-stone;
}
.ant-btn {
  @apply w-max mb-14 py-2 sm:py-3 sm:px-8 text-albescent;
}
.contact {
  @apply flex gap-1 items-center;
}
.contact p {
  @apply m-0 text-sm text-heath;
}
img {
  @apply hidden w-5/12 relative sm:block sm:-right-20;
}
@media (min-width: 1152px) {
  img {
    right: 0;
  }
}
@media (min-width: 1380px) {
  .content {
    overflow: visible;
  }
  img {
    right: -5rem;
  }
}
</style>
