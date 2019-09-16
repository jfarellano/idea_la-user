//import {SERVER_URL} from "./variables.js"
// Se debe eliminar el recurso de variables debido a que se puede usar este mismo
// servicio para el manejo de variables como se muestra en este ejemplo
const r = require('axios');
// const SERVER_URL = 'https://prod.jfarellano.xyz'
const SERVER_URL = 'https://api.imaginatuciuda.org'
const WEB_URL = 'http://www.imaginatuciuda.org'

import auth from './authentication.js'

function getHeaders() {
  return {headers: {"Authorization": 'Token token=' + auth.storage.get('secret')}}
}   

export default {
  variable: {
    URL: SERVER_URL,
    locations: function(){
      return r.get(SERVER_URL + '/locations')
    },
    WEB: WEB_URL
  },
  utils: {
    upcase: function (str) {
      var splitStr = str.toLowerCase().split(' ');
      for (var i = 0; i < splitStr.length; i++) {
          splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
      }
      return splitStr.join(' '); 
    }
  },
  comments: {
    index: function(idea_id) {
      return r.get(SERVER_URL + '/ideas/' + idea_id + '/comments')
    },
    create: function(idea_id, body) {
      return r.post(SERVER_URL + '/ideas/' + idea_id + '/comments', body, getHeaders())
    }
  },
  challenges: {
    index: function () {
      return r.get(SERVER_URL + '/challenges')
      }
  },
  ideas: {
    index: function(){
      return r.get(SERVER_URL + '/ideas')
    },
    user: function(){
      return r.get(SERVER_URL + '/users_ideas', getHeaders())
    },
    erase: function(id){
      return r.delete(SERVER_URL + '/ideas/' + id, getHeaders())
    },
    edit: function(id, body){
      return r.put(SERVER_URL + '/ideas/'+ id, body, getHeaders())
    }
  },
  challenge: {
    getInfo: function(challengeID) {
      return r.get(SERVER_URL + '/challenges/' + challengeID)
    },
    getIdeas: function(challengeID) {
      return r.get(SERVER_URL + '/challenges/' + challengeID + '/ideas')
    }
  },
  idea: {
    getInfo: function(ideaID) {
      return r.get(SERVER_URL + '/ideas/' + ideaID)
    },
    vote: function(ideaID) {
      return r.post(SERVER_URL + '/ideas/' + ideaID + '/votes', {}, getHeaders())
    },
    getComments: function(ideaID) {
      return r.get(SERVER_URL + '/ideas/' + ideaID + '/comments')
    },
    postComment: function(ideaID, body) {
      return r.post(SERVER_URL + '/ideas/' + ideaID + '/comments', body, getHeaders())
    },
    create: function(body){
      return r.post(SERVER_URL + '/ideas', body, getHeaders())
    },
    picked: function(c_id){
      return r.get(SERVER_URL + '/challenges/' + c_id + '/picked_ideas')
    },
    winers: function(c_id){
      return r.get(SERVER_URL + '/challenges/' + c_id + '/winner_ideas')
    },
    all_winners: function(){
      return r.get(SERVER_URL + '/winner_ideas')
    }
  },
  myProfile: {
    getIdeas: function() {
      return r.get(SERVER_URL + '/users_ideas', getHeaders())
    }
  },
  user: {
    create: function(body){
      return r.post(SERVER_URL + '/users', body)
    },
    update: function(id, body){
      return r.put(SERVER_URL + '/users/' + id, body, getHeaders())
    },
    survey:  function() {
      return r.get(SERVER_URL + '/status_user', getHeaders())
    },
    save_survey: function(body) {
      return r.put(SERVER_URL + '/multiple_surveys', body, getHeaders())
    },
    show: function(id){
      return r.get(SERVER_URL + '/users/' + id, getHeaders())
    }
  },
  password: {
    mail: function(body) {
      return r.post(SERVER_URL + '/forgot_password', body, getHeaders())
    },
    validate: function(token) {
      return r.get(SERVER_URL + '/validate_password_token/' + token)
    },
    change: function(token, body) {
      return r.put(SERVER_URL + '/change_password/' + token, body)
    }
  }
}
