const r = require('axios');
import api from './requests'

function getHeaders() {
  return { headers: { "Authorization": 'Token token=' + localStorage.getItem('secret') } }
}
export default {
  oauth: {
    
  },
  session: {
    login: function (body) {
      return r.post(api.variable.URL + '/sessions', body)
    },
    logout: function () {
      return r.delete(api.variable.URL + '/sessions', getHeaders())
    },
    stage: function() {
      return r.get(api.variable.URL + '/current_stage')
    }
  },
  storage: {
    setImage: function (url) {
      localStorage.setItem('picture', url)
    },
    set: function (user_id, secret, expire, admin) {
      localStorage.setItem('user_id', user_id)
      localStorage.setItem('secret', secret)
      localStorage.setItem('expire', expire)
      localStorage.setItem('admin', admin)
    },
    set_name: function (name, lastname) {
      localStorage.setItem('name', api.utils.upcase(name + ' ' + lastname))
    },
    set_stage: function (stage) {
      localStorage.setItem('stage', stage)
    },
    logged: function () {
      if (localStorage.getItem('secret') != null && localStorage.getItem('admin')) {
        var exp = new Date(localStorage.getItem('expire'))
        if (exp > Date.now()){
          return true
        }else{
          localStorage.clear()
          return false
        }
      } else {
        var stage = localStorage.getItem('stage')
        localStorage.clear()
        localStorage.setItem('stage', stage)
        return false
      }
    },
    get: function (name) {
      return localStorage.getItem(name)
    },
    clear: function(){
      localStorage.clear()
    }
  }
}