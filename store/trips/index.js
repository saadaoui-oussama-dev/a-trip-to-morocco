import privateTripsQuery from '~/apollo/private-trip/all.gql'
import dayTripsQuery from '~/apollo/day-trip/all.gql'
import activitiesQuery from '~/apollo/activity/all.gql'

export const state = () => ({
  privateTrips: [],
  dayTrips: [],
  activities: [],
  visiblePrivateTrips: [],
  visibleDayTrips: [],
  visibleActivities: [],
})

export const getters = {
  GET_PRIVATE_TRIPS(state) {
    return state.privateTrips
  },
  GET_DAY_TRIPS(state) {
    return state.dayTrips
  },
  GET_ACTIVITIES(state) {
    return state.activities
  },
  GET_VISIBLE_PRIVATE_TRIPS(state) {
    return state.visiblePrivateTrips
  },
  GET_VISIBLE_DAY_TRIPS(state) {
    return state.visibleDayTrips
  },
  GET_VISIBLE_ACTIVITIES(state) {
    return state.visibleActivities
  },
}

export const actions = {
  async SET_LIST({ commit, dispatch, rootState }, list) {
    let LIST = list == 'privateTrips' ? 'PRIVATE_TRIPS' : list == 'dayTrips' ? 'DAY_TRIPS' : 'ACTIVITIES',
      query = list == 'privateTrips' ? privateTripsQuery : list == 'dayTrips' ? dayTripsQuery : activitiesQuery,
      { data } = await this.app.apolloProvider.defaultClient.query({ query, fetchPolicy: 'no-cache' }),
      trips = data[list].data.map(({ id, attributes }) => {
        let url = attributes.banner.data.attributes.url
        if (attributes.banner.data.attributes.formats) {
          const formats = attributes.banner.data.attributes.formats
          url = formats.small?.url || formats.medium?.url || url
        }
        console.log(url)
        return {
          id,
          title: attributes.title,
          description: attributes.description,
          price: attributes.price,
          banner: rootState.strapi.httpEndpoint + url,
        }
      })
    commit(`SET_${LIST}`, trips)
    const trip = dispatch(`SET_VISIBLE_LIST`, list)
  },
  SET_VISIBLE_LIST({ commit, state }, list) {
    let LIST = list == 'privateTrips' ? 'PRIVATE_TRIPS' : list == 'dayTrips' ? 'DAY_TRIPS' : 'ACTIVITIES'
    if (state[list].length > 6) {
      commit(`SET_VISIBLE_${LIST}`, state[list].slice(0, 6))
    } else {
      commit(`SET_VISIBLE_${LIST}`, state[list])
    }
  },
  CHANGE_LIST_STATUS({ commit, getters }, { list, status }) {
    if (status == 1) {
      commit(`SET_VISIBLE_${list}`, getters[`GET_${list}`].slice(0, 6))
    } else if (status == 2) {
      commit(`SET_VISIBLE_${list}`, getters[`GET_${list}`].slice(0, 18))
    } else if (status == 3) {
      commit(`SET_VISIBLE_${list}`, getters[`GET_${list}`])
    }
  },
}

export const mutations = {
  SET_PRIVATE_TRIPS(state, list) {
    state.privateTrips = list
  },
  SET_DAY_TRIPS(state, list) {
    state.dayTrips = list
  },
  SET_ACTIVITIES(state, list) {
    state.activities = list
  },
  SET_VISIBLE_PRIVATE_TRIPS(state, list) {
    state.visiblePrivateTrips = list
  },
  SET_VISIBLE_DAY_TRIPS(state, list) {
    state.visibleDayTrips = list
  },
  SET_VISIBLE_ACTIVITIES(state, list) {
    state.visibleActivities = list
  },
}
