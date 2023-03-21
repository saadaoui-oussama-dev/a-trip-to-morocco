import citiesQuery from '~/apollo/city/all.gql'

export const state = () => ({
  cities: [],
})

export const getters = {
  GET_CITIES(state) {
    return state.cities
  },
}

export const actions = {
  async SET_CITIES({ commit, rootState }) {
    let { data } = await this.app.apolloProvider.defaultClient.query({
      query: citiesQuery,
      fetchPolicy: 'no-cache'
    })
    let cities = data.cities.data.map(({ id, attributes }) => ({
      id,
      title: attributes.title,
      description: attributes.description,
      img: rootState.strapi.httpEndpoint + attributes.image.data.attributes.url,
    }))
    commit('SET_CITIES', cities)
  },
}

export const mutations = {
  SET_CITIES(state, cities) {
    state.cities = cities
  },
}
