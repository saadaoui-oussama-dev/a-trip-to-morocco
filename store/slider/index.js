export const state = () => ({
  slides: [],
})

export const getters = {
  GET_SLIDES(state) {
    return state.slides
  },
}

export const actions = {
  SET_SLIDES({ commit }) {
    let slides = [
      {
        title: 'Moroccan Tajine 1',
        description: 'Amongst the most sought-after dishes in Morocco is Tajine. With a very particular cooking method and multiple versions, this dish never ceases to delight the most demanding gourmets ! Food such as fish, chicken, meat, vegetables, and sometimes nuts, plums and apricots, are steamed with a bit of spices that enhances its flavour.',
        img: '/slide.png',
      },
      {
        title: 'Moroccan Tajine 2',
        description: 'Amongst the most sought-after dishes in Morocco is Tajine. With a very particular cooking method and multiple versions, this dish never ceases to delight the most demanding gourmets ! Food such as fish, chicken, meat, vegetables, and sometimes nuts, plums and apricots, are steamed with a bit of spices that enhances its flavour.',
        img: '/post.png',
      },
      {
        title: 'Moroccan Tajine 3',
        description: 'Amongst the most sought-after dishes in Morocco is Tajine. With a very particular cooking method and multiple versions, this dish never ceases to delight the most demanding gourmets ! Food such as fish, chicken, meat, vegetables, and sometimes nuts, plums and apricots, are steamed with a bit of spices that enhances its flavour.',
        img: '/feedback.png',
      },
      {
        title: 'Moroccan Tajine 4',
        description: 'Amongst the most sought-after dishes in Morocco is Tajine. With a very particular cooking method and multiple versions, this dish never ceases to delight the most demanding gourmets ! Food such as fish, chicken, meat, vegetables, and sometimes nuts, plums and apricots, are steamed with a bit of spices that enhances its flavour.',
        img: '/slide.png',
      },
    ]
    commit('SET_SLIDES', slides)
  },
}

export const mutations = {
  SET_SLIDES(state, slides) {
    state.slides = slides
  },
}
