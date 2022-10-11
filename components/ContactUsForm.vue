<template lang="pug">
#contact-us
  div.px-5
    h1 Cantact Us
    .contacts
      div
        iconsPhone(color="#3D0E1B")
        span +212&nbsp;674&nbsp;271&nbsp;222
      div
        iconsWhatsapp.iconsWhatsapp(color="#3D0E1B")
        span +212&nbsp;674&nbsp;271&nbsp;222
      div
        iconsMessage(color="#3D0E1B")
        span contact@atriptomoroco.com
    p.address Angle boulevard Emile Zola et Rue Rethel 7éme Étage N°20 Casablanca 20300 Morocco
  div.form
    .info.mb-4
      div
        p FIRST NAME
        input(placeholder="FIRST NAME" ref='firstName')
      div
        p LAST NAME
        input(placeholder="LAST NAME" ref='lastName')
      div
        p EMAIL
        input(placeholder="EMAIL" ref='email')
      div
        p PHONE
        input(placeholder="PHONE" ref='phone')
    .message.mb-4
      div
        p MESSAGE
        textarea(placeholder="MESSAGE" rows="5" ref='message')
    .ant-btn(@click="validateForm") Send
</template>

<script>
import Validator from '../plugins/Validator'

export default {
  name: 'ContactUsFromComponent',
  methods: {
    validateForm() {
      let { valid } = Validator.schema({
        required: [null, this.$refs],
        latinText_alpha_extra: [['firstName', 'lastName'], this.$refs],
        latinText_complexe_extra: [this.$refs.message],
        email: [this.$refs.email],
        phone: [this.$refs.phone],
      })
      if (valid) alert('valid'); else alert('not valid')
    }
  }
}
</script>

<style scoped>
#contact-us {
  @apply flex justify-center items-center flex-col overflow-hidden bg-white;
  @apply min-h-184 sm:min-h-152 lg:min-h-184 xl:min-h-248;
  @apply py-4 px-8 sm:px-4 md:px-3 lg:px-16;
  background-image: url(~/assets/noise-cotton.svg);
}
h1 {
  @apply text-2xl text-center mb-2 text-heath;
  @apply sm:text-3xl lg:text-4xl;
}
.contacts {
  @apply mb-1 flex justify-center gap-1 sm:gap-1 md:gap-3;
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
.iconsWhatsapp{
  width: 14px;
}
.form {
  @apply w-full relative;
}
.info {
  @apply grid grid-cols-1 md:grid-cols-2 gap-3;
}
.form p {
  @apply mb-0.5 text-xs;
}
.form .ant-btn {
  @apply w-28 py-1 px-4 float-right bg-albescent text-base text-heath;
  @apply sm:py-1.5 sm:px-4;
}
.form .ant-btn:hover,
.form .ant-btn:active,
.form .ant-btn:focus {
  background-color: #f8e1c3;
}
</style>
