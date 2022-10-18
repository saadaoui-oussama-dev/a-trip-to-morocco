<template lang="pug">
.list(:id="list == 'PRIVATE_TRIPS' ? 'private-trips' : list == 'DAY_TRIPS' ? 'day-trips' : 'activities'")
  .content(:class="{heath: list == 'PRIVATE_TRIPS', teal: list == 'DAY_TRIPS', kashmir: list == 'ACTIVITIES' }")
    h2.title.text-colored {{ title }}
    .posts
      Post(
        v-for="(trip, index) in visibleList"
        :key="index"
        :post="trip"
        :type="list == 'PRIVATE_TRIPS' ? 'private_trips' : list == 'DAY_TRIPS' ? 'day_trips' : 'activities'"
      )
    .actions(v-if="fullListLength > 6")
      .horizontal-line.bg-colored
      .buttons
        template(v-if="visibleList.length > 6")
          .ant-btn.glass.border-colored(@click="changeListStatus(1)") show less
        template(v-else-if="visibleList.length <= 6 && fullListLength > 18")
          .ant-btn.glass.border-colored(@click="changeListStatus(2)") show more
        .ant-btn.glass.border-colored(v-else @click="changeListStatus(3)") show all
        template(v-if="fullListLength > 18 && visibleList.length > 6 && visibleList.length <= 18")
          .ant-btn.glass.border-colored(@click="changeListStatus(3)") show all
</template>

<script>
export default {
  name: 'PostsListComponent',
  props: ['title', 'list'],
  computed: {
    fullListLength() {
      return this.$store.getters[`trips/GET_${this.$props.list}`].length
    },
    visibleList() {
      return this.$store.getters[`trips/GET_VISIBLE_${this.$props.list}`]
    }
  },
  methods: {
    changeListStatus(status) {
      let list = this.$props.list
      this.$store.dispatch('trips/CHANGE_LIST_STATUS', { list, status })
    }
  }
}
</script>

<style scoped>
.list {
  @apply w-full max-w-page m-auto px-2 flex justify-center;
  @apply sm:px-6 lg:px-10;
}
.content {
  @apply w-full max-w-6xl mt-10;
  @apply sm:mt-12 md:mt-20;
}
.title {
  @apply text-4xl mb-9;
  @apply sm:text-6xl lg:text-7xl xl:text-8xl;
}
.posts {
  @apply grid grid-cols-2 gap-y-7 gap-x-2;
  @apply md:grid-cols-3 md:gap-y-10 md:gap-x-11;
}
.actions {
  @apply mt-9 sm:mt-14 relative flex items-center;
}
.buttons {
  @apply w-full ml-7 grid grid-cols-2;
  @apply sm:ml-10 sm:grid-cols-3;
}
.buttons .ant-btn {
  @apply py-1 px-4 bg-cotton;
  @apply sm:py-1.5 sm:px-4;
  @apply w-28 text-stone border-solid;
  border-width: 1px;
}
.buttons .ant-btn:hover,
.buttons .ant-btn:focus,
.buttons .ant-btn:active {
  background: #f1eee9;
}
.horizontal-line {
  @apply absolute w-full;
  height: 1px;
}
</style>
