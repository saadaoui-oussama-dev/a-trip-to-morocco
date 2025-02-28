<template lang="pug">
div
  Navbar.bg-albescent
  landingBanner
  landingPostsList(title='Our Private Trips' list='PRIVATE_TRIPS')
  landingSlider(:type="1")
  landingPostsList(title='Our Day Trips' list='DAY_TRIPS')
  landingSlider(:type="2")
  landingPostsList(title='Our Activities' list='ACTIVITIES')
  landingSlider(:type="3")
  landingGallery
  landingSlider(:type="4")
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
    await store.dispatch('trips/SET_LIST', 'privateTrips')
    await store.dispatch('slider/SET_SLIDES')
    await store.dispatch('trips/SET_LIST', 'dayTrips')
    await store.dispatch('trips/SET_LIST', 'activities')
    await store.dispatch('gallery/SET_GALLERY')
    await store.dispatch('feedback/SET_FEEDBACKS')
    await store.dispatch('cities/SET_CITIES')
  },
}
</script>

<style scoped>
.section-7 {
  @apply mb-12 px-0;
}
.section-7 .content {
  @apply max-w-page mt-10 grid grid-cols-1;
  @apply sm:mt-12 md:mt-20 sm:grid-cols-2;
}
</style>
