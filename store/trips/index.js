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
  SET_PRIVATE_TRIPS({ commit, dispatch }) {
    let privateTrips = [
      { img: 'post.png', title: '01 Imperial Cities Tour 8 days', price: 8500, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post.png', title: '02 Imperial Cities Tour 8 days', price: 8500, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post.png', title: '03 Imperial Cities Tour 8 days', price: 8500, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post.png', title: '04 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post.png', title: '05 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post.png', title: '06 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post.png', title: '07 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post.png', title: '08 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post.png', title: '09 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post.png', title: '10 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post.png', title: '11 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post.png', title: '12 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post.png', title: '13 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post.png', title: '14 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post.png', title: '15 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
    ]
    commit('SET_PRIVATE_TRIPS', privateTrips)
    const trips = dispatch('SET_VISIBLE_PRIVATE_TRIPS')
  },
  SET_DAY_TRIPS({ commit, dispatch }) {
    let dayTrips = [
      { img: 'post2.png', title: '01 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post2.png', title: '02 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post2.png', title: '03 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post2.png', title: '04 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post2.png', title: '05 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post2.png', title: '06 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post2.png', title: '07 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post2.png', title: '08 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post2.png', title: '09 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post2.png', title: '10 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post2.png', title: '11 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post2.png', title: '12 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post2.png', title: '13 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post2.png', title: '14 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post2.png', title: '15 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post2.png', title: '16 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post2.png', title: '17 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post2.png', title: '18 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post2.png', title: '19 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post2.png', title: '20 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post2.png', title: '21 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post2.png', title: '22 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post2.png', title: '23 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post2.png', title: '24 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
    ]
    commit('SET_DAY_TRIPS', dayTrips)
    const trips = dispatch('SET_VISIBLE_DAY_TRIPS')
  },
  SET_ACTIVITIES({ commit, dispatch }) {
    let activities = [
      { img: 'post3.png', title: '01 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post3.png', title: '02 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post3.png', title: '03 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post3.png', title: '04 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post3.png', title: '05 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
      { img: 'post3.png', title: '06 Imperial Cities Tour 8 days', price: 850, url: 'https://www.google.com/', description: 'Generally speaking, This tour remains vital since it is an actual opportunity to learn more and more about the countless features making Moroccan history along with its culture' },
    ]
    commit('SET_ACTIVITIES', activities)
    const trips = dispatch('SET_VISIBLE_ACTIVITIES')
  },
  SET_VISIBLE_PRIVATE_TRIPS({ commit, state }) {
    if (state.privateTrips.length > 6) {
      commit('SET_VISIBLE_PRIVATE_TRIPS', state.privateTrips.slice(0, 6))
    } else {
      commit('SET_VISIBLE_PRIVATE_TRIPS', state.privateTrips)
    }
  },
  SET_VISIBLE_DAY_TRIPS({ commit, state }) {
    if (state.dayTrips.length > 6) {
      commit('SET_VISIBLE_DAY_TRIPS', state.dayTrips.slice(0, 6))
    } else {
      commit('SET_VISIBLE_DAY_TRIPS', state.dayTrips)
    }
  },
  SET_VISIBLE_ACTIVITIES({ commit, state }) {
    if (state.activities.length > 6) {
      commit('SET_VISIBLE_ACTIVITIES', state.activities.slice(0, 6))
    } else {
      commit('SET_VISIBLE_ACTIVITIES', state.activities)
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
