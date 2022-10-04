<template lang="pug">
.slider
  .content
    iconsArrowDown.iconsArrowDown(color="#F7EBDB")
    iconsArrowDown.iconsArrowRight(color="#F7EBDB")
    hooper(:settings="hooperSettings" @updated="updateCarousel" :style="`height: ${height}px`")
      slide.h-full(
        v-for="(slideInfo, index) in $store.getters['slider/GET_SLIDES']"
        :key="index"
        :style="`height: ${height}px`"
      )
        SlideContent(:slideInfo="slideInfo" ref="slide")
      hooper-pagination.pagination(slot="hooper-addons")
</template>

<script>
import { Hooper, Slide, Pagination as HooperPagination } from 'hooper'
import '@/assets/styles/hooper.css'

export default {
  name: 'SliderComponent',
  components: {
    Hooper,
    Slide,
    HooperPagination,
  },
  data() {
    return {
      hooperSettings: {
        itemsToShow: 1,
        centerMode: true,
        transition: 750,
        vertical:true
      },
      height: null,
    }
  },
  methods: {
    async setHeight() {
      let width = parseFloat(getComputedStyle(document.body).width)
      this.hooperSettings.vertical = 640 <= width
      if (width < 640) {
        this.height = 600
      } else if (width < 768) {
        this.height = 550
      } else if (width < 1024) {
        this.height = 600
      } else {
        this.height = 700
      }
    },
    updateCarousel(payload) {
      this.setHeight()
      payload.settings.vertical = 640 <= payload.containerWidth
    },
  },
  created() {
    this.setHeight()
  },
}
</script>

<style scoped>
.slider {
  background-image: url('~/assets/noise-teal.png');
  @apply w-full max-w-page m-auto flex justify-center bg-teal mt-10;
  @apply sm:bg-none sm:bg-transparent sm:mt-12 md:mt-20;
}
.content {
  @apply w-full max-w-6xl relative;
}
.iconsArrowDown {
  @apply absolute hidden sm:block z-10;
  @apply top-12 lg:top-20 left-12 sm:left-12 lg:left-20;
  rotate: 180deg;
}
.iconsArrowRight {
  @apply absolute bottom-0 left-9 pt-1 z-10 block sm:hidden;
  rotate: 90deg;
}
.pagination {
  @apply w-max hidden sm:block left-12 p-0;
  @apply lg:left-20 sm:pt-96 lg:pt-112;
}
</style>
