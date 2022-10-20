<template lang="pug">
div(:class='{ heath: type == "p", teal: type == "d", kashmir: type == "a" }')
  navbar#navbar
  tripsBanner(:trip='trip')
  .contant-days.limited
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
  Footer
</template>

<script>
export default {
  name: 'TripPage',
  data() {
    return {
      type: 'p',
      id: 1,
      trip: {},
    }
  },
  created() {
    let params = this.$route.params.id.split('-')
    this.type = params[0]
    this.id = params[1]
    this.trip = {
      id: 1,
      img: '/trips/tafilalet-4.jpg',
      title: 'The untainted charm of Marrakech Tour 3 days',
      price: 8500,
      description:
        'This oasis lost in the desert is crossed by the wadi Ziz and is spread over twenty or so communes in the region spread over the towns of Rissani and Erfoud. We let you discover in a few pictures these green islets of Tafilalet covering, as far as the eye can see, the valleys of the wadis Ghéris and Ziz.',
      duration: 3,
      startPoint: 'Marrakech',
      days: [
        {
          dayNumber: 1,
          title: 'Arrival at Marrakech Airport, Afternoon at Your Leisure',
          description:
            'We will meet you upon your arrival in Casablanca to accompany you to your hotel, where you can relax and settle in. Depending on your arrival time, you may wish to take a guided tour of the city or explore at your leisure before having dinner and spending the night.',
          image: '/trips/istockphoto-656635000-612x612.jpg',
        },
        {
          dayNumber: 2,
          title: 'Arrival at Marrakech Airport, Afternoon at Your Leisure',
          description:
            'We will meet you upon your arrival in Casablanca to accompany you to your hotel, where you can relax and settle in. Depending on your arrival time, you may wish to take a guided tour of the city or explore at your leisure before having dinner and spending the night.',
          image: '/trips/OIP.jpg',
        },
        {
          dayNumber: 3,
          title: 'Arrival at Marrakech Airport, Afternoon at Your Leisure',
          description:
            'We will meet you upon your arrival in Casablanca to accompany you to your hotel, where you can relax and settle in. Depending on your arrival time, you may wish to take a guided tour of the city or explore at your leisure before having dinner and spending the night.',
          image:
            '/trips/morocco-gda-global-dmc-alliance-kti-voyages-Oujda-Saïdia-3.jpg',
        },
      ],
      images: [
        '/cities/city1.png',
        '/trips/OIP.jpg',
        '/trips/morocco-gda-global-dmc-alliance-kti-voyages-Oujda-Saïdia-3.jpg',
        '/cities/city1.png',
        '/trips/OIP.jpg',
        '/trips/morocco-gda-global-dmc-alliance-kti-voyages-Oujda-Saïdia-3.jpg',
      ],
    }
  },
}
</script>
<style scoped>
h1,
p {
  @apply m-0 p-0;
}
#navbar {
  @apply fixed;
}
.contant-days {
  @apply flex flex-col items-center py-28 bg-albescent;
}
.contant-days .content {
  @apply flex flex-col items-center gap-8 max-w-xs mb-32;
  @apply sm:max-w-sm md:max-w-lg lg:max-w-lg;
}
.contant-days .content > h1 {
  @apply text-4xl;
  @apply md:text-5xl lg:text-6xl;
}
.contant-days .content > p {
  @apply text-xs text-stone text-center;
  @apply sm:text-sm;
}
.days {
  @apply flex flex-col gap-10;
  @apply sm:gap-0;
}
</style>