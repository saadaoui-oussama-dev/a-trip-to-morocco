<template lang="pug">
.gallery-slider(:class="{ visible }")
  .back(@click="hideSlider")
  .main(ref="imgParent" @click="hideSlider")
    img(ref="image" :src="getActiveImage" @click="breakParentEvent")
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
      currentImg: 1,
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
      window.removeEventListener('resize' , this.resize)
    },
    breakParentEvent(e) {
      e.stopPropagation()
    },
    slidePrev() {
      let imgId = this.currentImg < 2
        ? this.$store.getters['gallery/GET_GALLERY_SLIDES'].length
        : this.currentImg - 1
      this.setActiveImage(imgId)
    },
    slideNext() {
      let imgId = this.currentImg < this.$store.getters['gallery/GET_GALLERY_SLIDES'].length
        ? this.currentImg + 1
        : 1
      this.setActiveImage(imgId)
    },
    setActiveImage(imgId) {
      this.$refs.image.style.opacity = 0.1
      setTimeout(() => {
        this.currentImg = imgId
        this.$refs.image.style.opacity = 1
        setTimeout(() => {
          this.resize()
        }, 2)
      }, 170)
    },
    resize(repeat = true) {
      try {
        let imgSize = [ this.$refs.image.naturalWidth, this.$refs.image.naturalHeight ],
          parentSize = [
            parseFloat(getComputedStyle(this.$refs.imgParent).width),
            parseFloat(getComputedStyle(this.$refs.imgParent).height),
          ],
          coefficient = Math.min(parentSize[0] / imgSize[0], parentSize[1] / imgSize[1])
        this.$refs.image.style.width = (100 * coefficient * imgSize[0] / parentSize[0]) + '%'
        this.$refs.image.style.height = (100 * coefficient * imgSize[1] / parentSize[1])  + '%'
      } catch {
        if (repeat) {
          setTimeout(() => {
            this.resize(false)
          }, 100)
        }
      }
    }
  },
  mounted() {
    this.$nuxt.$on('showSlider', (imgId) => {
      this.visible = true
      this.currentImg = imgId
      window.addEventListener('resize' , this.resize)
      setTimeout(() => {
        this.resize()
      }, 1)
    })
  },
}
</script>

<style scoped>
.gallery-slider {
  @apply w-full h-full fixed top-0 left-0 overflow-hidden opacity-0;
  transition: z-index 0s 0.3s, opacity 0.3s;
  background-color: #000A;
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
  max-height: 60vh;
  @apply w-full sm:w-4/5 lg:w-3/5 sm:max-h-screen top-1/2 sm:top-9.5 md:top-8 absolute left-1/2 flex justify-center items-center cursor-pointer;
  transform: translate(-50%, -50%);
  height: calc(100vh - 8.5rem);
}
.main img {
  @apply opacity-100 cursor-default;
  transition: opacity 200ms linear;
}
@media (min-width: 640px) {
  .main {
    transform: translateX(-50%);
  }
}
.arrow {
  @apply w-8 h-8 absolute top-1/2 z-50 flex justify-center items-center rounded-full bg-kashmir cursor-pointer;
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
  @apply w-3.5 h-3.5;
}
.footer {
  @apply flex justify-around w-full sm:w-auto px-4 sm:px-0 absolute bottom-4 left-1/2 gap-0.5 sm:gap-1 md:gap-1.5;
  transform: translateX(-50%);
}
.footer div {
  @apply w-8 h-8 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-xl bg-cover bg-center bg-heath cursor-pointer;
}
.footer div.active {
  @apply border-heath;
  border-width: 3px;
}
</style>
