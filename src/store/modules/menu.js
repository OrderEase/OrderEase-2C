import {Menu} from '@/api/api.js'
import Vue from 'vue'
import menuData from '@/components/Menu/data.json'

const state = {
  menus: [],
  selectDishes: new Array(0),
  selectedId: 0,
  selectedDish: {}
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
  async getMenus ({commit}) {
    // let responce = menuData
    let responce = await Menu.getMenus()
    commit('changeMenus', {
      menus: responce
    })
    console.log('menu data:', menuData.content)
    commit('changeSelectedId', {
      id: responce[0].id
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
    state.selectedId = payload.id
  },
  changeMenus (state, payload) {
    state.menus = payload.menus
  },
  changeSelectedDish (state, payload) {
    for (let i = 0; i < state.menus.length; ++i) {
      let temp = state.menus[i].dishes.filter((dish) => {
        return dish.id === payload.id
      })
      if (temp.length !== 0) {
        state.selectedDish = temp[0]
      }
    }
  },
  emptySelectedDish (state, payload) {
    for (let i = 0; i < state.menus.length; ++i) {
      state.menus[i].dishes.forEach((element, index, arr) => {
        if ('count' in element) {
          element.count = 0
        }
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
