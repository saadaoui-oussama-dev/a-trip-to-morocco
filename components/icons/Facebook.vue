<template lang="pug">
svg(
	xmlns="http://www.w3.org/2000/svg"
	width="18"
	height="19"
	viewBox="0 0 18 19"
	fill="none"
)
	path(
		d="M9.13287 15.5714C12.6956 15.5714 15.5837 12.6833 15.5837 9.12055C15.5837 5.55783 12.6956 2.66968 9.13287 2.66968C5.57016 2.66968 2.68201 5.55783 2.68201 9.12055C2.68201 12.6833 5.57016 15.5714 9.13287 15.5714Z"
		stroke-linecap="round"
		stroke-linejoin="round"
		:stroke="color"
	)
	path(
		d="M11.8208 5.51929H10.7457C10.3179 5.51929 9.90774 5.6892 9.6053 5.99164C9.30286 6.29409 9.13293 6.70429 9.13293 7.13201V15.2259"
		stroke-width="1.3"
		stroke-linecap="round"
		stroke-linejoin="round"
		:stroke="color"
	)
	path(
    d="M7 9.51929H11.3006"
    stroke-width="1.2"
    stroke-linecap="round"
    stroke-linejoin="round"
    :stroke="color"
  )
</template>

<script>
export default {
  name: 'FacebookIcon',
  props: {
    color: {
      type: String,
      default: '#6F6F6F',
		},
	},
}
</script>
      