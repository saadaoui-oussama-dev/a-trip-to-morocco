<template lang="pug">
svg(
  :viewBox='`${config} 0 8 5`',
  fill='none',
  xmlns='http://www.w3.org/2000/svg'
)
  g(clip-path='url(#clip0_687_127)')
    path(
      d='M3.64645 4.25346C3.84171 4.44872 4.15829 4.44872 4.35355 4.25346L7.53553 1.07148C7.7308 0.876213 7.7308 0.559631 7.53553 0.364368C7.34027 0.169106 7.02369 0.169106 6.82843 0.364368L4 3.1928L1.17157 0.364368C0.976311 0.169106 0.659728 0.169106 0.464466 0.364368C0.269204 0.559631 0.269204 0.876213 0.464466 1.07148L3.64645 4.25346ZM3.5 3.3999V3.8999H4.5V3.3999H3.5Z',
      :fill='color'
    )
  defs
    clipPath#clip0_687_127
      rect(width='8', height='4.5', fill='white')
</template>

<script>
export default {
  name: 'ArrowIcon',
  props: {
    color: {
      type: String,
      default: '#3D0E1B',
    },
  },
  data() {
    return {
      config: -0.25,
    }
  },
  methods: {
   async getConfig() {
      this.config =
        parseFloat(getComputedStyle(document.body).width) % 2 == 0
          ? -0.25
          : 0.25
    },
  },
  beforeMount() {
    this.getConfig()
    window.addEventListener('resize', this.getConfig)
  },
  destroyed() {
    window.addEventListener('resize', this.getConfig)
  },
}
</script>

<style>
</style>