<template lang="pug">
.overview.limited(:class='{ heath: type == "p", teal: type == "d", kashmir: type == "a" }')
  .title
      h1.text-colored Tour Overview
      p {{ trip.description }}
  .content 
    .icon-description
      .icon-parent
        iconsSleep(:color="color").icon
      p {{ trip.housing }}
    .icon-description
      .icon-parent
        iconsLanguage(:color="color").icon
      p {{ trip.guide }}
    .icon-description
      .icon-parent
        iconsTransport(:color="color").icon
      p {{ trip.transport }}
    .icon-description
      .icon-parent
        iconsPlaces(:color="color").icon
      p {{ trip.places }}
</template>

<script>
export default {
  name: 'OverviewComponent',
  props: ['type', 'trip'],
  data() {
    return {
      color:null
    }
  },
  created() {
    this.color = this.type == "p" ? "#3D0E1B" : this.type == "d" ? "#025B63" : this.type == "a" ? "#4D5A8E" : ""
  }
}
</script>

<style scoped>
h1,
p {
  @apply m-0 p-0;
}
.overview {
  @apply flex flex-col items-center py-32;
}
.overview .title {
  @apply flex flex-col items-center gap-8 max-w-xs mb-24;
  @apply sm:max-w-sm md:max-w-lg lg:max-w-lg;
}
.overview .title > h1 {
  @apply text-4xl;
  @apply md:text-5xl lg:text-6xl;
}
.overview .title > p {
  @apply text-xs text-stone text-center;
  @apply md:text-sm;
}
.content {
  @apply grid gap-12 sm:gap-12 md:gap-12 lg:gap-20 grid-cols-1 sm:grid-cols-2 items-start w-max;
}
.icon-description{
  @apply flex gap-5 items-center w-72 sm:w-60 md:w-72 lg:w-80
}
.icon-parent{
  @apply min-w-max
}
.icon{
  @apply w-6 
}
.icon-description > p{
  @apply text-stone sm:text-xs md:text-sm
}
</style>