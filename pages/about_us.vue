<template lang="pug">
div
  navbar.navbar.bg-albescent
  .limited
    .content
      h1.title about us
      p.description Talking about Atrip to Morocco as a site, it is not the first and it will not be the last, and we believe it will be the best and we are sure that it will not be for the worst. As for the site of Atrip to Morocco as people, here I am sure that we are among the best people working in the field of tourism, from the moment you set your foot  Here in Morocco, your private driver will take you to your place of residence, and you will meet the hosts there, and who will arrange the activities that you will do and help you do them. The people you will meet during your trip will have a good relationship with them, as if you have known them for many years, I wanted  He mentioned their names, but they asked me to do so so that they would do so when they meet you, dear guest. In the end, we are not sure if this will be your first visit to Morocco, but we are sure that it will not be the last.
  </template>
  
  <script>
  export default {
    name: 'AboutUsPage',
  }
  </script>
  
  <style scoped>
  .navbar {
    top: -1rem !important;
    position: relative !important;
  }
  .title {
    @apply mt-3 sm:mt-6 text-3xl sm:text-4xl;
  }
  .description {
    @apply text-sm sm:text-base;
    text-indent: 10px;
  }
  </style>
  