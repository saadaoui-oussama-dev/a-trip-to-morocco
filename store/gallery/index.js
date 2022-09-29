export const state = () => ({
  gallery: [],
})

export const getters = {
  GET_GALLERY(state) {
    return state.gallery
  },
}

export const actions = {
  SET_GALLERY({ commit }) {
    let gallery = [
      [
        { id: 1, url: 'gallery/photo1.png', x1: 0, x2: 2, y1: 0, y2: 1 },
        { id: 2, url: 'gallery/photo4.png', x1: 0, x2: 1, y1: 1, y2: 2 },
        { id: 3, url: 'gallery/photo5.png', x1: 1, x2: 2, y1: 1, y2: 3 },
        { id: 4, url: 'gallery/photo7.png', x1: 0, x2: 1, y1: 2, y2: 3 },
      ],
      [
        { id: 5, url: 'gallery/photo2.png', x1: 0, x2: 1, y1: 0, y2: 1 },
        { id: 6, url: 'gallery/photo3.png', x1: 1, x2: 2, y1: 0, y2: 1 },
        { id: 7, url: 'gallery/photo6.png', x1: 0, x2: 2, y1: 1, y2: 2 },
        { id: 8, url: 'gallery/photo8.png', x1: 0, x2: 1, y1: 2, y2: 3 },
        { id: 9, url: 'gallery/photo9.png', x1: 1, x2: 2, y1: 2, y2: 3 },
      ]
    ]
    gallery = gallery.map((column) => {
      column = column.map((image) => {
        return {
          id: image.id,
          url: image.url,
          coords: `${image.y1 + 1}/${image.x1 + 1}/${image.y2 + 1}/${image.x2 + 1}`
        }
      })
      return column
    })
    commit('SET_GALLERY', gallery)
  },
}

export const mutations = {
  SET_GALLERY(state, gallery) {
    state.gallery = gallery
  },
}
