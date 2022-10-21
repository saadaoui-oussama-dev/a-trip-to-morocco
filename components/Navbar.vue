<template lang="pug">
.navbar.limited
  .content(ref="navTop")
    .icons
      iconsLogo
      .contact
        iconsTripAdvisor
        iconsTwitter
        iconsFacebook
        iconsInstagram
        iconsWhatsapp
    iconsMore.more(@click.native="toggleOptions")
    .back(@click="toggleOptions")
    .pages
      .ant-btn.under(
        @click="goTo('#private-trips')"
        :class="{ current: currentSection == '#private-trips' }"
      ) Private Tours
      .ant-btn.under(
        @click="goTo('#day-trips')"
        :class="{ current: currentSection == '#day-trips' }"
      ) Guided Tours
      .ant-btn.under(
        @click="goTo('#activities')"
        :class="{ current: currentSection == '#activities' }"
      ) Activities
      .ant-btn.under About Us
      .ant-btn.heath.contact-us(@click="goTo('#contact-us')") Contact Us
      .flex-grow(class="lg:hidden" @click="toggleOptions")
</template>

<script>
export default {
	name: 'NavbarComponent',
  data() {
    return {
      currentSection: '',
    }
  },
  methods: {
    toggleOptions() {
      this.$refs.navTop.classList.toggle('visible')
    },
    goTo(target) {
      try {
        this.toggleOptions()
        document.querySelector(target).scrollIntoView()
      } catch {
        this.$router.push(`/${target}`)
      }
    },
    detectCurrantSection() {
      try {
        let sections = ['#activities', '#day-trips', '#private-trips'],
        halfScreen = (window.innerHeight - document.querySelector('.navbar').getBoundingClientRect().bottom) / 2,
        currentSection = ''
        for (let section of sections) {
          let top = document.querySelector(section).getBoundingClientRect().top,
          bottom = document.querySelector(section).getBoundingClientRect().bottom
          if (top <= halfScreen) {
            currentSection = (bottom <= halfScreen) ? '' : section
            break
          }
        }
        this.currentSection = currentSection;
      } catch {}
    },
  },
  async mounted() {
    document.addEventListener('scroll', this.detectCurrantSection)
  }
}
</script>

<style scoped>
.navbar {
  @apply max-w-full sticky -top-4 lg:-top-6 z-40;
  transition: all 0.15s linear;
}
.navbar.fix {
  @apply fixed;
}
.content {
  @apply max-w-full pt-7 pb-3 lg:pt-10 lg:pb-4 flex justify-between items-center;
}
.icons {
  @apply flex gap-4 sm:gap-7;
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
.fix .pages {
  @apply lg:bg-transparent;
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
.pages .under {
  @apply bg-transparent text-heath;
}
.pages .under::after {
  content: '';
  @apply w-0 h-px absolute bg-heath bottom-0 left-1/2;
  transform: translateX(-50%);
}
.pages .under:hover::after,
.pages .ant-btn.current::after {
  @apply w-4/5;
  transition: width 0.35s;
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
