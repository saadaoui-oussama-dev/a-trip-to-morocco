<template lang="pug">
div(class="flex items-end justify-center md:justify-between")
    .mb-16
        div(class="flex flex-col gap-16 mb-36")
            div(class="flex flex-col gap-5 items-center md:items-start")
                h1(class="font-DavidLibre text-center text-heath text-3xl max-w-xs m-0 xl:text-left xl:text-9xl lg:text-8xl md:text-7xl sm:text-4xl xl:w-auto lg:max-w-3xl md:max-w-xl sm:max-w-xs") Expolre a colorful Morocco
                div(class="flex flex-col  gap-4 max-w-lg items-center md:items-start ")
                    p(class="text-sm text-stone m-0 text-center md:text-left") We are experts at creating a Moroccan experience perfectly tailored to our guests needs. These are some of our most popular itineraries, and they may be customized to the utmost extent of your imaginations.
                    .ant-btn.heath Book a trip now
            div(class="flex flex-col gap-0.5 items-center md:items-start")
                div(class="flex gap-1 items-center")
                    iconsPhone(color="#3D0E1B")
                    p(class="text-heath text-sm m-0") +212 674 271 222
                div(class="flex gap-1 items-center")
                    iconsMessage(color="#3D0E1B")
                    p(class="text-heath text-sm m-0") contact@atriptomoroco.com
        iconsArrowDown(color="#3D0E1B" class="mx-auto md:mx-0")
    img(src="~/assets/images/Header/1.png" class="hidden relative -right-16 md:block")

</template>

<script>
export default {
  name: 'BannerComponent',
}
</script>

<style scoped>
.ant-btn {
  @apply text-albescent w-max py-3 px-8 md:py-4 md:px-10;
}
</style>
