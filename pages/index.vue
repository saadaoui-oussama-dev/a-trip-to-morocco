<template lang="pug">
div
  Navbar
  Banner
  PostsList(title='Our Private Trips' list='PRIVATE_TRIPS')
  Banner
  PostsList(title='Our Day Trips' list='DAY_TRIPS')
  PostsList(title='Our Activities' list='ACTIVITIES')
  Gallery
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ store }) {
    let trips = await store.dispatch('trips/SET_PRIVATE_TRIPS')
    trips = await store.dispatch('trips/SET_DAY_TRIPS')
    trips = await store.dispatch('trips/SET_ACTIVITIES')
    let gallery = await store.dispatch('gallery/SET_GALLERY')
  }
}
</script>
