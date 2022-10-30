<template lang="pug">
.feedback
  .slider
    iconsArrowUpFb.arrow-up(@click.native='slideNext')
    hooper.hidden(
      class='lg:block',
      style='height: 400px',
      ref='carousel1',
      @slide='updateCarousel',
      :settings='hooperSettings',
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
    hooper.hidden(
      class='md:block lg:hidden',
      style='height: 400px',
      ref='carousel2',
      @slide='updateCarousel',
      :settings='hooperSettings',
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
    hooper.hidden(
      class='sm:block md:hidden',
      style='height: 350px',
      ref='carousel3',
      @slide='updateCarousel',
      :settings='hooperSettings',
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
    hooper.block(
      class='sm:hidden',
      style='height: 400px',
      ref='carousel4',
      @slide='updateCarousel',
      :settings='hooperSettings',
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
      carouselData: 0,
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
    slideNext() {
      this.$refs.carousel1.slideNext()
    },
    slidePrev() {
      this.$refs.carousel1.slidePrev()
    },
    updateCarousel(payload) {
      this.carouselData = payload.currentSlide
    },
  },
}
</script>

<style scoped>
.feedback {
  @apply flex justify-center items-center min-h-184 py-24 bg-albescent;
  @apply sm:min-h-152 lg:min-h-184 xl:min-h-248;
  background-image: url(~/assets/images/noise-cotton.svg);
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
