/**
 * Created by Tigjer on 1/19/16.
 */
angular.module('app')
    .service('UserSvc', function ($http) {
        var svc = this
        svc.getUser = function() {
            return $http.get('/api/users', {
                headers: { 'X-Auth': this.token }
            })
        }
        svc.login = function(username, password) {
            return $http.post('/api/sessions', {
                username: username, password: password
            }).then(function (val) {
                svc.token = val.data
                $http.defaults.headers.common['X-Auth'] = val.data
                return svc.getUser()
            })
        }
        svc.register = function (username, password) {
            return $http.post('/api/users', {
                username: username, password: password
            }).then(function () {
                return svc.login(username, password)
            })
        }
    })