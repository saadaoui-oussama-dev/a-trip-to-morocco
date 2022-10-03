export const state = () => ({
  gallery: [],
  gallerySlides: [],
})

export const getters = {
  GET_GALLERY(state) {
    return state.gallery
  },
  GET_GALLERY_SLIDES(state) {
    return state.gallerySlides
  },
}

export const actions = {
  SET_GALLERY({ commit }) {
    let gallery = [
      [
        { url: 'gallery/photo1.png', x1: 0, x2: 2, y1: 0, y2: 1 },
        { url: 'gallery/photo4.png', x1: 0, x2: 1, y1: 1, y2: 2 },
        { url: 'gallery/photo5.png', x1: 1, x2: 2, y1: 1, y2: 3 },
        { url: 'gallery/photo7.png', x1: 0, x2: 1, y1: 2, y2: 3 },
      ],
      [
        { url: 'gallery/photo2.png', x1: 0, x2: 1, y1: 0, y2: 1 },
        { url: 'gallery/photo3.png', x1: 1, x2: 2, y1: 0, y2: 1 },
        { url: 'gallery/photo6.png', x1: 0, x2: 2, y1: 1, y2: 2 },
        { url: 'gallery/photo8.png', x1: 0, x2: 1, y1: 2, y2: 3 },
        { url: 'gallery/photo9.png', x1: 1, x2: 2, y1: 2, y2: 3 },
      ]
    ]
    let index = 0
    gallery = gallery.map((column) => {
      column = column.map((image) => {
        index ++
        return {
          id: index,
          url: image.url,
          coords: `${image.y1 + 1}/${image.x1 + 1}/${image.y2 + 1}/${image.x2 + 1}`
        }
      })
      return column
    })
    commit('SET_GALLERY', gallery)
    commit('SET_GALLERY_SLIDES', gallery[0].concat(gallery[1]))
  },
}

export const mutations = {
  SET_GALLERY(state, gallery) {
    state.gallery = gallery
  },
  SET_GALLERY_SLIDES(state, gallerySlides) {
    state.gallerySlides = gallerySlides
  },
}
