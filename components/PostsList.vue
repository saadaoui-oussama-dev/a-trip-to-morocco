<template lang="pug">
.list
  .content(:class="{heath: list == 'PRIVATE_TRIPS', teal: list == 'DAY_TRIPS', kashmir: list == 'ACTIVITIES' }")
    h2.title.text-colored {{ title }}
    .posts
      Post(v-for="(trip, index) in $store.getters[`landing/GET_VISIBLE_${list}`]" :key="index" :post="trip")
    .actions.relative.flex.items-center(v-if="$store.getters[`landing/GET_${list}`].length > 6")
      .hr.absolute.w-full
      .buttons
        .bord(v-if="$store.getters[`landing/GET_VISIBLE_${list}`].length > 6")
          .ant-btn.glass.text-stone(@click="$store.dispatch('landing/ADD_TO_LIST', { list, status: 1 })") show less
        .bord(v-else-if="$store.getters[`landing/GET_VISIBLE_${list}`].length <= 6 && $store.getters[`landing/GET_${list}`].length > 18")
          .ant-btn.glass.text-stone(@click="$store.dispatch('landing/ADD_TO_LIST', { list, status: 2 })") show more
        .bord(v-else)
          .ant-btn.glass.text-stone(@click="$store.dispatch('landing/ADD_TO_LIST', { list, status: 3 })") show all
        .bord(v-if="$store.getters[`landing/GET_${list}`].length > 18 && $store.getters[`landing/GET_VISIBLE_${list}`].length > 6 && $store.getters[`landing/GET_VISIBLE_${list}`].length <= 18")
          .ant-btn.glass.text-stone(@click="$store.dispatch('landing/ADD_TO_LIST', { list, status: 3 })") show all
</template>

<script>
export default {
  name: 'PostsListComponent',
  props: ['title', 'list'],
}
</script>

<style scoped>
.list {
  @apply w-full px-2 flex justify-center bg-cotton;
  background-image: url(~/assets/zellige.svg);
  @apply sm:px-6 lg:px-10;
}
.content {
  @apply w-full max-w-6xl mt-10 pb-14;
  @apply sm:pb-24 sm:mt-12 md:mt-16;
}
.title {
  @apply text-4xl mb-9;
  @apply sm:text-6xl lg:text-7xl xl:text-8xl;
}
.posts {
  @apply grid grid-cols-2 gap-y-3 gap-x-2;
  @apply md:grid-cols-3 md:gap-y-14 md:gap-x-11;
}
.actions {
  @apply mt-9 sm:mt-14;
}
.buttons {
  @apply w-full ml-7 grid grid-cols-2;
  @apply sm:ml-10 sm:grid-cols-3;
}
.bord {
  @apply w-28;
  padding: 1.1px;
}
.kashmir .bord {
  @apply bg-kashmir;
}
.teal .bord {
  @apply bg-teal;
}
.heath .bord {
  @apply bg-heath;
}
.actions .ant-btn {
  @apply w-full h-full py-1 px-4 bg-cotton;
  @apply sm:py-1.5 sm:px-4;
}
.actions .ant-btn:hover,
.actions .ant-btn:focus,
.actions .ant-btn:active {
  background: #f1eee9;
}
.hr {
  height: 1px;
}
.kashmir .hr {
  @apply bg-kashmir;
}
.teal .hr {
  @apply bg-teal;
}
.heath .hr {
  @apply bg-heath;
}
</style>
