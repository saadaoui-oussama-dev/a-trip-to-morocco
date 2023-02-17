<template lang="pug">
.limited(v-if='getList.length > 0')
  .content
    h2.title.text-colored {{ title }}
    .posts(ref="list")
      Post(v-for="(trip, index) in getList" :key="index" :post="trip" :type="list[0].toLowerCase()" path="../" ref="post")
    .arrow(:class="{ visible }")
      iconsArrowDown(:color='list == "PRIVATE_TRIPS" ? "#3D0E1B" : list == "DAY_TRIPS" ? "#025B63" : "#4D5A8E"')
.content(v-else)
</template>

<script>
export default {
  name: 'PostsListComponent',
  props: ['title', 'list', 'active'],
  data() {
    return {
      visible: true,
      mousePosition: 0,
    }
  },
  mounted() {
    this.detectScroll()
    window.addEventListener('resize' , this.detectScroll)
    this.$refs.list.addEventListener('mousedown', this.onMouseDown)
    document.addEventListener('keydown', this.scrollOnArrowPress)
  },
  beforeDestroy() {
    window.removeEventListener('resize' , this.detectScroll)
    this.$refs.list.removeEventListener('mousedown', this.onMouseDown)
    document.removeEventListener('keydown', this.scrollOnArrowPress)
  },
  computed: {
    getList() {
      return this.$store.getters[`trips/GET_${this.list}`].filter(trip => trip.id != this.active)
    },
  },
  methods: {
    detectScroll() {
      try {
        let postWidth = parseFloat(getComputedStyle(this.$refs.post[0].$el).width),
        gap = parseFloat(getComputedStyle(this.$refs.list).gridColumnGap),
        number = this.getList.length
        this.visible = (postWidth * number + gap * (number - 1)) > parseFloat(getComputedStyle(this.$refs.list).width)
      } catch {}
    },
    onMouseDown(event) {
      this.mousePosition = event.clientX
      this.$refs.list.addEventListener('mousemove', this.scrollOnMouseMove)
      this.$refs.list.addEventListener('mouseup', this.onMouseUp)
    },
    onMouseUp() {
      this.$refs.list.removeEventListener('mousemove', this.scrollOnMouseMove)
      this.$refs.list.removeEventListener('mouseup', this.onMouseUp)
    },
    scrollOnArrowPress(event) {
      if (event.keyCode === 37) {
        event.preventDefault()
        this.$refs.list.scrollLeft -= 100
      } else if (event.keyCode === 39) {
        event.preventDefault()
        this.$refs.list.scrollLeft += 100
      }
    },
    scrollOnMouseMove(event) {
      this.$refs.list.scrollLeft -= (event.clientX - this.mousePosition) / 6
    },
  },
}
</script>

<style scoped>
.content {
  @apply mt-5 sm:mt-6 md:mt-10;
}
.title {
  @apply text-4xl mb-9;
  @apply sm:text-5xl lg:text-6xl xl:text-8xl;
}
.posts {
  @apply flex mb-3 sm:mb-8 gap-x-2 overflow-auto;
  @apply md:gap-x-5;
  user-select: none;
}
.posts::-webkit-scrollbar {
  height: 0px;
}
.arrow {
  @apply mb-16 opacity-0;
  transition: opacity 0.1s linear;
}
.arrow.visible {
  @apply opacity-100;
}
.arrow svg {
  @apply inline relative left-9;
  rotate: 90deg;
}
</style>
