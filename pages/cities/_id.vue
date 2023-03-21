<template lang="pug">
div
  navbar.navbar.bg-albescent
  .limited
    .content
      h1.title {{ city.title }}
      p.description {{ city.description }}
      p.description {{ city.extraInfos }}
  tripsImagesSection(:list='city.images')
</template>

<script>
import cityQuery from '~/apollo/city/one.gql'

export default {
  name: 'CityPage',
  async asyncData({ params, redirect, app, store }) {
    let $id = params.id || 0,
    { data } = await app.apolloProvider.defaultClient.query({
      query: cityQuery,
      variables: { id: $id },
      fetchPolicy: 'no-cache',
    })
    if (!data.city.data) redirect('/')
    let { attributes } = data.city.data
    let endpoint = store.state.strapi.httpEndpoint
    return {
      city: {
        title: attributes.title,
        description: attributes.description,
        extraInfos: attributes.extraInfos,
        images: attributes.images.data.map(({ attributes: { url } }) => endpoint + url),
      }
    }
  },
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
