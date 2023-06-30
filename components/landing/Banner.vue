<template lang="pug">
.limited
  .content
    .info
      h1 Explore&nbsp;a colorful Morocco
      p.text We are experts at creating a Moroccan experience perfectly tailored to our guests needs. These are some of our most popular itineraries, and they may be customized to the utmost extent of your imaginations.
      .ant-btn.heath(@click="scrollDown") Book a trip now
      .contacts
        div
          iconsPhone
          p +212 656 419 841
        div
          iconsMessage
          p contact@atriptomoroco.com
      iconsArrowDown.mb-4
    .img-container
      div
</template>

<script>
export default {
  name: 'BannerComponent',
  methods: {
    scrollDown() {
      document.querySelector('#private-trips').scrollIntoView({
        behavior: 'smooth',
      })
    },
  },
}
</script>

<style scoped>
.limited {
  @apply max-w-full bg-albescent overflow-hidden;
}
.content {
  @apply relative flex gap-4 justify-center sm:justify-between;
}
.info {
  @apply pt-16 md:pt-24 flex items-center flex-col sm:items-start;
  flex: 1 1 0px;
}
h1 {
  @apply mb-4 text-3xl text-center text-heath font-DavidLibre;
  @apply sm:mt-12 md:mt-0 sm:mb-3 md:mb-0 sm:text-left;
  @apply text-3xl sm:text-4xl md:text-7xl lg:text-8xl;
}
.text {
  @apply mb-2 px-3 text-sm text-center text-stone;
  @apply sm:mb-1.5 md:mb-4 sm:px-0 sm:text-left;
}
.ant-btn {
  @apply w-max mb-14 py-2 text-albescent;
  @apply sm:mb-9 md:mb-9 sm:py-3 sm:px-8;
}
.contacts {
  @apply mb-12 flex items-center flex-col sm:items-start;
}
.contacts div {
  @apply flex gap-1 items-center;
}
.contacts div p {
  @apply m-0 text-sm text-heath;
}
.img-container {
  @apply hidden sm:block h-full w-full relative;
  flex: 1 1 0px;
}
.img-container div {
  @apply h-full bg-right-bottom bg-contain bg-no-repeat;
  background-image: url('~/assets/images/banner.png');
  width: calc(100% + 8rem);
}
</style>
