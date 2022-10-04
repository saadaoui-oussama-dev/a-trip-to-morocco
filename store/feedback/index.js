export const state = () => ({
  feedbacks: [],
})

export const getters = {
  GET_FEEDBACKS(state) {
    return state.feedbacks
  },
}

export const actions = {
  SET_FEEDBACKS({ commit }) {
    let feedbacks = [
      {
        img: '/feedback/feedback.png',
        feedback:
          'Our guide Mohammed,  Salem the driver and Brahim our desert friend were very helpful and took care of everything to make this trip special. We had a great experience and great fun. Definitely one to remember!! I can assure you that Best Travel is the best in organizing these tours. Thank You from Chris, Sasha, Jonathan and Melanie from Malta.',
        writer: 'Chris Do.',
      },
      {
        img: '/feedback/1504674_w-684_h-342_q-75_m-crop.jpg',
        feedback:
          'I did a road tip from North to South of Morocco. I landed in Tangier, went to Chefchaouen, Fes, Volubilis, Moulay Idriss, the Sahara desert, Kashbah Ait be Haddou, Mekness and Marrakesh.',
        writer: 'Marisol.',
      },
      {
        img: '/feedback/1071142_w-684_h-342_q-75_m-crop.jpg',
        feedback:
          'We landed at Casablanca and quickly arrived for Chechaouen. We spent the night there and the day after till the afternoon when we left for Fes. At Fes we visited the most part of the Medina and some parts of the new city (near the royal Palace) We spent 2 nights there and the we left for Merzouga and the dunes where we spent the night at the Tends in the desert. (one of the best nights and sunrises ever) Then we headed to AitBenhandou and passed by the Todra Gorges where we had a short stop.',
        writer: 'Gkamiles.',
      },
    ]
    commit('SET_FEEDBACKS', feedbacks)
  },
}

export const mutations = {
  SET_FEEDBACKS(state, feedbacks) {
    state.feedbacks = feedbacks
  },
}
