import slidesQuery from '~/apollo/slide/all.gql'

export const state = () => ({
  slides: [],
})

export const getters = {
  GET_SLIDES(state) {
    return state.slides
  },
}

export const actions = {
  async SET_SLIDES({ commit, rootState }) {
    try {
      let { data } = await this.app.apolloProvider.defaultClient.query({
        query: slidesQuery,
        fetchPolicy: 'no-cache'
      })
      let slides = data.slides.data.map(({ id, attributes }) => ({
        id,
        title: attributes.title,
        description: attributes.description,
        type: attributes.type,
        img: rootState.strapi.httpEndpoint + attributes.image.data.attributes.url,
      }))
      commit('SET_SLIDES', slides)
    } catch (error) {}
  },
}

export const mutations = {
  SET_SLIDES(state, slides) {
    state.slides = slides
  },
}
