<template lang="pug">
.navbar
  .nav-top(ref="navTop")
    .icons
      img(src="~/assets/logo.svg")
      .contact
        iconsTripAdvisor
        iconsTwitter
        iconsFacebook
        iconsInstagram
        iconsWhatsapp
    iconsMore.more(@click.native="toggleOptions")
    .back(@click="toggleOptions")
    .pages
      .ant-btn.glass Private Tours
      .ant-btn.glass Guided Tours
      .ant-btn.glass Activities
      .ant-btn.glass About Us
      .ant-btn.heath.contact-us contact Us
      .flex-grow(@click="toggleOptions")
</template>

<script>
export default {
	name: 'NavbarComponent',
  methods: {
    toggleOptions() {
      this.$refs.navTop.classList.toggle('visible')
    },
  }
}
</script>

<style scoped>
.navbar {
  @apply w-full px-2 sm:px-6 lg:px-10 sticky -top-4 lg:-top-6 z-50 flex justify-center bg-albescent;
}
.nav-top {
  @apply w-full max-w-6xl pt-7 pb-3 lg:pt-10 lg:pb-4 flex justify-between items-center;
}
.icons {
  @apply flex gap-4 sm:gap-7;
}
.icons img {
  @apply h-8 sm:h-12;
}
.contact {
  @apply flex items-center gap-2 sm:gap-4;
}
.more {
  @apply lg:hidden;
}
.pages {
  @apply h-screen pt-4 px-0.5 fixed top-0 right-0 flex flex-col gap-2 bg-albescent;
  @apply lg:h-auto lg:p-0 lg:static lg:flex-row lg:items-center lg:gap-6;
  transition: transform 0.3s ease-in-out;
  transform: translateX(105%);
}
.visible .pages {
  transform: translateX(0%);
}
.pages .ant-btn {
  @apply py-3 px-8;
  @apply lg:py-1 lg:px-2;
}
.pages .contact-us {
  @apply lg:py-2.5 lg:px-9;
}
.back {
  @apply w-0 h-screen fixed top-0 right-0;
}
.visible .back {
  @apply w-screen lg:w-0;
}
.icons div,
.pages div,
.more,
.back {
  cursor: pointer;
}
@media (min-width: 1024px) {
  .pages {
    transition: none;
    transform: none !important;
  }
}
</style>
