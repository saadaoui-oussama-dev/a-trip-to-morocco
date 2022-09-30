<template lang="pug">
div
  Navbar
  Banner
  PostsList(title='Our Private Trips' list='PRIVATE_TRIPS')
  Slider
  PostsList(title='Our Day Trips' list='DAY_TRIPS')
  PostsList(title='Our Activities' list='ACTIVITIES')
  Gallery
  .section-7
    .content
      Feedback
      City(v-for="(city, index) in $store.getters['cities/GET_CITIES']" :key="index" :city="city")
      ContactUsForm
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ store }) {
    let trips = await store.dispatch('trips/SET_PRIVATE_TRIPS')
    trips = await store.dispatch('trips/SET_DAY_TRIPS')
    trips = await store.dispatch('trips/SET_ACTIVITIES')
    let gallery = await store.dispatch('gallery/SET_GALLERY')
    let cities = await store.dispatch('cities/SET_CITIES')
  }
}
</script>

<style scoped>
.section-7 {
  @apply w-full max-w-page m-auto flex justify-center bg-albescent;
  background: url(~/assets/noise-cotton.svg), linear-gradient(to bottom, #F7EBDB 50%, #FFF 50%);
}
.section-7 .content {
  @apply w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2;
}
@media (min-width: 640px) {
  .section-7 {
    background: url(~/assets/noise-cotton.svg), linear-gradient(to right, #F7EBDB 50%, #FFF 50%);
  }
}
</style>
