export function getUrlParamsString(pagingParam, additionalParams) {
    let body = [];
    let urlParams = '';
    let needtoJoin = false;
    if (pagingParam) {

        if (pagingParam.getFromDate())
            body.push('fromdate=' + encodeURIComponent(pagingParam.getFromDate()));

        if (pagingParam.getSize())
            body.push('size=' + encodeURIComponent(pagingParam.getgetSize()));

        if (pagingParam.getDirection())
            body.push('dir=' + encodeURIComponent(pagingParam.getDirection()));
    }

    if (additionalParams) {
        Array.prototype.push.apply(body, additionalParams);
        needtoJoin = true;
    }

    if (needtoJoin) {
        urlParams = '?' + body.join('&');
    }

    return urlParams;
}
