<template lang="pug">
.contact-us-form
  div
    h1 Cantact Us
    .contacts
      div
        iconsPhone(color="#3D0E1B")
        span +212 674 271 222
      div
        iconsWhatsapp(color="#3D0E1B")
        span +212 674 271 222
      div
        iconsMessage(color="#3D0E1B")
        span contact@atriptomoroco.com
    p.address Angle boulevard Emile Zola et Rue Rethel 7éme Étage N°20 Casablanca 20300 Morocco
  div.form
    .info.mb-4
      div
        p FULL NAME
        input(placeholder="FULL NAME")
      div
        p EMAIL
        input(placeholder="EMAIL")
    .message.mb-4
      div
        p MESSAGE
        textarea(placeholder="MESSAGE" rows="5")
    .ant-btn Send
</template>

<script>
export default {
  name: 'ContactUsFromComponent',
}
</script>

<style scoped>
.contact-us-form {
  @apply min-h-184 sm:min-h-152 lg:min-h-184 flex justify-center items-center flex-col;
}
h1 {
  @apply text-2xl text-center mb-2 text-heath;
  @apply sm:text-3xl lg:text-4xl;
}
.contacts {
  @apply mb-1 flex justify-center gap-3 sm:gap-1 md:gap-3;
}
.contacts div {
  @apply flex items-center gap-1 sm:gap-0.5 md:gap-1;
}
svg {
  @apply inline-block;
}
.contacts span {
  @apply text-heath;
  font-size: 11px;
}
.address {
  @apply text-center text-xs mb-8 px-5;
  color: #333;
}
.form {
  @apply w-full px-2 sm:px-4 md:px-2 lg:px-16 relative;
}
.info {
  @apply grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-3;
}
.form p {
  @apply mb-0.5 px-2;
}
.form .ant-btn {
  @apply w-28 py-1 px-4 absolute right-2 bg-albescent text-base text-heath;
  @apply sm:py-1.5 sm:px-4 sm:right-4 md:right-2 lg:right-16;
}
</style>
