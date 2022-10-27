<template lang="pug">
div
  div title : {{ tour.title }}
  div.text-xs description : {{ tour.description }}
  div housing : {{ tour.housing }}
  div guide : {{ tour.guide }}
  div transport : {{ tour.transport }}
  div places : {{ tour.places }}
  div mainPlace : {{ tour.mainPlace }}
  div price : {{ tour.price }}
  div duration : {{ tour.duration }}
  div.text-xl banner :
  input(type="file" ref="input-banner" @change="readImage" store="tour.banner")
  div.w-32.h-32(ref="prev-banner input-banner" @click="insertImage")
  div.text-xl images :
  .images.flex.flex-wrap
    .flex.flex-col(v-for="(num, index) in [0,1,2,3]" :key="index + 'image'")
      input(type="file", :ref="`input-image${index}`", @change="readImage" :store="`tour.images[${index}]`")
      div.w-32.h-32(:ref="`prev-image${index} input-image${index}`", @click="insertImage")
  div.text-xl days :
    div(v-for="(day, index) in tour.days" :key="index + 'day'")
      div day {{ index }} :
      div number : {{ day.number }}
      div title : {{ day.title }}
      div.text-xs description : {{ day.description }}
      div image : {{ tour.days[index].image }}
      input(type="file", :ref="`input-day${index}`", @change="readImage", :store="`tour.days[${index}].image`")
      div.w-32.h-32(:ref="`prev-day${index} input-day${index}`", @click="insertImage")
  button.bg-heath.text-white.text-lg(@click="click()") privateTripCreate
  button.bg-teal.text-white.text-lg(@click="click()") dayTripCreate
  button.bg-kashmir.text-white.text-lg(@click="click()") activityCreate
</template>

<script>
import privateTripCreate from '~/apollo/private-trip/create.gql'
import dayTripCreate from '~/apollo/day-trip/create.gql'
import activityCreate from '~/apollo/activity/create.gql'
import dayCreate from '~/apollo/day/create.gql'
import fileUpload from '~/apollo/file/upload.gql'
import FilesReader from '~/plugins/FilesReader'

export default {
  name: 'CreateTripPage',
  methods: {
    async createTour(type) {
      let tour = { ... this.tour }
      tour.days = this.tour.days.slice()
      let tourMutation = type == 'p' ? privateTripCreate : type == 'd' ? dayTripCreate : activityCreate
      for(let i in tour.days) {
        tour.days[i].order = i
        tour.days[i] = await this.createDay(tour.days[i])
      }
      tour.banner = await this.uploadFile(tour.banner)
      for(let i in tour.images) {
        tour.images[i] = await this.uploadFile(tour.images[i])
      }
      tour.price = Number(tour.price)
      tour.duration = Number(tour.duration)
      const { data } = await this.$apollo.provider.defaultClient.mutate({
        mutation: tourMutation,
        variables: { tour },
        fetchPolicy: 'no-cache',
      })
      console.log(data)
      console.log(tour)
      console.log(this.tour)
    },
    async createDay(day) {
      day.image = await this.uploadFile(day.image)
      day.number = Number(day.number)
      day.order = Number(day.order)
      const { data } = await this.$apollo.provider.defaultClient.mutate({
        mutation: dayCreate,
        variables: { day },
        fetchPolicy: 'no-cache',
      })
      return data.createDay.data.id
    },
    async uploadFile(file) {
      const { data } = await this.$apollo.provider.defaultClient.mutate({
        mutation: fileUpload,
        variables: { file }
      })
      return data.upload.data.id
    },
    readImage(e) {
      FilesReader.image(e.target, this)
    },
    insertImage(e) {
      FilesReader.insert(e.target, this)
    },
    click() {
      this.createTour('p')
      // this.createTour('d')
      this.createTour('a')
    }
  },
  data() {
    return {
tour: {
  title : "Imperial Cities and Northern Morocco",
  description: "From the bustling markets of Marrakech, to the Golden Sands of Merzouga and the tranquil beauty of the Sahara - this tour is for those who want it all, and have some time to spend exploring the best of Morocco at a slower pace",
  housing: "Carefully selected hotels, Kasbahs, Riads. Includes one night in a traditional Berber camp",
  guide: "Qualified multi-language guide fluent in English, French, Spanish",
  transport: "Air-conditioned 4WD vehicle(s), mini bus or motor-coach",
  places: "Tangier, Tetouan, Martil, Rif Mountains, blue town of Chefchaouen.",
  mainPlace: "TANGIER",
  price: 963,
  duration: 10,
  images: [],
  days: [
    {
      number: 1,
      title : "Arrival in Tangier, Sightseeing",
      description: "Whether you're arriving by ferry or plane, we will meet you upon arrival and take you to your hotel to settle in before exploring the ancient city of Tangier, a seaport and coastal city that has for centuries been the gateway between Africa and Europe. A local guide will be waiting to take you on a private tour around Tangier and help you discover the historical and modern-day charms of this bustling Moroccan city. Our trip will start at the city's famous kasbah. Located at the highest point in the city, the Dar el-Makhzen, or former Sultan's Palace, overlooks Tangier's Medina from behind its 17th-century stone walls. You can stroll through the palace gardens and pay a visit to the Museum of Antiquities and Moroccan Art. Afterwards, a wander through the medina will give you a feel for life in the city, both past and present-day. Your guide can take you to an authentic Berber souk and help you bargain for something special to take home with you. We will spend the night at our hotel in Tangier.",
    },
    {
      number: 2,
      title : "From Tangier to the Blue Streets of Chefchaouen",
      description: "After breakfast we will leave Tangier and head west along the beautiful coastline on a hilly road towards Ceuta (Sebta to the locals). From there you will have a fantastic view over the ocean, and you'll even be able to climb the rocky peak of Jebel Musa, which stands directly opposite the Rock of Gibraltar. After stopping for lunch in the city of Tetouan, which lies at the foot of the Rif Mountains, our road will take us up into their ridges and valleys and to the beautiful and isolated mountain town of Chefchaouen, set like a gem between two Rif Mountain peaks. Chefchaouen is renowned for the distinctive blue-washed facades of its houses, painted that way by Jewish refugees who lived there in the 1930s, and is an unreal and unmissable destination for any trip to Morocco. The Chefchaouen medina features a Spanish-style plaza surrounded by numerous cafes, rooftop restaurants, and crafts stores that sell items unique to the Moroccan highlands. We will explore Chefchaouen in the afternoon and settle into our hotel, from which we will be able to enjoy the relaxed environment and spectacular mountain views of this one-of-a-kind town.",
    },
    {
      number: 3,
      title : "Chefchaouen to the Cultural Capitol of Morocco",
      description: `After breakfast we will continue our journey to the Roman ruins of Volubilis, a UNESCO World Heritage site and the best preserved Roman ruins in North Africa. This important Roman town features detailed and gorgeous mosaics that will give you a unique perspective on Morocco's ancient history. We will also visit the nearby town of Moulay Idriss, where Moulay Idriss I, who brought Islam to Morocco, is entombed. Moulay Idriss is considered to be the holiest town in Morocco. From Moulay Idriss we will continue to Meknes, often called the "Versailles of Morocco" due to the grandeur and intricacy of its buildings and monuments. We will take some time to explore its highlights, including the massive Bab Mansour Gate, the old Medina, and Moulay Ismail's shrine. From Meknes we will continue to Fes, where we will check in at your hotel before having dinner and settling in for the night.`,
    },
  ],
}
    }
  },
}
</script>

<style>
input {
  @apply w-32 h-10;
}
</style>
