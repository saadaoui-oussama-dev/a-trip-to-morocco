<template lang="pug">
.container.mx-auto.text-center.pt-96
  div(v-if="error.statusCode === 404")
    h1.text-6xl.text-gray-700.mb-3 404
    h1.text-2xl.text-gray-700.mb-8 Ooops! page not found ☠️ 
  h1(v-else) An error occurred
  NuxtLink(to="/") Click here to go back home  
</template>

<script>
export default {
  name: 'ErrorPage',
  props: ['error'],
}
</script>
