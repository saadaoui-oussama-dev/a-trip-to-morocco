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
    let feedbacks =  [
      {
        img: 'feedback.png',
        feedback:
          'Our guide Mohammed,  Salem the driver and Brahim our desert friend were very helpful and took care of everything to make this trip special. We had a great experience and great fun. Definitely one to remember!! I can assure you that Best Travel is the best in organizing these tours. Thank You from Chris, Sasha, Jonathan and Melanie from Malta.',
        writer: 'Chris Do.',
      },
      {
        img: 'feedback.png',
        feedback:
          'Our guide Mohammed, Salem the driver and Brahim our desert friend were very helpful and took care of everything to make this trip special. We had a great experience and great fun. Definitely one to remember!! I can assure you that Best Travel is the best in organizing these tours. Thank You from Chris, Sasha, Jonathan and Melanie from Malta.',
        writer: 'Chris Do.',
      },
      {
        img: 'feedback.png',
        feedback:
          'Our guide Mohammed, Salem the driver and Brahim our desert friend were very helpful and took care of everything to make this trip special. We had a great experience and great fun. Definitely one to remember!! I can assure you that Best Travel is the best in organizing these tours. Thank You from Chris, Sasha, Jonathan and Melanie from Malta.',
        writer: 'Chris Do.',
      },
      {
        img: 'feedback.png',
        feedback:
          'Our guide Mohammed, Salem the driver and Brahim our desert friend were very helpful and took care of everything to make this trip special. We had a great experience and great fun. Definitely one to remember!! I can assure you that Best Travel is the best in organizing these tours. Thank You from Chris, Sasha, Jonathan and Melanie from Malta.',
        writer: 'Chris Do.',
      },
      {
        img: 'feedback.png',
        feedback:
          'Our guide Mohammed, Salem the driver and Brahim our desert friend were very helpful and took care of everything to make this trip special. We had a great experience and great fun. Definitely one to remember!! I can assure you that Best Travel is the best in organizing these tours. Thank You from Chris, Sasha, Jonathan and Melanie from Malta.',
        writer: 'Chris Do.',
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
