<template lang="pug">
div
  Navbar.bg-albescent
  landingBanner
  landingPostsList(title='Our Private Trips' list='PRIVATE_TRIPS')
  landingSlider
  landingPostsList(title='Our Day Trips' list='DAY_TRIPS')
  landingPostsList(title='Our Activities' list='ACTIVITIES')
  landingGallery
  landingGallerySlider
  .section-7
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
  @apply w-full max-w-page m-auto flex justify-center mb-12;
}
.section-7 .content {
  @apply w-full max-w-page grid grid-cols-1 sm:grid-cols-2;
}
</style>
