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
        title: 'Moroccan Tajine',
        description:
          'Amongst the most sought-after dishes in Morocco is Tajine. With a very particular cooking method and multiple versions, this dish never ceases to delight the most demanding gourmets ! Food such as fish, chicken, meat, vegetables, and sometimes nuts, plums and apricots, are steamed with a bit of spices that enhances its flavour.',
        img: 'slider/slide.png',
      },
      {
        title: 'Chebakia',
        description:
          'Being the second staple of Morocco, Chebakia is the most popular and most favourite cake in the country. It is served with Moroccan soup or as a side-dish to tea, and is traditionnally prepared in the sacred month of Ramadan.',
        img: 'slider/chbakya.jpg',
      },
      {
        title: 'Pastilla',
        description:
          'Served in puff pastry form, the pastilla is either filled with fish, chicken, pigeon, or with almond. This finger licking pastry is light and subtle perfectly made for sweet and savoury lovers.',
        img: 'slider/La-pastilla.jpg',
      },
      {
        title: 'Moroccan starters',
        description:
          'Usually served at the beginning of meals, Moroccan starters are presented as an accompaniment to main dishes. They vary from one region to another, but generally consist of a Moroccan salad of either raw or cooked vegetables, Briouates stuffed with chicken or minced meat, a ratatouille of peppers and tomatoes - the so-called Tektouta - and the famous Zaâlouk which is an eggplant puree. Each recipe has a special seasoning, and brings out its own flavour and colour.',
        img: 'slider/entrees_marocaines.jpg',
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
