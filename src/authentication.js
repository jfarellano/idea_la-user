const r = require('axios');
import api from './requests'

function getHeaders() {
    return { headers: { "Authorization": 'Token token=' + storage.getItem('secret') } }
}

export default {
    session: {
        login: function (body) {
            return r.post(api.variable.URL + '/sessions', body)
        },
        logout: function () {
            return r.delete(api.variable.URL + '/sessions', getHeaders())
        }

    },
    storage: {
        set: function (userId, secret, expire) {
            storage.setItem('user_id', userId)
            storage.setItem('secret', secret)
            storage.setItem('expire', expire)
        },
        set_name: function (name, lastname) {
            const nameCapitalized =
                name.charAt(0).toUpperCase() +
                name.slice(1);
            const lastnameCapitalized =
                lastname.charAt(0).toUpperCase() +
                lastname.slice(1);
            storage.setItem('name', nameCapitalized + " " + lastnameCapitalized)
        },
        loged: function () {
            if (storage.getItem('secret') != null) {
                var exp = new Date(storage.getItem('expire'))
                if (exp > Date.now()){
                    return true
                }else{
                    storage.clear()
                    return false
                }
            } else {
                return false
            }
        },
        get: function (name) {
            return storage.getItem(name)
        },
        clear: function(){
            storage.clear()
        }
    }
}