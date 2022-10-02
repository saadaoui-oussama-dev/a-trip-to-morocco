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
  Footer
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ store }) {
    let privateTrips = await store.dispatch('trips/SET_PRIVATE_TRIPS'),
      slides = await store.dispatch('slider/SET_SLIDES'),
      dayTrips = await store.dispatch('trips/SET_DAY_TRIPS'),
      activities = await store.dispatch('trips/SET_ACTIVITIES'),
      gallery = await store.dispatch('gallery/SET_GALLERY'),
      feedback = await store.dispatch('feedback/SET_FEEDBACKS'),
      cities = await store.dispatch('cities/SET_CITIES')
  },
}
</script>

<style scoped>
.section-7 {
  @apply w-full max-w-page m-auto flex justify-center bg-albescent;
  background: url(~/assets/noise-cotton.svg),
    linear-gradient(to bottom, #f7ebdb 50%, #fff 50%);
}
.section-7 .content {
  @apply w-full max-w-page grid grid-cols-1 sm:grid-cols-2;
}
@media (min-width: 640px) {
  .section-7 {
    background: url(~/assets/noise-cotton.svg),
      linear-gradient(to right, #f7ebdb 50%, #fff 50%);
  }
}
</style>
