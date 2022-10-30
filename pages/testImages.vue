<template lang="pug">
div
  input(type="file" @change="readImage" ref="input-preview1" store="image")
  div.bg-center.bg-cover.w-36.h-36(ref="prev-preview1 input-preview1" @click="insertFile")

  input(type="file" @change="readImage" ref="input-preview2" store="obj.image")
  img.w-36.h-36(ref="prev-preview2 input-preview2" @click="insertFile")

  div(v-for="(num, index) in [0,1,2,3,4,5,6]" :key="index")
    input.hidden(type="file", :ref="`input-image${index}`", @change="readImage", :store="`images[${index}]`")
    div.w-36.h-36(:ref="`prev-image${index} input-image${index}`", @click="insertFile")
  div(@click="uploadImage") send
</template>

<script>
import fileUpload from '~/apollo/file/upload.gql'
import FilesReader from '~/plugins/FilesReader'

export default {
  name: 'CreateTripPage',
  data() {
    return {
      image: null,
      obj: {
        image: null,
      },
      images: [],
    }
  },
  methods: {
    readImage(e) {
      let res = FilesReader.image(e.target, this)
    },
    insertFile(e) {
      FilesReader.insert(e.target, this)
    },
    async uploadImage() {
      let imageId
      if (this.image) {
        try {
          let res = await this.$apollo.provider.defaultClient.mutate({
            mutation: fileUpload,
            variables: { file: this.image }
          })
          imageId = res.data.upload.data.id
        } catch {
          alert('Error in uploading image')
        }
      } else {
        alert('image is required')
      }
      console.log(imageId)
    },
  },
}
</script>
