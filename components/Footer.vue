<template lang="pug">
.footer
  .content(ref="navTop")
    P © COPYRIGHT 2021 - A TRIP TO MOROCCO
    .contact
        iconsTripAdvisor(color="#F7EBDB")
        iconsFacebook(color="#F7EBDB")
        iconsInstagram(color="#F7EBDB")
        iconsWhatsapp(color="#F7EBDB")
</template>

<script>
export default {
	name: 'FooterComponent',
}
</script>

<style scoped>
.footer {
  @apply w-full px-2 sm:px-6 lg:px-10 flex justify-center items-center bg-heath;
}
.content {
  @apply w-full max-w-6xl py-4 flex justify-between items-center;
}
.contact {
  @apply flex items-center gap-2 sm:gap-4;
}
p {
  @apply m-0 text-albescent;
  font-size: 11px;
}
.contact svg {
  @apply w-4 h-4;
}
</style>
