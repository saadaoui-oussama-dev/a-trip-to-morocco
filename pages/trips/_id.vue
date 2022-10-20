<template lang="pug">
div(:class='{ heath: type == "p", teal: type == "d", kashmir: type == "a" }')
  navbar#navbar
  .banner(:style='"background-image:url(" + trip.img + ")"')
    .parnet-content.bg-colored
      .title-info
        h1.title {{ trip.title }}
        .info 
          .parnet-price
            iconsPrice.icon
            p.price
              span STARTING FROM
              |
              | ${{ trip.price }}
          .parnet-duration
            iconsDuration.icon
            p.duration {{ trip.duration }} DAYS
          .parnet-point
            iconsPosition.icon
            p.point {{ trip.startPoint }}

      .contact-book.albescent
        .contact
          .phone
            iconsPhoneSolid.icon(color='#F7EBDB')
            p +212 06xxxxxxxx
          .email
            iconsEmail.icon
            p contact@atriptomorocco.com
        .ant-btn.text-colored Book a trip now

  .static-text.limited
    .content
      h1.text-6xl.text-colored Tour Itinerary
      p.text-stone We are experts at creating a Moroccan experience perfectly tailored to our guest's needs. These are some of our most popular itineraries, and they may be customized to the utmost extent of your imagination
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
.banner {
  @apply min-h-screen bg-cover bg-center relative text-albescent mb-28;
}
.parnet-price,
.parnet-duration,
.parnet-point,
.phone,
.email {
  @apply flex items-center gap-3;
}
.icon {
  @apply w-4 sm:w-4 lg:w-4 h-auto;
}
.parnet-content {
  @apply w-full absolute bottom-0 flex flex-col gap-8 sm:flex-row justify-between items-center  bg-opacity-50 px-8 py-8;
  @apply px-0 sm:px-8 sm:py-8 lg:px-16 lg:py-12;
  mix-blend-mode: normal;
  backdrop-filter: blur(5px);
}
.title-info {
  @apply flex flex-col gap-8 sm:gap-12 justify-between items-start;
}
.title-info > .title {
  @apply font-bold text-albescent text-lg;
  @apply sm:text-lg lg:text-4xl;
}
.contact-book {
  @apply flex flex-col gap-8 sm:gap-12 justify-between items-center sm:items-start;
}
.contact {
  @apply flex flex-col gap-3 items-center sm:items-start;
}
.contact p {
  @apply text-xs lg:text-sm;
}
.info {
  @apply flex items-center gap-8;
  @apply sm:gap-8 lg:gap-16;
}
.info .price span {
  @apply text-xs;
}
.info p {
  @apply text-xs lg:text-base font-medium;
}
.contact-book > .ant-btn {
  @apply font-semibold text-xs px-16 py-2.5;
  @apply lg:text-sm sm:px-16 sm:py-2.5 lg:px-16 lg:py-2.5;
}
</style>