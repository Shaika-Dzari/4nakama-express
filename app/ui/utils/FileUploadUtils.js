class FileUploaderUtils {

    constructor(url, options) {
        let baseOptions = {
            fileparam: 'file',
            protocol: 'POST'
        };

        this.url = url;
        this.options = Object.assign({}, baseOptions, options);
    }

    _onProgress(event) {
        if (this.options['progressCallback']) {
            if (event.lengthComputable) {
                let percentComplete = Math.round((event.loaded / event.total) * 100);
                this.options['progressCallback'].apply(null, percentComplete);
            }
        }
    }

    _onError(request, event) {
        if (this.options['errorCallback']) {
        	this.options['errorCallback'].apply(null, this._processResponse(request))
        }
    }

    _onComplete(request, event) {
        if (this.options['completeCallback']) {
            this.options['completeCallback'].apply(null, request.status, this._processResponse(request))
        }
    }

    _processResponse(xhr) {
    	if (xhr) {
    		if (!xhr.responseType || xhr.responseType === "text") {
    			return [xhr.responseText];
    		} else if (xhr.responseType === "document") {
    			return [xhr.responseXML];
    		} else {
    			return [xhr.response];
    		}
    	}
    	return null;
    }


    upload(file, formParams) {
        this._log('uploading', file.name);
        let formData = new FormData();

        formData.append(this.options['fileparam'], file);

        if (params) {
            for (let k in params) {
                formData.append(k, params[k]);
            }
        }

        let request = new XMLHttpRequest();

        request.upload.addEventListener('progress', this._onProgress.bind(this));
        request.upload.addEventListener('error', this._onError.bind(this, request));
        request.upload.addEventListener('abort', this._onError.bind(this, request));
        request.addEventListener('load', this._onComplete.bind(this, request));

        request.open(this.options['protocol'], this.url, true);
        request.send(formData);
    }

    _log() {
        if (this.options['debug'] && window.console) {
            console.log(arguments);
        }
    }
};

export default FileUploaderUtils;