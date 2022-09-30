<template lang="pug">
.slider
  .content
    iconsArrowDown.iconsArrowDown(color="#F7EBDB")
    iconsArrowDown.iconsArrowRight(color="#F7EBDB")
    hooper.hooper(:initialSlide="999" :settings="hooperSettings" :style="'height:'+height" ref="carousel" @updated="updateCarousel")
      slide.slide(v-for="(slideInfo, index) in $store.getters['slider/GET_SLIDES']" :key="index")
        SlideContent(:slideInfo="slideInfo" ref="slide")
      hooper-pagination.pagination(slot="hooper-addons")
</template>

<script>
import { Hooper, Slide, Pagination as HooperPagination } from 'hooper'
import '@/assets/styles/hooper.css'
export default {
  name: 'SliderComponent',
  props: ['height'],
  data() {
    return {
      hooperSettings: {
        itemsToShow: 1,
        centerMode: true,
        transition: 750,
        vertical: true
      },
    }
  },
  components: {
    Hooper,
    Slide,
    HooperPagination,
  },
  methods: {
    updateCarousel(payload) {
      if (payload.containerWidth < 640) {
        payload.settings.vertical = false
      } else {
        payload.settings.vertical = true
      }
    },
  },
}
</script>

<style scoped>
.slider {
  @apply w-full max-w-page m-auto flex justify-center bg-teal;
  background-image: url('~/assets/noise-teal.png');
}
.content {
  @apply w-full max-w-6xl relative;
}
.iconsArrowDown {
  @apply absolute hidden sm:block z-10 top-9 left-12 xl:top-64 lg:top-48 md:top-20 lg:left-20 sm:left-12 cursor-pointer;
}
.iconsArrowRight{
  @apply absolute bottom-0 left-16 pt-1 z-10 block sm:hidden;
  rotate: -90deg;
}
.slide {
  @apply min-w-full;
}
.pagination {
  @apply p-0 w-max hidden sm:block left-12 lg:left-20 sm:left-12 xl:pt-56 lg:pt-60 md:pt-56 sm:pt-48;
  rotate: 180deg;
}
</style>
