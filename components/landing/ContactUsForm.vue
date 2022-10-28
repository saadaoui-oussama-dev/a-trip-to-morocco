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
  div.form(:class="{ error: state == 1, netError: state == 2, send: state == 3 }")
    .info.mb-4
      .input(:class="!valid.fname ? 'error' : ''")
        p FIRST NAME
        input(placeholder="FIRST NAME" ref='fname')
      .input(:class="!valid.lname ? 'error' : ''")
        p LAST NAME
        input(placeholder="LAST NAME" ref='lname')
      .input(:class="!valid.email ? 'error' : ''")
        p EMAIL
        input(placeholder="EMAIL" ref='email')
      .input(:class="!valid.phone ? 'error' : ''")
        p PHONE
        input(placeholder="PHONE" ref='phone')
    .message.mb-4
      .input(:class="!valid.message ? 'error' : ''")
        p MESSAGE
        textarea(placeholder="MESSAGE" rows="5" ref='message')
    .ant-btn(v-if="spinActive" style="background-color: #f8e1c3")
      a-spin
    .ant-btn(v-else-if="state != 3" @click="validateForm") Send
    .ant-btn(v-else) Wait
</template>

<script>
import Validator from '../../plugins/Validator'
import contactMutation from '~/apollo/contact/create.gql'

export default {
  name: 'ContactUsComponent',
  data() {
    return {
      spinActive: false,
      state: 0,
      valid: {
        fname: true,
        lname: true,
        email: true,
        phone: true,
        message: true,
      },
    }
  },
  methods: {
    validateForm() {
      this.spinActive = true
      this.$refs = Validator.forceChange.trim(this.$refs, 'value')
      this.$refs.lname.value = Validator.forceChange.upWord(this.$refs.lname.value)
      this.$refs.fname.value = Validator.forceChange.upWord(this.$refs.fname.value)
      this.$refs.email.value = Validator.forceChange.lower(this.$refs.email.value)
      this.state = 0
      Object.keys(this.valid).map(attr => {
        this.valid[attr] = true
      })
      let res = Validator.schema({
        latinText_alpha_extra: [this.$refs.fname],
        latinText_alpha_extra_: [this.$refs.lname],
        email: [this.$refs.email],
        phone: [this.$refs.phone],
        latinText_complexe_extra: [this.$refs.message],
      })
      setTimeout(async () => {
        Object.keys(this.valid).map((attr, index) => {
          this.valid[attr] = res.details[index].valid
        })
        if (res.valid) {
          try {
            res = await this.$apollo.provider.defaultClient.mutate({
              mutation: contactMutation,
              variables: {
                contact: {
                  fname: this.$refs.fname.value,
                  lname: this.$refs.lname.value,
                  email: this.$refs.email.value,
                  phone: this.$refs.phone.value,
                  message: this.$refs.message.value,
                }
              },
              fetchPolicy: 'no-cache',
            })
            this.state = 3
            setTimeout(() => {
              Object.keys(this.$refs).map(field => {
                this.$refs[field].value = ''
              })
              this.state = 0
            }, 15000)
          } catch(e) { this.state = 2 }
        } else { this.state = 1 }
        this.spinActive = false
      }, 700)
    }
  }
}
</script>

<style scoped>
#contact-us {
  @apply flex justify-center items-center flex-col overflow-hidden bg-white;
  @apply min-h-184 sm:min-h-152 lg:min-h-184 xl:min-h-248;
  @apply py-4 px-8 sm:px-4 md:px-3 lg:px-16;
  background-image: url(~/assets/images/noise-cotton.svg);
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
.form::before {
  @apply w-3/5 absolute text-sm text-red-600 left-0 bottom-0;
  animation: error 0.5s;
}
.form.error::before {
  content: "There is an error in some fields";
}
.form.netError::before {
  content: "There is a problem connecting to the internet";
}
.form.send::before {
  @apply text-green-600;
  content: "Message sent successfully";
}
.input.error input,
.input.error textarea {
  @apply border-red-600 border-solid border;
}
.input.error input,
.input.error p {
  @apply text-red-600;
}
.input.error p {
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
