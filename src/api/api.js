import axios from 'axios'

let User = {}
User.login = (payload) => {
  return new Promise((resolve, reject) => {
    axios.post('/cusers/session', {
      'username': payload.username
    })
      .then((responce) => {
        console.log('responce:', responce)
        resolve(responce.status)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
let Menu = {}
Menu.getMenus = () => {
  return new Promise((resolve, reject) => {
    axios.get('/menus/cuser')
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
        resolve(responce.content)
      })
      .catch(function (error) {
        console.log(error.request)
      })
  })
}
let Promotion = {}
let Order = {}
let Restaurant = {}

export { User, Menu, Promotion, Order, Restaurant }
