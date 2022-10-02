<template lang="pug">
div
  Navbar
  Banner
  PostsList(title='Our Private Trips' list='PRIVATE_TRIPS')
  Slider(:height="height")
  PostsList(title='Our Day Trips' list='DAY_TRIPS')
  PostsList(title='Our Activities' list='ACTIVITIES')
  Gallery
  .section-7
    .content
      Feedback
      City(v-for="(city, index) in $store.getters['cities/GET_CITIES']" :key="index" :city="city")
      ContactUsForm
  Footer
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      height: 1040,
    }
  },
  mounted() {
    let width = parseFloat(getComputedStyle(document.body).width)
    if (width < 640) {
        console.log('phone')
        this.height = '300px'
    } else if (width < 768) {
      console.log('sm')
      this.height = '350px'
    } else if (width < 1024) {
      console.log('md')
      this.height = '600px'
    } else if (width < 1280) {
      console.log('lg')
      this.height = '1000px'
    } else {
      console.log('xl')
      this.height = '600px'
    }
  },
  async asyncData({ store }) {
    let trips = await store.dispatch('trips/SET_PRIVATE_TRIPS')
    trips = await store.dispatch('trips/SET_DAY_TRIPS')
    trips = await store.dispatch('trips/SET_ACTIVITIES')
    let gallery = await store.dispatch('gallery/SET_GALLERY')
    let cities = await store.dispatch('cities/SET_CITIES')
    let slides = await store.dispatch('slider/SET_SLIDES')
  }
}
</script>

<style scoped>
.section-7 {
  @apply w-full max-w-page m-auto flex justify-center bg-albescent;
  background: url(~/assets/noise-cotton.svg), linear-gradient(to bottom, #F7EBDB 50%, #FFF 50%);
}
.section-7 .content {
  @apply w-full max-w-page grid grid-cols-1 sm:grid-cols-2;
}
@media (min-width: 640px) {
  .section-7 {
    background: url(~/assets/noise-cotton.svg), linear-gradient(to right, #F7EBDB 50%, #FFF 50%);
  }
}
</style>
