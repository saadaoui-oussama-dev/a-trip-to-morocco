<template lang="pug">
.slider
  .content
    iconsArrowDown.iconsArrowDown(color='#F7EBDB')
    iconsArrowDown.iconsArrowRight(color='#F7EBDB')
    hooper.hidden(
      ref='carousel1',
      @slide='updateCarousel',
      class='lg:block',
      :vertical='true',
      :settings='hooperSettings',
      style='height: 700px'
    )
      slide.h-full(
        v-for='(slideInfo, index) in $store.getters["slider/GET_SLIDES"]',
        :key='index',
        style='height: 700px'
      )
        SlideContent(:slideInfo='slideInfo')
      hooper-pagination.pagination(slot='hooper-addons')
    hooper.hidden(
      ref='carousel2',
      @slide='updateCarousel',
      class='md:block lg:hidden',
      :vertical='true',
      :settings='hooperSettings',
      style='height: 600px'
    )
      slide.h-full(
        v-for='(slideInfo, index) in $store.getters["slider/GET_SLIDES"]',
        :key='index',
        style='height: 600px'
      )
        SlideContent(:slideInfo='slideInfo')
      hooper-pagination.pagination(slot='hooper-addons')
    hooper.hidden(
      ref='carousel3',
      @slide='updateCarousel',
      class='sm:block md:hidden',
      :vertical='true',
      :settings='hooperSettings',
      style='height: 550px'
    )
      slide.h-full(
        v-for='(slideInfo, index) in $store.getters["slider/GET_SLIDES"]',
        :key='index',
        style='height: 550px'
      )
        SlideContent(:slideInfo='slideInfo')
      hooper-pagination.pagination(slot='hooper-addons')
    hooper.block(
      ref='carousel4',
      @slide='updateCarousel',
      class='sm:hidden',
      :settings='hooperSettings',
      style='height: 600px'
    )
      slide.h-full(
        v-for='(slideInfo, index) in $store.getters["slider/GET_SLIDES"]',
        :key='index',
        style='height: 600px'
      )
        SlideContent(:slideInfo='slideInfo')
      hooper-pagination.pagination(slot='hooper-addons')
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
        // vertical: true,
      },
      carouselData: 0,
      // height: null,
      // show:0
    }
  },
  watch: {
    carouselData() {
      this.$refs.carousel1.slideTo(this.carouselData)
      this.$refs.carousel2.slideTo(this.carouselData)
      this.$refs.carousel3.slideTo(this.carouselData)
      this.$refs.carousel4.slideTo(this.carouselData)
    },
  },
  methods: {
    updateCarousel(payload) {
      this.carouselData = payload.currentSlide
    },
  },
  //   methods: {
  //     async setHeight() {
  //       let width = parseFloat(getComputedStyle(document.body).width)
  //       this.hooperSettings.vertical = 640 <= width
  //       if (width < 640) {
  //         this.height = 600
  //       } else if (width < 768) {
  //         this.height = 550
  //       } else if (width < 1024) {
  //         this.height = 600
  //       } else {
  //         this.height = 700
  //       }
  //     },
  //   //   updateCarousel(payload) {
  //   //     this.setHeight()
  //   //     payload.settings.vertical = 640 <= payload.containerWidth
  //   //     console.log(payload)
  //   //   },
  //   // },
  //   // created() {
  //   //   this.setHeight()
  //   // },
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
