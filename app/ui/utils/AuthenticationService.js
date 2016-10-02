
export default class AuthenticationService {


    static connection(username, passwd, success) {
        var self = this;
        var data = 'username=' + encodeURIComponent(username);
        data = data + '&password=' + encodeURIComponent(passwd);

        window.fetch("/api/sec/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: data
            })
            .then(r => {
                return r.json();
            })
            .then(data => {
                sessionStorage.setItem('4nuser', data);
                success(data);
            })
            .catch(e => console.log("Cannot login: " + e));
    }

    static disconnect(success) {

        sessionStorage.removeItem('4nuser');
        
        window.fetch("/api/sec/logout")
            .then(function(){
                success();
            })
            .catch(e => {
                success();
            });
    }

    static isAuthenticated() {
        var u = sessionStorage.getItem('4nuser');
        return !!u;
    }

    static getUser() {
        return sessionStorage.getItem('4nuser');
    }

}