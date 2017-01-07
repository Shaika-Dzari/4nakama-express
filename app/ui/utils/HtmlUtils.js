import Remarkable from 'remarkable';

const remarkable = new Remarkable();

export function getUrlParamsString(pagingParam, additionalParams) {
    let body = [];
    let urlParams = '';
    let needtoJoin = false;
    if (pagingParam) {

        if (pagingParam.getFromDate())
            body.push('fromdate=' + encodeURIComponent(pagingParam.getFromDate()));

        if (pagingParam.getSize())
            body.push('size=' + encodeURIComponent(pagingParam.getSize()));

        if (pagingParam.getDirection())
            body.push('dir=' + encodeURIComponent(pagingParam.getDirection()));

        needtoJoin = true;
    }

    if (additionalParams) {
        Array.prototype.push.apply(body, additionalParams);
        needtoJoin = true;
    }

    if (needtoJoin) {
        urlParams = body.join('&');
    }

    return urlParams;
}


export function scrollToTopPage(){
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
        window.requestAnimationFrame(scrollToTopPage);
        window.scrollTo (0, currentScroll - 20);
    }
}

export function escapeHTML(html) {
    return document.createElement('div')
        .appendChild(document.createTextNode(html))
        .parentNode
        .innerHTML;
}

export function createHtmlBody(msgs) {
    if (msgs) {
        if (Array.isArray(msgs)) {
            msgs.forEach(m => {
                m.bodyhtml = remarkable.render(m.body)
            });
        } else {
            msgs.bodyhtml = remarkable.render(msgs.body)
        }
    }
}