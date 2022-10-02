export const state = () => ({
  cities: [],
})

export const getters = {
  GET_CITIES(state) {
    return state.cities
  },
}

export const actions = {
  SET_CITIES({ commit }) {
    let cities = [
      { id: 1, name: 'MARZOUGA', title: "Live the nomad life in the Sahara Desert.", description: "The minute you step foot on the soft golden dunes of the Sahara Desert, you’ll be transported to another world, another time - you’ve come to the perfect place for a peaceful retreat.", img: 'cities/city1.png' },
      { id: 2, name: 'MARZOUGA', title: "Live the nomad life in the Sahara Desert.", description: "The minute you step foot on the soft golden dunes of the Sahara Desert, you’ll be transported to another world, another time - you’ve come to the perfect place for a peaceful retreat.", img: 'cities/city2.png' },
      { id: 3, name: 'MARZOUGA', title: "Live the nomad life in the Sahara Desert.", description: "The minute you step foot on the soft golden dunes of the Sahara Desert, you’ll be transported to another world, another time - you’ve come to the perfect place for a peaceful retreat.", img: 'cities/city3.png' },
      { id: 4, name: 'MARZOUGA', title: "Live the nomad life in the Sahara Desert.", description: "The minute you step foot on the soft golden dunes of the Sahara Desert, you’ll be transported to another world, another time - you’ve come to the perfect place for a peaceful retreat.", img: 'cities/city4.png' },
    ]
    commit('SET_CITIES', cities)
  },
}

export const mutations = {
  SET_CITIES(state, cities) {
    state.cities = cities
  },
}
