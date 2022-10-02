<template lang="pug">
.feedback
  .slider
    iconsArrowUpFb.arrow-up(@click.native="slideNext")
    hooper(
      :style="`height: ${height}px;`" :settings="hooperSettings" ref="carousel" @slide="updateCarousel"
      :touchDrag="false" :mouseDrag="false" :wheelControl="false" :shortDrag="false" :keysControl="false"
    )
      slide.slide(v-for="(slideInfo, index) in $store.getters['feedback/GET_FEEDBACKS']" :key="index")
        FeedbackContent(:slideInfo="slideInfo" v-resize="setHeight" ref="slide")
    iconsArrowDownFb.arrow-down(@click.native="slidePrev")
</template>

<script>
import { Hooper, Slide } from 'hooper'
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
  name: 'FeedbackComponent',
  components: {
    Hooper,
    Slide,
  },
  data() {
    return {
      hooperSettings: {
        itemsToShow: 1,
        vertical: 'true',
        centerMode: 'true',
        infiniteScroll: 'true',
        transition: '750',
      },
      height: 1000,
    }
  },
  methods: {
    slideNext() {
      this.$refs.carousel.slideNext()
    },
    slidePrev() {
      this.$refs.carousel.slidePrev()
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
.feedback {
  @apply flex items-center min-h-184 py-24;
  @apply sm:min-h-152 lg:min-h-184 xl:min-h-248;
}
.slider {
  @apply flex flex-col items-center gap-10;
}
.arrow-down,
.arrow-up {
  @apply h-20 text-xl cursor-pointer;
}
</style>
