<template lang="pug">
.city-description.limited(:class="{ visible }")
  .content.relative
    .ant-btn.close(@click='hide') CLOSE
    div
      h1.title {{ city.title }}
      .main-image(:style="`background-image: url('${city.img}');`")
      p.description {{ city.description }}
      p.description {{ city.extraInfos }}
    .grid
      .photo(
        v-for="(image, index) in city.images"
        :key='`cityDescription${index}`'
        :style="`background-image: url('${image}');`")
    br
    br
    br
</template>

<script>

export default {
  name: 'CityDescriptionComponent',
  data() {
    return {
      visible: false,
      city: {},
    }
  },
  methods: {
    hide() {
      this.visible = false
      this.city = {}
    }
  },
  mounted() {
    this.$nuxt.$on('showCityDescription', (city) => {
      this.visible = true
      this.city = JSON.parse(JSON.stringify(city))
      if (this.city.images.length % 2 === 1) {
        this.city.images.splice(-1, 1)
      }
    })
  },
}
</script>

<style scoped>
.city-description {
  @apply bg-albescent max-w-full h-full overflow-y-scroll fixed top-0 left-1/2 overflow-hidden opacity-0;
  transition: z-index 0s 0.3s, opacity 0.3s;
  transform: translateX(-50%);
  z-index: -1;
}
.city-description.visible {
  @apply z-50 opacity-100;
  transition: opacity 0.3s;
}
.close {
  @apply absolute right-4 top-4 sm:right-8 sm:top-8 bg-transparent text-heath text-xs sm:text-base font-semibold;
}
.title {
  @apply mt-16 text-4xl;
}
.description {
  @apply text-base;
  text-indent: 10px;
}
.main-image {
  @apply ml-2 mb-4 float-right h-52 w-36 sm:h-72 sm:w-52 bg-cover;
}
.grid {
  @apply clear-both gap-2 grid-cols-2 sm:grid-cols-4 mt-8;
}
.photo {
  @apply bg-cover bg-center;
  aspect-ratio: 13/20;
}
</style>
