<template lang="pug">
.overview.limited(:class='{ heath: type == "p", teal: type == "d", kashmir: type == "a" }')
  .title
      h1.text-colored Tour Overview
      p {{overview.description}}
  .content 
    .icon-description
      .icon-parent
        iconsSleep(:color="color").icon
      p {{overview.sleep}}
    .icon-description
      .icon-parent
        iconsLanguage(:color="color").icon
      p {{overview.languages}}
    .icon-description
      .icon-parent
        iconsTransport(:color="color").icon
      p {{overview.transport}}
    .icon-description
      .icon-parent
        iconsPlaces(:color="color").icon
      p {{overview.places}}

</template>

<script>
export default {
  	name: 'OverviewComponent',
    props: ['type'],
  data() {
    return {
      overview: {
        description: 'From the bustling markets of Marrakech, to the blue streets of Chefchaouen and the tranquil beauty of the Sahara - this tour is for those who want it all, and have some time to spend exploring the best of Morocco at a slower pace',
        sleep: 'Carefully selected hotels, Kasbahs, Riads. Includes one night in a traditional Berber desert camp',
        transport: 'Air-conditioned 4WD vehicle(s), mini bus or motor-coach',
        languages: 'Qualified multi-language guide fluent in English, French, Spanish',
        places: 'Casablanca, Rabat, Chefchaouen, Fes, Merzouga (Sahara Desert) Ouarzazate, Marrakech, Essaouria'
      },
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