import reviewQuery from '~/apollo/queries/review/all.gql'

export const state = () => ({
  feedbacks: [],
})

export const getters = {
  GET_FEEDBACKS(state) {
    return state.feedbacks
  },
}

export const actions = {
  async SET_FEEDBACKS({ commit, rootState }) {
    let { data } = await this.app.apolloProvider.defaultClient.query({
      query: reviewQuery,
      fetchPolicy: 'no-cache',
    })
    let feedbacks = data.reviews.data.map(({ id, attributes}) => {
      return {
        id,
        author: attributes.author,
        description: attributes.description,
        image: rootState.strapi.httpEndpoint +  attributes.image.data.attributes.url,
      }
    })
    commit('SET_FEEDBACKS', feedbacks)
  },
}

export const mutations = {
  SET_FEEDBACKS(state, feedbacks) {
    state.feedbacks = feedbacks
  },
}
