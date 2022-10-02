<template lang="pug">
.slider
  .content
    iconsArrowDown.iconsArrowDown(color="#F7EBDB")
    iconsArrowDown.iconsArrowRight(color="#F7EBDB")
    hooper.hooper(:initialSlide="999" :settings="hooperSettings" :style="'height:'+height+'px'" @updated="updateCarousel")
      slide.slide(v-for="(slideInfo, index) in $store.getters['slider/GET_SLIDES']" :key="index")
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
    async getHeight() {
      let width = parseFloat(getComputedStyle(document.body).width)
      this.hooperSettings.vertical=true
      if (width < 640) {
        this.hooperSettings.vertical = false
        this.height = 600
      } else if (width < 768) {
        this.height = 550
      } else if (width < 1024) {
        this.height = 600
      } else if (width < 1280) {
        this.height = 780
      } else {
        this.height = 900
      }
    },
    updateCarousel(payload) {
      this.getHeight()
      if (payload.containerWidth < 640) {
        payload.settings.vertical = false
      } else {
        payload.settings.vertical = true
      }
    },
  },
  created() {
    this.getHeight()
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
.iconsArrowRight {
  @apply absolute bottom-0 left-9 pt-1 z-10 block sm:hidden;
  rotate: -90deg;
}
.slide {
  @apply h-full;
}
.pagination {
  @apply p-0 w-max hidden sm:block left-12 lg:left-20 sm:left-12 xl:pt-56 lg:pt-60 md:pt-56 sm:pt-48;
  rotate: 180deg;
}
</style>
