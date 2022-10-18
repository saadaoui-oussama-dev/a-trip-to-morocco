<template lang="pug">
.feedback
  .slider
    iconsArrowUpFb.arrow-up(@click.native='slideNext')
    hooper(
      :style='`height: ${height}px;`',
      :settings='hooperSettings',
      ref='carousel',
      @slide='updateCarousel',
      :touchDrag='false',
      :mouseDrag='false',
      :wheelControl='false',
      :shortDrag='false',
      :keysControl='false'
    )
      slide.slide(
        v-for='(slideInfo, index) in $store.getters["feedback/GET_FEEDBACKS"]',
        :key='index'
      )
        landingFeedbackContent(:slideInfo='slideInfo')
    iconsArrowDownFb.arrow-down(@click.native='slidePrev')
</template>

<script>
import { Hooper, Slide } from 'hooper'
import '@/assets/styles/hooper.css'

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
      height: null,
    }
  },
  methods: {
    async setHeight() {
      let width = parseFloat(getComputedStyle(document.body).width)
      if (width < 640) {
        this.height = 400
      } else if (width < 768) {
        this.height = 350
      } else if (width < 1024) {
        this.height = 400
      } else {
        this.height = 400
      }
    },
    slideNext() {
      this.$refs.carousel.slideNext()
    },
    slidePrev() {
      this.$refs.carousel.slidePrev()
    },
    updateCarousel(payload) {
      this.setHeight()
      this.myCarouselData = payload.currentSlide
    },
  },
  created() {
    this.setHeight()
  },
}
</script>

<style scoped>
.feedback {
  @apply flex items-center min-h-184 py-24 bg-albescent;
  @apply sm:min-h-152 lg:min-h-184 xl:min-h-248;
  background-image: url(~/assets/noise-cotton.svg);
}
li {
  @apply flex items-center;
}
.slider {
  @apply flex flex-col items-center gap-10;
}
.arrow-down,
.arrow-up {
  @apply h-20 text-xl cursor-pointer;
}
</style>
