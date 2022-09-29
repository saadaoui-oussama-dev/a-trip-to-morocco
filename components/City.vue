<template lang="pug">
.city
  | {{ city }}
</template>

<script>
export default {
  name: 'CityComponent',
  props: ['city'],
}
</script>

<style scoped>
.city {
  @apply min-h-184 sm:min-h-152 lg:min-h-184 bg-red-800;
}
</style>
