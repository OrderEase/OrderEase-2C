import Menu from '@/api/api.js'

const state = {
    menus: [],
    selectDishes: new Array(0),
    selected_id: 0
}

const getters = {
  totalPrice: (state, getters) => {
    let sum = 0
    for (let i = 0; i < state.selectDishes.length; ++i) {
      sum += state.selectDishes[i].price * state.selectDishes[i].count
    }
    return sum
  }
}

const actions = {
  getMenus ({state}) {
    Axios.get('/menus/cuser')
      .then(function (responce) {
        console.log('menu responce', responce)
        responce = responce.data
        responce.content.sort((a, b) => {
          return a.rank >= b.rank
        })
        for (let i = 0; i < responce.content.length; ++i) {
          responce.content[i].dishes.sort((a, b) => {
            return a.rank >= b.rank
          })
        }
        state.menus = responce.content
        state.selected_id = state.menus[0].id
        console.log('"menus:"', state.menus)
      })
      .catch(function (error) {
        console.log(error.request)
      })
  }
}

const mutations = {
  increaseCart (state, payload) {
    if (!('count' in payload.dish) || payload.dish.count === undefined) {
      for (let i = 0; i < state.menus.length; ++i) {
        if (state.menus[i].dishes.filter(dish => dish.id === payload.dish.id).length > 0) {
          Vue.set(state.menus[i].dishes.filter(dish => dish.id === payload.dish.id)[0], 'count', 1)
          state.selectDishes.push(state.menus[i].dishes.filter(dish => dish.id === payload.dish.id)[0])
          break
        }
      }
      console.log('selected dishes add 1', state.selectDishes)
      return payload.dish
    }
    let count = payload.dish.count
    state.selectDishes.filter(dish => dish.id === payload.dish.id)[0].count = count + 1
    for (let i = 0; i < state.menus.length; ++i) {
      if (state.menus[i].dishes.filter(dish => dish.id === payload.dish.id).length > 0) {
        console.log('add 2', state.menus[i].dishes.filter(dish => dish.id === payload.dish.id)[0].count)
        state.menus[i].dishes.filter(dish => dish.id === payload.dish.id)[0].count = count + 1
        break
      }
    }
    console.log('selected dishes add 2', state.selectDishes)
    return payload.dish
  },
  decreaseCart (state, payload) {
    let count = payload.dish.count
    state.selectDishes.filter(dish => dish.id === payload.dish.id)[0].count = count - 1
    for (let i = 0; i < state.menus.length; ++i) {
      if (state.menus[i].dishes.filter(dish => dish.id === payload.dish.id).length > 0) {
        state.menus[i].dishes.filter(dish => dish.id === payload.dish.id)[0].count = count - 1
        break
      }
    }
    console.log('selected dishes delete', state.selectDishes)
    return payload.dish
  },
  changeSelectedId (state, payload) {
    state.selected_id = payload.id
  }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}