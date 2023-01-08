<template lang="pug">
.parent(v-if='show')
  .ant-btn.close(@click='change') CLOSE
  .slider
    .slide(v-show='current == 0')
      .parent-title
        span.title Let's start with your name.
        span.description Please fill in the details below so that we can get in contact with you about your trip.
      .inputs
        span.lable ENTER YOUR NAME
        input.input(v-model='fullName')
        p.error-message(v-show="!this.validator.test('fullName')") {{ this.validator.schema.fullName.error }}
      .ant-btn.next(@click='next("fullName")') Get Started

    .slide(v-show='current == 1')
      .parent-title
        span.title Traveling with?
        span.description Please select the option that best describes your trip.
      .inputs
        a-radio-group.radio-group(v-model:value='travelWith')
          a-radio-button.booking(
            v-for="option in ['Travel with Friends', 'Family Travel', `Honeymoon or Couple's Trip`, 'Solo Adventure']",
            :key="option",
            :value="option"
          )
            .radio-content
              .checked
              span.text {{ option }}
        p.error-message(v-show="!this.validator.test('travelWith')") {{ this.validator.schema.travelWith.error }}
      .btns
        .ant-btn.prev(@click='prev') Back
        .ant-btn.next(@click='next("travelWith")') Next

    .slide(v-show='current == 2 && travelWith != "Solo Adventure"')
      .parent-title
        span.title How many people are arriving?
        span.description Please select the option that best describes your trip.
      .inputs
        span.lable SELECT A NUMBER
        a-row
          .a-row
            a-col(:span='12')
              a-slider(v-model:value='peopleNumber', :min='2', :max='20', :trackStyle="{ backgroundColor: '#1890ff'}")
            a-col(:span='4')
              a-input-number(v-model:value='peopleNumber', :min='2', :max='20')
      .btns
        .ant-btn.prev(@click='prev') Back
        .ant-btn.next(@click='next("peopleNumber")') Next

    .slide(
      v-show='(current == 2 && travelWith == "Solo Adventure") || (current == 3 && travelWith != "Solo Adventure")'
    )
      .parent-title
        span.title When are you looking to travel?
        span.description Let us know when we can expect you.
      .inputs
        span.lable ENTER YOUR TRAVEL DATES
        a-space(direction='vertical', :size='24')
          a-date-picker.booking(
            :disabled-date='disabledDate',
            format='DD-MM-YYYY',
            v-model='date.object'
          )
        p.error-message(v-show="!this.validator.test('date')") {{ this.validator.schema.date.error }}
        p.error-message(v-show="'date' in this.validator.schema && !this.validator.schema.date.valid") {{ this.validator.schema.date.error }}
      .btns
        .ant-btn.prev(@click='prev') Back
        .ant-btn.next(@click='next("date")') Next

    .slide(
      v-show='(current == 3 && travelWith == "Solo Adventure") || (current == 4 && travelWith != "Solo Adventure")'
    )
      .parent-title
        span.title Traveling or work?
        span.description Please select the option that best describes your trip.
      .inputs
        a-radio-group.radio-group(v-model:value='travelType')
          a-radio-button.booking(value='traveling')
            .radio-content
              .checked
              span.text Traveling
          a-radio-button.booking(value='work')
            .radio-content
              .checked
              span.text Work
        p.error-message(v-show="!this.validator.test('travelType')") {{ this.validator.schema.travelType.error }}
      .btns
        .ant-btn.prev(@click='prev') Back
        .ant-btn.next(@click='next("travelType")') Next

    .slide(
      v-show='(current == 4 && travelWith == "Solo Adventure") || (current == 5 && travelWith != "Solo Adventure")'
    )
      .parent-title
        span.title How can we contact you?
        span.description Thanks for taking the time to complete this form. Please enter your contact details below and we will be in touch within 48 hours.
      .inputs
        span.lable EMAIL
        input.input(v-model='email')
        .input-space
        span.lable PHONE NUMBER
        input.input(v-model='phone')
        p.error-message(v-show="!this.validator.valid") {{ this.validator.error }}
      .btns
        .ant-btn.prev(@click='prev') Back
        .ant-btn.next(@click='validateForm') Submit

  a-steps.progress(progress-dot, :current='current')
    a-step
    a-step
    a-step(v-if='travelWith != "Solo Adventure"')
    a-step
    a-step
    a-step
</template>

<script>
import dayjs from 'dayjs'
import { Validator } from '~/plugins/Validator'
import bookTripMutation from '~/apollo/book-trip/create.gql'

