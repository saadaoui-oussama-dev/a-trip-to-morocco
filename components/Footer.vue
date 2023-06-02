<template lang="pug">
.limited
  .content(ref="navTop")
    p © COPYRIGHT {{ new Date().getFullYear() }}
    .contact
        iconsTripAdvisor(color="#F7EBDB" @click.native="goTo('https://www.tripadvisor.com/Profile/a_triptomorocco')")
        iconsTikTok(color="#F7EBDB" @click.native="goTo('https://www.tiktok.com/@a_triptomorocco?is_from_webapp=1&sender_device=pc')")
        iconsInstagram(color="#F7EBDB" @click.native="goTo('https://www.instagram.com/a_triptomorocco/')")
        iconsWhatsapp(color="#F7EBDB" @click.native="goTo('https://api.whatsapp.com/send/?phone=212650961499&text&type=phone_number&app_absent=0')")
</template>

<script>
export default {
  name: 'FooterComponent',
  methods: {
    goTo(target) {
      window.open(target, '_blank')
    },
  },
}
</script>

<style scoped>
.limited {
  @apply max-w-full items-center bg-heath;
}
.content {
  @apply py-4 flex justify-between items-center;
}
.contact {
  @apply flex items-center gap-2 sm:gap-4;
}
p {
  @apply m-0 text-albescent;
  font-size: 11px;
}
.contact svg {
  @apply h-4;
}
</style>
