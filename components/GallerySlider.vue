<template lang="pug">
.gallery-slider(:class="{ visible }")
  .back(@click="hideSlider")
  .main
    div(ref="fade" :style="`background-image: url('${getActiveImage}')`")
  .arrow.prev(@click="slidePrev")
    iconsArrowGallerySlider(style="rotate: 180deg")
  .arrow.next(@click="slideNext")
    iconsArrowGallerySlider
  .footer
    div(
      v-for="(image, index) in $store.getters['gallery/GET_GALLERY_SLIDES']"
      :key="index"
      :class="{ active : image.id == currentImg }"
      :style="`background-image: url('${image.url}')`"
      @click="setActiveImage(image.id)"
    )
</template>

<script>
export default {
  name: 'GallerySliderComponent',
  data() {
    return {
      visible: false,
      currentImg: 0,
    }
  },
  computed: {
    getActiveImage() {
      for (let image of this.$store.getters['gallery/GET_GALLERY_SLIDES']) {
        if (image.id == this.currentImg) {
          return image.url
        }
      }
      return this.$store.getters['gallery/GET_GALLERY_SLIDES'][0].url
    },
  },
  methods: {
    hideSlider() {
      this.visible = false
    },
    slidePrev() {
      this.$refs.fade.style.opacity = 0.1
      setTimeout(() => {
        this.currentImg = this.currentImg < 2
          ? this.$store.getters['gallery/GET_GALLERY_SLIDES'].length
          : this.currentImg - 1
        this.$refs.fade.style.opacity = 1
      }, 200)
    },
    slideNext() {
      this.$refs.fade.style.opacity = 0.1
      setTimeout(() => {
        this.currentImg = this.currentImg >= this.$store.getters['gallery/GET_GALLERY_SLIDES'].length
          ? 1
          : this.currentImg + 1
        this.$refs.fade.style.opacity = 1
      }, 200)
    },
    setActiveImage(imgId) {
      this.$refs.fade.style.opacity = 0.1
      setTimeout(() => {
        this.currentImg = imgId
        this.$refs.fade.style.opacity = 1
      }, 200)
    }
  },
  mounted() {
    this.$nuxt.$on('showSlider', (imgId) => {
      this.visible = true
      this.currentImg = imgId
    })
  },
}
</script>

<style scoped>
.gallery-slider {
  @apply w-full h-full fixed top-0 left-0 overflow-hidden opacity-0;
  transition: z-index 0s 0.3s, opacity 0.3s;
  background-color: #000C;
  z-index: -1;
}
.gallery-slider.visible {
  @apply z-50 opacity-100;
  transition: opacity 0.3s;
}
.back {
  @apply w-full h-full absolute cursor-pointer;
  z-index: -1;
}
.main {
  @apply w-full sm:w-4/5 lg:w-3/5 top-1/2 sm:top-9.5 md:top-8 absolute left-1/2 bg-teal;
  background-image: url(~/assets/noise-teal.png);
  transform: translate(-50%, -50%);
  height: calc(100vh - 8.5rem);
}
.main div {
  @apply w-full h-full bg-no-repeat bg-contain bg-center opacity-100;
  transition: opacity 250ms linear;
}
@media (min-width: 640px) {
  .main {
    transform: translateX(-50%);
  }
}
.arrow {
  @apply w-8 h-8 sm:w-10 sm:h-10 absolute top-1/2 z-50 flex justify-center items-center rounded-full bg-kashmir cursor-pointer;
  background-image: url(~/assets/noise-kashmir.svg);
  transform: translateY(-50%);
}
.arrow.prev {
  @apply left-2 sm:left-4 lg:left-16;
}
.arrow.next {
  @apply right-2 sm:right-4 lg:right-16;
}
.arrow div::selection {
  @apply bg-none bg-transparent;
}
.arrow svg {
  @apply w-3.5 h-3.5 sm:w-4 sm:h-4;
}
.footer {
  @apply hidden sm:flex absolute bottom-4 left-1/2 gap-0.5 sm:gap-1 md:gap-1.5;
  transform: translateX(-50%);
}
.footer div {
  @apply sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-xl bg-cover bg-center bg-heath cursor-pointer;
}
.footer div.active {
  @apply border-heath;
  border-width: 3px;
}
</style>
