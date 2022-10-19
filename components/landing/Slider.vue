<template lang="pug">
.limited
  .content.relative
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
        landingSlideContent(:slideInfo='slideInfo')
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
        landingSlideContent(:slideInfo='slideInfo')
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
        landingSlideContent(:slideInfo='slideInfo')
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
        landingSlideContent(:slideInfo='slideInfo')
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
}
</script>

<style scoped>
.limited {
  background-image: url('~/assets/noise-teal.png');
  @apply bg-teal mt-10 px-0;
  @apply sm:bg-none sm:bg-transparent sm:mt-12 md:mt-20;
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
