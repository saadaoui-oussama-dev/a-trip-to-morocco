<template lang="pug">
div
  Navbar
  Banner
  PostsList(title='Our Private Trips' list='PRIVATE_TRIPS')
  Banner
  PostsList(title='Our Day Trips' list='DAY_TRIPS')
  PostsList(title='Our Activities' list='ACTIVITIES')
  Banner
</template>

<script>
export default {
  name: 'IndexPage',
  middleware: 'set-all-trips',
}
</script>
