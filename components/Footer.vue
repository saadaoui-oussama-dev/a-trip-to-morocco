<template lang="pug">
.limited
  .content(ref="navTop")
    p © COPYRIGHT {{ new Date().getFullYear() }}
    .contact
        iconsTripAdvisor(color="#F7EBDB" @click.native="goTo('https://example.com/')")
        iconsTikTok(color="#F7EBDB" @click.native="goTo('https://example.com/')")
        iconsInstagram(color="#F7EBDB" @click.native="goTo('https://example.com/')")
        iconsWhatsapp(color="#F7EBDB" @click.native="goTo('https://example.com/')")
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
