<template lang="pug">
div(:class='{ heath: type == "p", teal: type == "d", kashmir: type == "a" }')
  navbar.fix(:class="{ 'bg-albescent': navbarVisibile, 'hover:bg-opacity-80 hover:bg-albescent': ! navbarVisibile }")
  tripsBanner(:trip='trip')
  tripsOverview(:type='type')
  .content-days.limited
    .content
      h1.text-colored Tour Itinerary
      p We are experts at creating a Moroccan experience perfectly tailored to our guest's needs. These are some of our most popular itineraries, and they may be customized to the utmost extent of your imagination
    .days
      tripsDay(
        v-for='(day, index) in trip.days',
        :key='index',
        :day='day',
        :arrow='index == trip.days.length - 1',
        :type='type'
      )
  tripsImagesSection(:list='trip.images')
  tripsPostsList(
    title="Other Trips",
    :list='type == "p" ? "PRIVATE_TRIPS" : type == "d" ? "DAY_TRIPS" : "ACTIVITIES"',
    :active='trip.id',
  )
  Footer
</template>

<script>
import privateTripQuery from '~/apollo/queries/private-trips/one.gql'
import dayTripQuery from '~/apollo/queries/day-trips/one.gql'
import activityQuery from '~/apollo/queries/activities/one.gql'

export default {
  name: 'TripPage',
  validate({ params }) {
    return /^[pad]\-[1-9][0-9]*$/.test(params.id)
  },
  data() {
    return {
      navbarVisibile: false,
    }
  },
  async asyncData({ params, app, redirect, store }) {
    params = params.id.split('-')
    let type = params[0],
      id = Number(params[1]),
      query =
        type == 'p'
          ? privateTripQuery
          : type == 'd'
          ? dayTripQuery
          : activityQuery,
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
    trip.days.sort((a, b) => (a.number == b.number ? a.id - b.id : 0))
    let list = type == 'p' ? 'privateTrips' : type == 'd' ? 'dayTrips' : 'activities',
      trips = await store.dispatch('trips/SET_LIST', list)
    return { type, trip }
  },
  methods: {
    detectScroll() {
      let nav =
        parseFloat(getComputedStyle(document.querySelector('.navbar')).height) +
        parseFloat(getComputedStyle(document.querySelector('.navbar')).top),
        top = document.querySelector('.parnet-content').getBoundingClientRect().top
      this.navbarVisibile = top - nav <= 0
    },
  },
  async mounted() {
    document.addEventListener('scroll', this.detectScroll)
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.detectScroll)
  }
}
</script>

<style scoped>
h1,
p {
  @apply m-0 p-0;
}
.content-days {
  @apply flex flex-col items-center py-28 bg-albescent;
}
.contant-days {
  @apply max-w-full flex flex-col items-center py-28 bg-albescent;
}
.content-days .content {
  @apply flex flex-col items-center gap-8 max-w-xs mb-32;
  @apply sm:max-w-sm md:max-w-lg lg:max-w-lg;
}
.content-days .content > h1 {
  @apply text-4xl;
  @apply md:text-5xl lg:text-6xl;
}
.content-days .content > p {
  @apply text-xs text-stone text-center;
  @apply md:text-sm;
}
.days {
  @apply flex flex-col gap-10;
  @apply sm:gap-0;
}
</style>
