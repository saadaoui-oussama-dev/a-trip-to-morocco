<template lang="pug">
.container
  .content
    h2.title Our Private Trips
    .posts
      Post(v-for="(post,i) in posts" :key="i" :post="post" :color="color")
</template>
<script>
export default {
  name: 'OurPrivate',
  data() {
    return {
      posts: [
        {
          img: 'post.png',
          title: 'Imperial Cities Tour 8 days',
          description:
            'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture',
          price: 850,
          url: 'https://www.google.com/',
        },
        {
          img: 'post.png',
          title: 'Imperial Cities Tour 8 days',
          description:
            'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture',
          price: 850,
          url: 'https://www.google.com/',
        },
        {
          img: 'post.png',
          title: 'Imperial Cities Tour 8 days',
          description:
            'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture',
          price: 850,
          url: 'https://www.google.com/',
        },
        {
          img: 'post.png',
          title: 'Imperial Cities Tour 8 days',
          description:
            'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture',
          price: 850,
          url: 'https://www.google.com/',
        },
        {
          img: 'post.png',
          title: 'Imperial Cities Tour 8 days',
          description:
            'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture',
          price: 850,
          url: 'https://www.google.com/',
        },
        {
          img: 'post.png',
          title: 'Imperial Cities Tour 8 days',
          description:
            'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture',
          price: 850,
          url: 'https://www.google.com/',
        },
      ],
      color: {
        text: 'text-heath',
        btn: 'heath',
      },
    }
  },
}
</script>
<style scoped>
.container {
  @apply min-w-full px-2 flex justify-center bg-cotton;
  @apply sm:px-6 lg:px-1;
}
.container .content {
  @apply w-full max-w-6xl mt-16 px-10 pb-24;
}
.title {
  @apply text-4xl text-heath mb-9;
  @apply xl:text-8xl lg:text-7xl sm:text-6xl;
}
.posts {
  @apply grid gap-x-11 gap-y-14;
  @apply lg:grid-cols-3 sm:grid-cols-2;
}
</style>