export default {
  name: 'BookingTrip',
  props: ['type', 'show', 'id'],
  data() {
    return {
      current: 0,
      fullName: '',
      travelWith: '',
      peopleNumber: 2,
      date: {
        string: "",
        object: null
      },
      travelType: '',
      email: '',
      phone: '',
      validator: new Validator('There is an error in some fields', 2, ['string'])
        .setSchema([{
          _: { methods: 'required', error: 'There is an error in this field' },
          fullName: 'textAlpha(one)',
          peopleNumber: 'integer',
          date: 'text',
          email: 'email',
          phone: 'phone',
        }, {
          _: { methods: 'required', error: 'Please select an option' },
          travelWith: 'textAlpha(one)',
          travelType: 'text',
        }]).setMinTimeout(1),
    }
  },
  watch: {
    travelWith(newValue) {
      this.peopleNumber = newValue == 'Solo Adventure' ? 1 : 2
    },
    'date.object' (newValue) {
      this.date.string = newValue._d
        .toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }).replaceAll('/', '-')
    }
  },
  mounted() {
    this.validator.finalize(this)
  },
  methods: {
    disabledDate(now) {
      return now && now < dayjs().endOf('day')
    },
    next(currentSlide) {
      if (this.validator.execute(currentSlide)) {
        this.current ++
      }
    },
    prev() {
      this.current --
    },
    change() {
      this.$emit('booking', false)
    },
    validateForm() {
      // this.spinActive = true
      // this.state = 0
      let validForm = this.validator.execute()
      setTimeout(async () => {
        if (validForm) {
          try {
            let res = await this.$apollo.provider.defaultClient.mutate({
              mutation: bookTripMutation,
              variables: {
                fullName: this.fullName,
                travelWith: this.travelWith,
                peopleNumber: Number(this.peopleNumber),
                date: this.date.string,
                travelType: this.travelType,
                email: this.email,
                phone: this.phone,
                trip: this.type + "-" + this.id,
              },
              fetchPolicy: 'no-cache',
            })
            // this.state = 1
            // setTimeout(() => {
              // this.state = 0
            // }, 15000)
          } catch {
            this.validator.valid = false
            this.validator.error = 'There is a problem connecting to the internet'
          }
        }
        // this.spinActive = false
      }, 700)
    },
  },
}
</script>

<style scoped>
.parent {
  @apply h-screen w-full z-50 fixed bg-cotton;
  background-image: url('~/assets/images/zellige.svg');
}
.parent .close {
  @apply absolute right-4 top-4 sm:right-8 sm:top-8 bg-transparent text-heath text-xs sm:text-base font-semibold;
}
.slider {
  @apply absolute top-1/2 left-1/2 w-full sm:w-96 lg:w-120 p-8 sm:p-0;
  transform: translate(-50%, -50%);
}
.slide {
  animation: 1s ease-in-out show;
}
.parent-title {
  @apply flex flex-col gap-3 mb-20;
}
.title {
  @apply text-2xl sm:text-3xl font-semibold;
}
.description {
  @apply text-xs sm:text-sm text-stone-50;
}
.inputs {
  @apply relative flex flex-col gap-2 mb-10;
}
.lable {
  @apply text-stone-50 font-medium text-xs sm:text-sm;
}
.input {
  @apply py-3 border border-solid border-heath text-base;
}
.input-space {
  @apply mb-3;
}
.btns {
  @apply flex gap-1;
}
.next {
  @apply w-full py-3;
}
.prev {
  @apply bg-stone-50 py-3;
}
.radio-group {
  @apply flex flex-col gap-3;
}
.progress {
  @apply w-full sm:w-120 absolute min-h-min min-w-min  bottom-5 left-1/2;
  transform: translate(-50%, -50%);
}
.ant-radio-button-wrapper.booking {
  box-shadow: 0px 0px 10px -1px #00000040;
}
.radio-content {
  @apply flex gap-7 items-center;
}
.radio-content .text {
  @apply text-sm sm:text-base font-semibold uppercase;
}
.ant-radio-button-wrapper.booking .checked {
  @apply w-5 h-5 bg-stone-50 rounded-full;
}
.ant-radio-button-wrapper.ant-radio-button-wrapper-checked.booking .checked {
  @apply bg-heath;
}
.a-row {
  @apply flex w-full;
}
.ant-col-12 {
  @apply w-5/6 pr-5 pl-2;
}
.ant-col-12 .ant-slider {
  @apply mx-0;
}
.ant-col-4 {
  @apply w-1/6;
}
.ant-col-4 .ant-input-number {
  @apply w-full rounded-none;
}
.error-message {
  @apply w-full absolute text-sm text-red-600 left-0 -bottom-6 m-0;
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
@keyframes show {
  0% {
    transform: translateY(5%);
    opacity: 0;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}
</style>
