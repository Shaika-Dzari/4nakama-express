import 'whatwg-fetch'

// const LOAD_EVENT = new CustomEvent('http.load', { 'detail': elem.dataset.time });
export default class HttpUtils {
    static query(url, options, converter, success, failure) {

        let startEvent = new CustomEvent('httpStart', { 'detail': url });
        let stopEvent = new CustomEvent('httpStop', { 'detail': url });

        window.dispatchEvent(startEvent);

        window.fetch(url, options)
                .then(r => converter(r))
                .then( rep => {
                    window.dispatchEvent(stopEvent);
                    success(rep);
                }).catch(e => {
                    window.dispatchEvent(stopEvent);
                    failure(e);
                });

    }
}