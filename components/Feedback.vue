<template lang="pug">
.feedback
  .slider
    iconsArrowUpFb.iconsArrowUp(@click.native="slideNext")
    hooper.hooper(:touchDrag="false" :mouseDrag="false" :wheelControl="false" :shortDrag="false" :keysControl="false" :settings="hooperSettings" :style="'height:'+height+'px;'" ref="carousel" @slide="updateCarousel")
      slide.slide(v-for="(slideInfo, index) in slides" :key="index")
        FeedbackContent(:slideInfo="slideInfo" v-resize="setHeight" ref="slide")
    iconsArrowDownFb.iconsArrowDown(@click.native="slidePrev")
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
      slides: [
        {
          img: 'feedback.png',
          feedback:
            'Our guide Mohammed,  Salem the driver and Brahim our desert friend were very helpful and took care of everything to make this trip special. We had a great experience and great fun. Definitely one to remember!! I can assure you that Best Travel is the best in organizing these tours. Thank You from Chris, Sasha, Jonathan and Melanie from Malta.',
          writer: 'Chris Do.',
        },
        {
          img: 'feedback.png',
          feedback:
            'Our guide Mohammed, Salem the driver and Brahim our desert friend were very helpful and took care of everything to make this trip special. We had a great experience and great fun. Definitely one to remember!! I can assure you that Best Travel is the best in organizing these tours. Thank You from Chris, Sasha, Jonathan and Melanie from Malta.',
          writer: 'Chris Do.',
        },
        {
          img: 'feedback.png',
          feedback:
            'Our guide Mohammed, Salem the driver and Brahim our desert friend were very helpful and took care of everything to make this trip special. We had a great experience and great fun. Definitely one to remember!! I can assure you that Best Travel is the best in organizing these tours. Thank You from Chris, Sasha, Jonathan and Melanie from Malta.',
          writer: 'Chris Do.',
        },
        {
          img: 'feedback.png',
          feedback:
            'Our guide Mohammed, Salem the driver and Brahim our desert friend were very helpful and took care of everything to make this trip special. We had a great experience and great fun. Definitely one to remember!! I can assure you that Best Travel is the best in organizing these tours. Thank You from Chris, Sasha, Jonathan and Melanie from Malta.',
          writer: 'Chris Do.',
        },
        {
          img: 'feedback.png',
          feedback:
            'Our guide Mohammed, Salem the driver and Brahim our desert friend were very helpful and took care of everything to make this trip special. We had a great experience and great fun. Definitely one to remember!! I can assure you that Best Travel is the best in organizing these tours. Thank You from Chris, Sasha, Jonathan and Melanie from Malta.',
          writer: 'Chris Do.',
        },
      ],
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
.iconsArrowDown,
.iconsArrowUp {
  @apply h-20 text-xl cursor-pointer;
}
</style>
