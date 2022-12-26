<template lang="pug">
.banner(:style='`background-image:url("${trip.banner}")`')
  .parnet-content.bg-colored
    .title-info
      h1.title {{ trip.title }}
      .info 
        .parnet-price
          iconsPrice.icon
          p.price
            span STARTING FROM
            | &nbsp;${{ trip.price }}
        .parnet-duration
          iconsDuration.icon
          p.duration {{ trip.duration }} DAYS
        .parnet-point
          iconsPosition.icon
          p.point {{ trip.mainPlace }}
    .contact-book.albescent
      .contact
        .phone
          iconsPhoneSolid.icon(color='#F7EBDB')
          p +212 06xxxxxxxx
        .email
          iconsEmail.icon
          p contact@atriptomorocco.com
      .ant-btn.text-colored(@click='change') Book a trip now
</template>

<script>
export default {
  name: 'BannerComponent',
  props: ['trip'],
  methods:{
    change()
    {
      this.$emit('booking',true)
    }
  }
}
</script>

<style scoped>
h1,
p {
  @apply m-0 p-0;
}
.banner {
  @apply min-h-screen bg-cover bg-center relative text-albescent;
}
.parnet-price,
.parnet-duration,
.parnet-point,
.phone,
.email {
  @apply flex items-center gap-3;
}
.icon {
  @apply w-3 sm:w-4 lg:w-4 h-auto;
}
.parnet-content {
  @apply w-full absolute bottom-0 flex flex-col gap-4 sm:gap-8 sm:flex-row justify-between items-center  bg-opacity-50 px-8 py-8;
  @apply px-0 sm:px-8 sm:py-8 lg:px-16 lg:py-12;
  mix-blend-mode: normal;
  backdrop-filter: blur(5px);
}
.title-info {
  @apply flex flex-col gap-4 sm:gap-12 justify-between items-center sm:items-start;
}
.title-info > .title {
  @apply font-bold text-albescent text-lg;
  @apply sm:text-lg lg:text-4xl;
}
.contact-book {
  @apply flex flex-col gap-4 sm:gap-12 justify-between items-center sm:items-start;
}
.contact {
  @apply flex flex-col gap-3 items-center sm:items-start;
}
.contact p {
  @apply text-xs lg:text-sm;
}
.info {
  @apply flex items-center gap-8;
  @apply sm:gap-8 lg:gap-16;
}
.info .price span {
  @apply text-xs font-medium;
}
.info p {
  @apply text-xs lg:text-base font-semibold sm:font-medium;
}
.contact-book > .ant-btn {
  @apply font-semibold text-xs px-16 py-2.5;
  @apply lg:text-sm sm:px-16 sm:py-2.5 lg:px-16 lg:py-2.5;
}
</style>
