//import {SERVER_URL} from "./variables.js"
// Se debe eliminar el recurso de variables debido a que se puede usar este mismo
// servicio para el manejo de variables como se muestra en este ejemplo
const r = require('axios');
const URL = 'http://ec2-18-222-177-88.us-east-2.compute.amazonaws.com:5005'

function getHeaders() {
    return {headers: {"Authorization": 'Token token=' + document.cookie.split('%22%3A%22')[1].split('%22%2C%22')[0]}}
}   

export default {
    challenges: {
        index: function () {
            return r.get(URL + '/challenges')
        },
        create: function (body) {
            return r.post(URL + '/challenges', body ,getHeaders)
        }
    },
    ideas: {
        index: function(){
            return r.get(URL + '/ideas')
        }
    },
    variable: {
        URL: URL
    }
}