<template lang="pug">
.slider
  .content
    iconsArrowDown.iconsArrowDown(@click.native="slideNext" color="#F7EBDB")
    hooper.hooper(:touchDrag="false" :mouseDrag="false" :wheelControl="false" :shortDrag="false" :keysControl="false" :settings="hooperSettings" :style="'height:'+height+'px;'" ref="carousel" @slide="updateCarousel")
      slide.slide(v-for="(slideInfo, index) in slides" :key="index")
        SlideContent(:slideInfo="slideInfo" v-resize="setHeight" ref="slide")
      hooper-pagination.pagination(slot="hooper-addons")
</template>
<script>
import { Hooper, Slide, Pagination as HooperPagination } from 'hooper'
import '@/assets/styles/hooper.css'
import Vue from 'vue'
Vue.directive('resize', {
  inserted(el, binding) {
    const onResize = binding.value
    window.addEventListener('resize', () => {
      onResize(el.clientHeight)
    })
  },
})
export default {
  name: 'SliderComponent',
  data() {
    return {
      slides: [
        {
          title: 'Moroccan Tajine 1',
          description:
            'Amongst the most sought-after dishes in Morocco is Tajine. With a very particular cooking method and multiple versions, this dish never ceases to delight the most demanding gourmets ! Food such as fish, chicken, meat, vegetables, and sometimes nuts, plums and apricots, are steamed with a bit of spices that enhances its flavour.',
          img: '/slide.png',
        },
        {
          title: 'Moroccan Tajine 2',
          description:
            'Amongst the most sought-after dishes in Morocco is Tajine. With a very particular cooking method and multiple versions, this dish never ceases to delight the most demanding gourmets ! Food such as fish, chicken, meat, vegetables, and sometimes nuts, plums and apricots, are steamed with a bit of spices that enhances its flavour.',
          img: '/slide.png',
        },
        {
          title: 'Moroccan Tajine 3',
          description:
            'Amongst the most sought-after dishes in Morocco is Tajine. With a very particular cooking method and multiple versions, this dish never ceases to delight the most demanding gourmets ! Food such as fish, chicken, meat, vegetables, and sometimes nuts, plums and apricots, are steamed with a bit of spices that enhances its flavour.',
          img: '/slide.png',
        },
        {
          title: 'Moroccan Tajine 4',
          description:
            'Amongst the most sought-after dishes in Morocco is Tajine. With a very particular cooking method and multiple versions, this dish never ceases to delight the most demanding gourmets ! Food such as fish, chicken, meat, vegetables, and sometimes nuts, plums and apricots, are steamed with a bit of spices that enhances its flavour.',
          img: '/slide.png',
        },
      ],
      hooperSettings: {
        itemsToShow: 1,
        vertical: 'true',
        centerMode: 'true',
        infiniteScroll: 'true',
        transition: '750',
      },
      height: 1040,
      carouselData: 0,
    }
  },
  components: {
    Hooper,
    Slide,
    HooperPagination,
  },
  watch: {
    carouselData() {
      this.$refs.carousel.slideTo(this.carouselData)
    },
  },
  methods: {
    slideNext() {
      this.$refs.carousel.slideNext()
    },
    updateCarousel(payload) {
      this.myCarouselData = payload.currentSlide
    },
    setHeight(height) {
      this.height = height
    },
    getHeight() {
      this.height = this.$refs.slide[0].$el.clientHeight
    },
  },
  mounted() {
    setTimeout(() => {
      this.getHeight()
    }, 500)
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
  @apply absolute z-10 top-9 left-12 xl:top-64 lg:top-48 md:top-20 sm:left-20 cursor-pointer;
}
.slide {
  @apply min-w-full;
}
.pagination {
  @apply p-0 left-20 top-2/3 xl:pt-16 lg:pt-28 md:pt-48 sm:pt-48;
}
</style>
