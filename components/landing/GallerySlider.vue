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
      touch: {},
      resizeInterval: null,
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
      document.body.children[0].removeEventListener('touchmove', this.dragging)
      document.body.children[0].removeEventListener('touchstart', this.dragStart)
      clearInterval(this.resizeInterval)
      this.enableScroll()
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
      if (this.currentImg != imgId) {
        this.$refs.image.style.opacity = 0.1
        setTimeout(() => {
          this.currentImg = imgId
          this.$refs.image.style.opacity = 1
          this.resize()
          setTimeout(() => {
            this.resize()
          }, 1)
        }, 170)
      }
    },
    resize() {
      try {
        let imgSize = [ this.$refs.image.naturalWidth, this.$refs.image.naturalHeight ],
          parentSize = [
            parseFloat(getComputedStyle(this.$refs.imgParent).width),
            parseFloat(getComputedStyle(this.$refs.imgParent).height),
          ],
          coefficient = Math.min(parentSize[0] / imgSize[0], parentSize[1] / imgSize[1])
        this.$refs.image.style.width = (100 * coefficient * imgSize[0] / parentSize[0]) + '%'
        this.$refs.image.style.height = (100 * coefficient * imgSize[1] / parentSize[1])  + '%'
      } catch {}
    },
    dragStart(e) {
      if (e.touches.length === 1) {
        this.touch.start = e.touches[0].pageX
      }
    },
    dragging(e) {
      e.preventDefault()
      if (e.touches.length === 1) {
        this.touch.end = e.touches[0].pageX
        if ((this.touch.start - this.touch.end) / window.innerWidth > 0.1) {
          this.slideNext()
          document.body.children[0].addEventListener('touchend', this.dragEnd)
          document.body.children[0].removeEventListener('touchmove', this.dragging)
        } else if ((this.touch.start - this.touch.end) / window.innerWidth < -0.1) {
          this.slidePrev()
          document.body.children[0].addEventListener('touchend', this.dragEnd)
          document.body.children[0].removeEventListener('touchmove', this.dragging)
        }
      }
    },
    dragEnd(e) {
      if (e.touches.length === 0) {
        document.body.children[0].addEventListener('touchmove', this.dragging)
        document.body.children[0].removeEventListener('touchend', this.dragEnd)
      }
    },
    preventDefault(e) {
      e.preventDefault()
    },
    preventScrollKeys(e) {
      let keys = {37: 1, 38: 1, 39: 1, 40: 1}
      if (keys[e.keyCode]) {
        e.preventDefault()
        return false
      }
    },
    disableScroll() {
      let supportsPassive = false
      try {
        window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
          get: function () { supportsPassive = true } 
        }))
      } catch(e) {}
      let wheelOpt = supportsPassive ? { passive: false } : false
      window.addEventListener('DOMMouseScroll', this.preventDefault, false)
      try {
        window.addEventListener('wheel', this.preventDefault, wheelOpt)
        window.addEventListener('mousewheel', this.preventDefault, wheelOpt)
      } catch {}
      window.addEventListener('keydown', this.preventScrollKeys, false)
    },
    enableScroll() {
      let supportsPassive = false
      try {
        window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
          get: function () { supportsPassive = true }
        }))
      } catch(e) {}
      let wheelOpt = supportsPassive ? { passive: false } : false
      window.removeEventListener('DOMMouseScroll', this.preventDefault, false)
      try {
        window.removeEventListener('wheel', this.preventDefault, wheelOpt)
        window.removeEventListener('mousewheel', this.preventDefault, wheelOpt)
      } catch {}
      window.removeEventListener('keydown', this.preventScrollKeys, false)
    }
  },
  mounted() {
    this.$nuxt.$on('showSlider', (imgId) => {
      this.visible = true
      this.currentImg = imgId
      window.addEventListener('resize' , this.resize)
      this.resize()
      this.resizeInterval = setInterval(() => {
        this.resize()
      }, 10)
      document.body.children[0].addEventListener('touchstart', this.dragStart)
      document.body.children[0].addEventListener('touchmove', this.dragging)
      this.disableScroll()
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
  @apply hidden sm:flex w-8 h-8 absolute top-1/2 z-50 justify-center items-center rounded-full bg-kashmir cursor-pointer;
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
  max-width: 400px;
  @apply flex justify-around w-full px-4 absolute bottom-4 left-1/2 gap-0.5;
  @apply sm:max-w-full sm:w-auto sm:px-0 sm:gap-1 md:gap-1.5;
  transform: translateX(-50%);
}
.footer div {
  @apply w-8 h-8 mx-auto relative rounded-lg bg-cover bg-center bg-heath cursor-pointer;
  @apply sm:w-11 sm:h-11 md:w-14 md:h-14 sm:rounded-xl;
  transition: width 0.3s ease-in-out, height 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
.footer div.active {
  @apply w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 ;
}
.footer div::after {
  content: '';
  @apply w-0 absolute -bottom-1 sm:-bottom-2 left-1/2 bg-white rounded-full;
  height: 2px;
  transform: translateX(-50%);
  transition: width 0.1s ease-in-out;
}
.footer div.active::after {
  @apply w-4/5;
  transition: width 0.3s 0.3s ease-in-out;
}
</style>
