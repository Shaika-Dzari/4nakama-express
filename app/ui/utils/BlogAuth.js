
export default class BlogAuth {


    static connection(username, passwd) {

        var self = this;
        var u = null;

        var data = new FormData();
        data.append("username", username);
        data.append("password", passwd);

        window.fetch("/login", {
            method: "POST",
            body: data
        })
        .then(r => {
            console.log(r);
            return r.json();
        })
        .then(data => {
                u = data;
                console.log(u);

        })
        .catch(e => console.log("Booo" + e));

                

    }

    static disconnect() {

    }

    static challenge() {

    }
}