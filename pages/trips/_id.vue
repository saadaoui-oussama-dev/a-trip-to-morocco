<template lang="pug">
div(:class="{ heath: type == 'p', teal: type == 'd', kashmir: type == 'a' }")
  navbar
  .limited
    .content
      h1.text-6xl.text-colored Tour Itinerary
      p.text-stone We are experts at creating a Moroccan experience perfectly tailored to our guest's needs. These are some of our most popular itineraries, and they may be customized to the utmost extent of your imagination
  tripsImagesSection(:list="trip.images")
  Footer
</template>

<script>
import privateTripQuery from '~/apollo/queries/private-trips/one.gql'
import dayTripQuery from '~/apollo/queries/day-trips/one.gql'
import activityQuery from '~/apollo/queries/activities/one.gql'

export default {
  name: 'TripPage',
  data() {
    return {
      type: 'p',
      id: 1,
      trip: {},
    }
  },
  validate({ params }) {
    return /^[pad]\-[1-9][0-9]*$/.test(params.id)
  },
  async asyncData({ params, app, redirect, store }) {
    params = params.id.split('-')
    let type = params[0],
      id = Number(params[1]),
      query = type == 'p' ? privateTripQuery : type == 'd' ? dayTripQuery : activityQuery,
      attr = type == 'p' ? 'privateTrip' : type == 'd' ? 'dayTrip' : 'activity',
      { data } = await app.apolloProvider.defaultClient.query({
        query,
        variables: { id },
        fetchPolicy: 'no-cache',
      })
    if (!data[attr].data) redirect('/')
    attr = data[attr].data.attributes
    let endpoint = store.state.strapi.httpEndpoint
    let trip = {
      id,
      title: attr.title,
      description: attr.description,
      price: attr.price,
      duration: attr.duration,
      startPoint: attr.startPoint,
      days: attr.days.data.map(({ id, attributes }) => ({
        id,
        number: attributes.number,
        title: attributes.title,
        description: attributes.description,
        image: endpoint + attributes.image.data.attributes.url,
      })),
      banner: endpoint + attr.banner.data.attributes.url,
      images: attr.images.data.map(({ attributes: { url } }) => endpoint + url),
    }
    trip.days.sort((a, b) => a.number - b.number)
    trip.days.sort((a, b) => (a.number == b.number) ? a.id - b.id : 0)
    return { type, id, trip }
  },
}
</script>
