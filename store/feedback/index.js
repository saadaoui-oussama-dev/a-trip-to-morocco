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
  async SET_FEEDBACKS({ commit }) {
    let { data } = await this.app.apolloProvider.defaultClient.query({
      query: reviewQuery,
      fetchPolicy: 'no-cache',
    })
    let feedbacks = data.reviews.data.map(review => {
      return {
        id: review.id,
        author: review.attributes.author,
        description: review.attributes.description,
        image: review.attributes.image.data.attributes.url,
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
