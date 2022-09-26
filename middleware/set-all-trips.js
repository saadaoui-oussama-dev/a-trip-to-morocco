export default async function ({ store }) {
  let trips = await store.dispatch('landing/SET_PRIVATE_TRIPS')
  trips = await store.dispatch('landing/SET_DAY_TRIPS')
  trips = await store.dispatch('landing/SET_ACTIVITIES')
}
