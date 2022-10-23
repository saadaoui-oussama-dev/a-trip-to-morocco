<template lang="pug">
.days.limited
  .content
    h1.text-colored Tour Itinerary
    p We are experts at creating a Moroccan experience perfectly tailored to our guest's needs. These are some of our most popular itineraries, and they may be customized to the utmost extent of your imagination
  .list
    tripsDay(
      v-for='(day, index) in days',
      :key='index',
      :day='day',
      :arrow='index == days.length - 1',
      :type='type'
    )
</template>

<script>
export default {
  name: 'DaysComponent',
  props: ['days', 'type'],
}
</script>

<style scoped>
.days {
  @apply flex flex-col items-center py-28 bg-albescent;
}
.content {
  @apply flex flex-col items-center gap-8 max-w-xs mb-32;
  @apply sm:max-w-sm md:max-w-lg lg:max-w-lg;
}
.content h1 {
  @apply m-0 p-0 text-4xl;
  @apply md:text-5xl lg:text-6xl;
}
.content p {
  @apply m-0 p-0 text-xs text-stone text-center;
  @apply md:text-sm;
}
.list {
  @apply flex flex-col gap-10;
  @apply sm:gap-0;
}
</style>
