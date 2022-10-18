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
      { id: 1, img: '/trips/tafilalet-4.jpg', title: 'Imperial Cities Tour 8 days', price: 8500, description: 'This oasis lost in the desert is crossed by the wadi Ziz and is spread over twenty or so communes in the region spread over the towns of Rissani and Erfoud. We let you discover in a few pictures these green islets of Tafilalet covering, as far as the eye can see, the valleys of the wadis Ghéris and Ziz.' },
      { id: 2, img: '/trips/OIP.jpg', title: 'The untainted charm of Marrakech Tour 10 days', price: 8500, description: 'Bathed in the rosy glow of its adobe walls, the beautiful Marrakech opens its doors to all culture lovers. Inside of its walls, architectural masterpieces stand where you can see the foorprints of ancient civilizations. Marrakech is a mixture of different influences, and a mosaic of colors where the wonders of the past and present meet.' },
      { id: 4, img: '/trips/morocco-gda-global-dmc-alliance-kti-voyages-Oujda-Saïdia-3.jpg', title: 'OUJDA-SAÏDIA, between nature and culture Tour 8 days', price: 850, description: 'Saidia symbolizes Morocco of blue and warm waters. Either it’s for holidays with family or in a couple, or with your friends, don’t miss out the opportunity to admire the splendid nature of the region. Go for a stroll in the city, visit the architectural heritage and long-standing medina in Oujda.' },
      { id: 5, img: '/trips/istockphoto-656635000-612x612.jpg', title: 'SAFI, PEARL OF THE ATLANTIC OCEAN', price: 850, description: 'For five centuries now, the fortress has stood as a sentinel on the shores of the ocean. Its high crenellated towers offer admirable views of the surrounding area. It is an opportunity to admire the seafront, the bustling and animated life of this provincial capital.' },
      { id: 6, img: '/trips/tafilalet-4.jpg', title: 'Imperial Cities Tour 8 days', price: 8500, description: 'This oasis lost in the desert is crossed by the wadi Ziz and is spread over twenty or so communes in the region spread over the towns of Rissani and Erfoud. We let you discover in a few pictures these green islets of Tafilalet covering, as far as the eye can see, the valleys of the wadis Ghéris and Ziz.' },
      { id: 7, img: '/trips/OIP.jpg', title: 'The untainted charm of Marrakech Tour 10 days', price: 8500, description: 'Bathed in the rosy glow of its adobe walls, the beautiful Marrakech opens its doors to all culture lovers. Inside of its walls, architectural masterpieces stand where you can see the foorprints of ancient civilizations. Marrakech is a mixture of different influences, and a mosaic of colors where the wonders of the past and present meet.' },
      { id: 8, img: '/trips/morocco-gda-global-dmc-alliance-kti-voyages-Oujda-Saïdia-3.jpg', title: 'OUJDA-SAÏDIA, between nature and culture Tour 8 days', price: 850, description: 'Saidia symbolizes Morocco of blue and warm waters. Either it’s for holidays with family or in a couple, or with your friends, don’t miss out the opportunity to admire the splendid nature of the region. Go for a stroll in the city, visit the architectural heritage and long-standing medina in Oujda.' },
      { id: 9, img: '/trips/istockphoto-656635000-612x612.jpg', title: 'SAFI, PEARL OF THE ATLANTIC OCEAN', price: 850, description: 'For five centuries now, the fortress has stood as a sentinel on the shores of the ocean. Its high crenellated towers offer admirable views of the surrounding area. It is an opportunity to admire the seafront, the bustling and animated life of this provincial capital.' },]
    commit('SET_PRIVATE_TRIPS', privateTrips)
    const trips = dispatch('SET_VISIBLE_PRIVATE_TRIPS')
  },
  SET_DAY_TRIPS({ commit, dispatch }) {
    let dayTrips = [
      { id: 1, img: '/trips/tafilalet-4.jpg', title: 'Imperial Cities Tour 8 days', price: 8500, description: 'This oasis lost in the desert is crossed by the wadi Ziz and is spread over twenty or so communes in the region spread over the towns of Rissani and Erfoud. We let you discover in a few pictures these green islets of Tafilalet covering, as far as the eye can see, the valleys of the wadis Ghéris and Ziz.' },
      { id: 2, img: '/trips/OIP.jpg', title: 'The untainted charm of Marrakech Tour 10 days', price: 8500, description: 'Bathed in the rosy glow of its adobe walls, the beautiful Marrakech opens its doors to all culture lovers. Inside of its walls, architectural masterpieces stand where you can see the foorprints of ancient civilizations. Marrakech is a mixture of different influences, and a mosaic of colors where the wonders of the past and present meet.' },
      { id: 3, img: '/trips/morocco-gda-global-dmc-alliance-kti-voyages-Oujda-Saïdia-3.jpg', title: 'OUJDA-SAÏDIA, between nature and culture Tour 8 days', price: 850, description: 'Saidia symbolizes Morocco of blue and warm waters. Either it’s for holidays with family or in a couple, or with your friends, don’t miss out the opportunity to admire the splendid nature of the region. Go for a stroll in the city, visit the architectural heritage and long-standing medina in Oujda.' },
      { id: 4, img: '/trips/istockphoto-656635000-612x612.jpg', title: 'SAFI, PEARL OF THE ATLANTIC OCEAN', price: 850, description: 'For five centuries now, the fortress has stood as a sentinel on the shores of the ocean. Its high crenellated towers offer admirable views of the surrounding area. It is an opportunity to admire the seafront, the bustling and animated life of this provincial capital.' },
      { id: 5, img: '/trips/tafilalet-4.jpg', title: 'Imperial Cities Tour 8 days', price: 8500, description: 'This oasis lost in the desert is crossed by the wadi Ziz and is spread over twenty or so communes in the region spread over the towns of Rissani and Erfoud. We let you discover in a few pictures these green islets of Tafilalet covering, as far as the eye can see, the valleys of the wadis Ghéris and Ziz.' },
      { id: 6, img: '/trips/OIP.jpg', title: 'The untainted charm of Marrakech Tour 10 days', price: 8500, description: 'Bathed in the rosy glow of its adobe walls, the beautiful Marrakech opens its doors to all culture lovers. Inside of its walls, architectural masterpieces stand where you can see the foorprints of ancient civilizations. Marrakech is a mixture of different influences, and a mosaic of colors where the wonders of the past and present meet.' },
      { id: 7, img: '/trips/morocco-gda-global-dmc-alliance-kti-voyages-Oujda-Saïdia-3.jpg', title: 'OUJDA-SAÏDIA, between nature and culture Tour 8 days', price: 850, description: 'Saidia symbolizes Morocco of blue and warm waters. Either it’s for holidays with family or in a couple, or with your friends, don’t miss out the opportunity to admire the splendid nature of the region. Go for a stroll in the city, visit the architectural heritage and long-standing medina in Oujda.' },
      { id: 8, img: '/trips/istockphoto-656635000-612x612.jpg', title: 'SAFI, PEARL OF THE ATLANTIC OCEAN', price: 850, description: 'For five centuries now, the fortress has stood as a sentinel on the shores of the ocean. Its high crenellated towers offer admirable views of the surrounding area. It is an opportunity to admire the seafront, the bustling and animated life of this provincial capital.' },]
    commit('SET_DAY_TRIPS', dayTrips)
    const trips = dispatch('SET_VISIBLE_DAY_TRIPS')
  },
  SET_ACTIVITIES({ commit, dispatch }) {
    let activities = [
      { id: 1, img: '/trips/tafilalet-4.jpg', title: 'Imperial Cities Tour 8 days', price: 8500, description: 'This oasis lost in the desert is crossed by the wadi Ziz and is spread over twenty or so communes in the region spread over the towns of Rissani and Erfoud. We let you discover in a few pictures these green islets of Tafilalet covering, as far as the eye can see, the valleys of the wadis Ghéris and Ziz.' },
      { id: 2, img: '/trips/OIP.jpg', title: 'The untainted charm of Marrakech Tour 10 days', price: 8500, description: 'Bathed in the rosy glow of its adobe walls, the beautiful Marrakech opens its doors to all culture lovers. Inside of its walls, architectural masterpieces stand where you can see the foorprints of ancient civilizations. Marrakech is a mixture of different influences, and a mosaic of colors where the wonders of the past and present meet.' },
      { id: 3, img: '/trips/morocco-gda-global-dmc-alliance-kti-voyages-Oujda-Saïdia-3.jpg', title: 'OUJDA-SAÏDIA, between nature and culture Tour 8 days', price: 850, description: 'Saidia symbolizes Morocco of blue and warm waters. Either it’s for holidays with family or in a couple, or with your friends, don’t miss out the opportunity to admire the splendid nature of the region. Go for a stroll in the city, visit the architectural heritage and long-standing medina in Oujda.' },
      { id: 4, img: '/trips/istockphoto-656635000-612x612.jpg', title: 'SAFI, PEARL OF THE ATLANTIC OCEAN', price: 850, description: 'For five centuries now, the fortress has stood as a sentinel on the shores of the ocean. Its high crenellated towers offer admirable views of the surrounding area. It is an opportunity to admire the seafront, the bustling and animated life of this provincial capital.' },
      { id: 5, img: '/trips/tafilalet-4.jpg', title: 'Imperial Cities Tour 8 days', price: 8500, description: 'This oasis lost in the desert is crossed by the wadi Ziz and is spread over twenty or so communes in the region spread over the towns of Rissani and Erfoud. We let you discover in a few pictures these green islets of Tafilalet covering, as far as the eye can see, the valleys of the wadis Ghéris and Ziz.' },
      { id: 6, img: '/trips/OIP.jpg', title: 'The untainted charm of Marrakech Tour 10 days', price: 8500, description: 'Bathed in the rosy glow of its adobe walls, the beautiful Marrakech opens its doors to all culture lovers. Inside of its walls, architectural masterpieces stand where you can see the foorprints of ancient civilizations. Marrakech is a mixture of different influences, and a mosaic of colors where the wonders of the past and present meet.' },
      { id: 7, img: '/trips/morocco-gda-global-dmc-alliance-kti-voyages-Oujda-Saïdia-3.jpg', title: 'OUJDA-SAÏDIA, between nature and culture Tour 8 days', price: 850, description: 'Saidia symbolizes Morocco of blue and warm waters. Either it’s for holidays with family or in a couple, or with your friends, don’t miss out the opportunity to admire the splendid nature of the region. Go for a stroll in the city, visit the architectural heritage and long-standing medina in Oujda.' },
      { id: 8, img: '/trips/istockphoto-656635000-612x612.jpg', title: 'SAFI, PEARL OF THE ATLANTIC OCEAN', price: 850, description: 'For five centuries now, the fortress has stood as a sentinel on the shores of the ocean. Its high crenellated towers offer admirable views of the surrounding area. It is an opportunity to admire the seafront, the bustling and animated life of this provincial capital.' },]
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
