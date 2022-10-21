<template lang="pug">
div
  Navbar.albescent
  landingBanner
  landingPostsList(title='Our Private Trips' list='PRIVATE_TRIPS')
  landingSlider
  landingPostsList(title='Our Day Trips' list='DAY_TRIPS')
  landingPostsList(title='Our Activities' list='ACTIVITIES')
  landingGallery
  landingGallerySlider
  .section-7.limited
    .content
      landingFeedback
      landingCity(v-for="(city, index) in $store.getters['cities/GET_CITIES']" :key="index" :city="city")
      landingContactUsForm
  Footer
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ store }) {
    let privateTrips = await store.dispatch('trips/SET_LIST', 'privateTrips'),
      slides = await store.dispatch('slider/SET_SLIDES'),
      dayTrips = await store.dispatch('trips/SET_LIST', 'dayTrips'),
      activities = await store.dispatch('trips/SET_LIST', 'activities'),
      gallery = await store.dispatch('gallery/SET_GALLERY'),
      feedback = await store.dispatch('feedback/SET_FEEDBACKS'),
      cities = await store.dispatch('cities/SET_CITIES')
  },
}
</script>

<style scoped>
.section-7 {
  @apply mb-12 px-0;
}
.section-7 .content {
  @apply max-w-page grid grid-cols-1 sm:grid-cols-2;
}
</style>
