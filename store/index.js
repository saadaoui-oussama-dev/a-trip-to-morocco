export const state = () => ({
  app: {
    name: 'A Trip To Morocco',
  },
  strapi: {
    httpEndpoint: process.env.NODE_ENV === 'production'
      ? 'https://strapi.atriptomorocco.com/graphql'
      : 'http://localhost:1337/graphql',
  },
})

export const getters = {}

export const actions = {}

export const mutations = {}
