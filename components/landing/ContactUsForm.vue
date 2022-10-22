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
  div.form(:class="!valid ? 'require-error':''")
    .info.mb-4
      .input(:class="!validator.firstName ? 'require-error':''")
        p FIRST NAME
        input(placeholder="FIRST NAME" ref='firstName')
      .input(:class="!validator.lastName ? 'require-error':''")
        p LAST NAME
        input(placeholder="LAST NAME" ref='lastName')
      .input(:class="!validator.email ? 'require-error':''")
        p EMAIL
        input(placeholder="EMAIL" ref='email')
      .input(:class="!validator.phone ? 'require-error':''")
        p PHONE
        input(placeholder="PHONE" ref='phone')
    .message.mb-4
      .input(:class="!validator.message ? 'require-error':''")
        p MESSAGE
        textarea(placeholder="MESSAGE" rows="5" ref='message')
    .ant-btn(v-if="spinActive" style="background-color: #f8e1c3")
      a-spin
    .ant-btn(v-else @click="validateForm") Send
    p()
</template>

<script>
import Validator from '../../plugins/Validator'

export default {
  name: 'ContactUsFromComponent',
  data() {
    return {
      spinActive: false,
      from: {},
      validator: {
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        message: true,
      },
      valid: true,
    }
  },
  methods: {
    validateForm() {
      this.spinActive = true
      this.valid= true
      Object.keys(this.validator).map(attr => {
        this.validator[attr] = true
      })
      setTimeout(() => {
        let res  = Validator.schema({
          latinText_alpha_extra: [this.$refs.firstName],
          latinText_alpha_extra_: [this.$refs.lastName],
          email: [this.$refs.email],
          phone: [this.$refs.phone],
          latinText_complexe_extra: [this.$refs.message],
          required: [null, this.$refs],
        })
        this.valid = res.valid
        Object.keys(this.validator).map((attr,index) => {
        this.validator[attr] = res.details[index].valid && res.details[5].details[index].valid
      }) 

        
        // this.valid.lastName = Validator.latinText.alpha('lastName', this.$refs, 'value', true).valid
        // // 'Last name is not valid'
        // this.valid.firstName = Validator.latinText.alpha('firstName', this.$refs, 'value', true).valid
        // // 'First name is not valid'
        // this.valid.message = Validator.latinText.complexe('message', this.$refs, 'value', true).valid
        // // 'Some characters in the message are unacceptable'
        // this.valid.email = Validator.email(this.$refs.email).valid
        // // 'email is not valid'
        // this.valid.phone = Validator.phone.normal(this.$refs.phone).valid
        
        // this.valid.all = Validator.required(null, this.$refs).valid
        // 'all inputs are required'
        this.spinActive = false
      },700)
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
.form.require-error::before {
  @apply absolute text-xs text-red-600 left-0 bottom-0;
  content: "There is an error in some fields";
  animation: error 0.5s;
}
.input.require-error input,
.input.require-error textarea {
  @apply border-red-600 border-solid border;
}
.input.require-error input,
.input.require-error p{
  @apply text-red-600;
}
.input.require-error p {
  animation: error 0.5s;
}
@keyframes error {
  59% {
    margin-left: 0;
  }

  60%,
  80% {
    margin-left: 3px;
  }
  70%,
  90% {
    margin-left: -3px;
  }
}
</style>
