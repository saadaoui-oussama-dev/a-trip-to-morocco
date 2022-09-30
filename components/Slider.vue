<template lang="pug">
.slider
  .content
    iconsArrowDown.iconsArrowDown(color="#F7EBDB")
    iconsArrowDown.iconsArrowRight(color="#F7EBDB")
    hooper.hooper(:initialSlide="999" :settings="hooperSettings" :style="'height:'+height+'px;'" ref="carousel" @updated="updateCarousel")
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
      onResize(el)
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
        centerMode: true,
        transition: 750,
        vertical: true
      },
      height: 1040,
    }
  },
  components: {
    Hooper,
    Slide,
    HooperPagination,
  },
  methods: {
    setHeight(el) {
      this.height = el.clientHeight
    },
    getHeight() {
      this.height = this.$refs.slide[0].$el.clientHeight
    },
    updateCarousel(payload) {
      console.log(payload)
      payload.containerHeight = this.$refs.slide[0].$el.clientHeight
      console.log(this.$refs.slide[0].$el.clientHeight)
      if (payload.containerWidth < 640) {
        payload.settings.vertical = false
      } else {
        payload.settings.vertical = true
      }
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
  @apply w-full flex justify-center;
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
