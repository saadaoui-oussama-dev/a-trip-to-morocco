<template lang="pug">
.day
  .day-parent
    .day-number.border-colored.text-colored Day {{ day.number }}
  .info-parent
    .image-parent
      .img(:style='`background-image:url("${day.image}")`')
    .line-parent
      .line.bg-colored
      iconsArrow.arrow(
        v-if='arrow',
        :color='type == "p" ? "#3D0E1B" : type == "d" ? "#025B63" : type == "a" ? "#4D5A8E" : ""'
      )
    .content-parent
      .content
        h3.text-colored {{ day.title }}
        p {{ day.description }}
</template>

<script>
export default {
  name: 'DayComponent',
  props: ['day', 'arrow', 'type'],
}
</script>

<style scoped>
h3,
p {
  @apply m-0;
}
.day {
  @apply flex flex-col items-center;
}
.day-parent {
  @apply min-w-min min-h-min;
}
.day-number {
  @apply whitespace-nowrap flex justify-center items-center w-12 h-12  rounded-full border  font-medium;
  @apply sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 sm:text-sm md:text-base lg:text-lg;
}
.info-parent {
  @apply flex flex-col-reverse  justify-center gap-0;
  @apply sm:flex-row sm:gap-8 lg:gap-16;
}
.image-parent,
.content-parent {
  @apply flex justify-center items-center py-3;
  @apply sm:py-6;
}
.img {
  @apply bg-cover bg-center h-48;
  @apply sm:h-48 md:h-64 lg:h-80;
}
.img,
.content {
  @apply w-80;
  @apply sm:w-64 md:w-80 lg:w-96 xl:w-120;
}
.line-parent {
  @apply hidden  flex-col justify-center items-center relative;
  @apply sm:flex;
}
.line {
  @apply w-px h-full;
}
.line-parent .arrow {
  @apply absolute -bottom-0.5 w-3.5;
}

.content h3 {
  @apply text-lg  font-medium text-center  mb-4;
  @apply sm:text-base md:text-lg lg:text-2xl sm:text-left sm:mb-8;
}
.content p {
  @apply text-stone font-normal text-xs  text-center;
  @apply md:text-xs lg:text-sm sm:text-left;
}
</style>