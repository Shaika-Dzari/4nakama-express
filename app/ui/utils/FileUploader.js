'use strict';

/**
 * FileUploader Constructor.
 * @param url the url used to upload the file.
 * @param options Upload options.
 *     Can be :
 *          fileparam : String [file], the name of the file parameter on the server.
 *          protocol: String [POST], the http protocol to use.
 *          debug:      Boolean [false], if logging is enabled.
 *          success :   Function, called upon success.
 *          error:      Function, called upon error.
 *          progress:   Boolean [false], if N4FileUpload is trying to show file upload progress.
 *          progressid: String, An id of a html element where N4FileUpload will show progress.
 */
function FileUploader(url, options) {

	this.url = url;

    var baseOptions = {
        fileparam: 'file',
        protocol: 'POST',
        debug: false,
        progress: false
    };

    this.options = Object.assign({}, baseOptions, options);

    this.styling = {
        container: 'fileupload-container',
        progressbar: 'fileupload-progressbar',
        filename: 'fileupload-filename'
    };

    this.upload = function(file, params) {
        this._log('uploading', file.name);
        var self = this;
        var formData = new FormData();
        var feedbackId = null;

        formData.append(this.options['fileparam'], file);

        if (params) {
            for (var k in params) {
                formData.append(k, params[k]);
                console.log(k, params[k]);
            }
        }

        var request = new XMLHttpRequest();

        if (this.options['progress'] && this.options['progressid']) {
            // Creating feedback div
            var ctn = this._createProgress(file.name);
            feedbackId = ctn.id + '-bar';
            var p = document.getElementById(this.options['progressid']);
            p.appendChild(ctn);
        }

        request.upload.addEventListener('progress', this._requestProgress.bind(this, request, feedbackId));
        request.upload.addEventListener('error', this._requestError.bind(this, request, feedbackId));
        request.upload.addEventListener('abort', this._requestError.bind(this, request, feedbackId));
        request.addEventListener('load', this._requestComplete.bind(this, request, feedbackId));

        request.open(this.options['protocol'], this.url, true);
        request.send(formData);
    }

    this._requestProgress = function(request, feedbackId, ev) {
    	this._log('_requestProgress');
        if (this.options['progress']) {
            if (ev.lengthComputable) {
                var percentComplete = Math.round((ev.loaded / ev.total) * 100);
                document.getElementById(feedbackId).style.width = percentComplete + '%';
            }
        }
    };

    this._requestComplete = function(request, feedbackId, ev) {
    	this._log('_requestComplete');

    	if (request.status >= 200 && request.status < 300) {
    		this._log('Upload final : successful');
    		this._feedbackSuccess(feedbackId);
            if (this.options['success']) {
            	this.options['success'].apply(null, this._processResponse(request))
            }
        } else {
        	this._log('Upload final : error');
        	this._feedbackError(feedbackId);
            if (this.options['error']) {
            	this.options['error'].apply(null, this._processResponse(request))
            }
        }
    };

    this._requestError = function(request, feedbackId, ev) {
    	this._log('_requestError');

    	this._feedbackError(feedbackId);

        if (this.options['error']) {
        	this.options['error'].apply(null, this._processResponse(request))
        }
    };

    this._feedbackSuccess = function(feedbackId) {
    	if (feedbackId) {
    		var b = document.getElementById(feedbackId);
    		b.style.width = '100%';
    		b.classList.add('fileupload-completed');
    	}
    };

    this._feedbackError = function(feedbackId) {
    	if (feedbackId) {
    		var b = document.getElementById(feedbackId);
    		b.style.width = '100%';
    		b.classList.add('fileupload-error');
    	}
    };


    this._processResponse = function(xhr) {
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

    this._createProgress = function(text) {

        if (this.options['progress']) {

            // Container
            var ctnid = this._id();
            var ctn = document.createElement('div');
            ctn.classList.add(this.styling.container);
            ctn.id = ctnid;

            // progress bar
            var bar = document.createElement('div');
            bar.classList.add(this.styling.progressbar);
            bar.id = ctnid + '-bar';

            // text
            var ctnfilename = document.createElement('div');
            ctnfilename.classList.add(this.styling.filename);
            var filename = document.createElement('span');
            filename.appendChild(document.createTextNode(text));
            ctnfilename.appendChild(filename);

            ctn.appendChild(ctnfilename);
            ctn.appendChild(bar);

            return ctn;
        }

        return null;
    }

    this._S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }

    this._id = function() {
        return (this._S4() + this._S4() + "-" + this._S4() + "-4" + this._S4().substr(0,3) + "-" + this._S4() + "-" + this._S4() + this._S4() + this._S4()).toLowerCase();
    }

    this._log = function() {
        if (this.options['debug'] && window.console) {
            console.log(arguments);
        }
    }
}

