<template lang="pug">
div(:class='{ heath: type == "p", teal: type == "d", kashmir: type == "a", "max-h-screen overflow-hidden": showBookingForm  }')
  navbar.fix(:class="{ 'bg-albescent': navbarVisibile, 'hover:bg-opacity-80 hover:bg-albescent': ! navbarVisibile }")
  tripsBooking(@booking="booking($event)" :id ='trip.id' :show='showBookingForm' :type='type')
  tripsBanner(@booking="booking($event)" :trip='trip')
  tripsOverview(:type='type' :trip="trip")
  tripsDays(:days="trip.days" :type='type')
  tripsImagesSection(:list='trip.images')
  tripsPostsList(
    :title="title",
    :list='type == "p" ? "PRIVATE_TRIPS" : type == "d" ? "DAY_TRIPS" : "ACTIVITIES"',
    :active='trip.id',
  )
  Footer
</template>

<script>
import privateTripQuery from '~/apollo/private-trip/one.gql'
import dayTripQuery from '~/apollo/day-trip/one.gql'
import activityQuery from '~/apollo/activity/one.gql'

export default {
  name: 'TripPage',
  validate({ params }) {
    return /^[pad]\-[1-9][0-9]*$/.test(params.id)
  },
  data() {
    return {
      navbarVisibile: false,
      showBookingForm: false,
    }
  },
  async asyncData({ params, app, redirect, store }) {
    params = params.id.split('-')
    let type = params[0],
      title = type == 'p' ? "Other private Trips" : type == 'd' ? "Other Day Trips" : "Other Activities",
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
      ... attr,
      days: attr.days.data.map(({ id, attributes }) => ({
        id,
        ... attributes,
        image: endpoint + attributes.image.data.attributes.url,
      })),
      banner: endpoint + attr.banner.data.attributes.url,
      images: attr.images.data.map(({ attributes: { url } }) => endpoint + url),
    }
    trip.days.sort((a, b) => a.order - b.order)
    let list = type == 'p' ? 'privateTrips' : type == 'd' ? 'dayTrips' : 'activities',
      trips = await store.dispatch('trips/SET_LIST', list)
    return { title, type, trip }
  },
  methods: {
    detectScroll() {
      let nav =
        parseFloat(getComputedStyle(document.querySelector('.navbar')).height) +
        parseFloat(getComputedStyle(document.querySelector('.navbar')).top),
        top = document.querySelector('.parnet-content').getBoundingClientRect().top
      this.navbarVisibile = top - nav <= 0
    },
    booking(showBookingForm) {
      this.showBookingForm = showBookingForm;
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
