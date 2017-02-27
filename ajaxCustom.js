// ajax formData 작성
function newFormData() {
	var formData = new FormData();
	//formData.append("appStore", APP_STORE);
	return formData;
}

// 서버에서 JSONObject 로 내려오지 않을 수 있어서 체크함
function JSONParse(json) {
	try {
		return JSON.parse(json);
	} catch(e) {
		return json;
	}
}

// ajax 커스텀
function send() {	
	switch (arguments.length) {
	case 1:
		privateSend(arguments[0], null, null);
		break;
	case 2:		
		if (isFunction(arguments[1])) {
			privateSend(arguments[0], null, arguments[1]);
		} else {
			privateSend(arguments[0], arguments[1], null);
		}
		break;
	case 3:
		privateSend(arguments[0], arguments[1], arguments[2]);
		break;
	default:
		//console.log("ERROR: call send by wrong arguments.");
		break;
	}
}
function privateSend(uri, data, callback) {
	if (uri.indexOf("/") == 0) uri = uri.substr(1);
	if (data == null) {
		$.ajax({
	        url : getAjaxPrefix() + "/" + uri,
	        type: "POST",
	        cache : false,
			crossDomain : true,
	        success : function(json) {
	        	json = JSONParse(json);
	        	//console.log(json);
	            if(json.code == 0) {
	            	if (callback != null) {
	            		callback(json);
	            	}
	            }
	            else {
	                commonErrorHandler(json);
	            }
	        },
	        xhrFields : {
	            withCredentials : true
	        }
	    });
	} else {
		$.ajax({
	        url : getAjaxPrefix() + "/"  + uri,
	        type: "POST",
	        cache : false,
			crossDomain : true,
			processData : false, 	// formData 전송시 필요
	        contentType : false, 	// formData 전송시 필요
	        mimeType : "multipart/form-data",
	        data: data,
	        success : function(json) {
	        	json = JSONParse(json);
	        	//console.log(json);
	            if(json.code == 0) {
	            	if (callback != null) {
	            		callback(json);
	            	}
	            }
	            else {
	                commonErrorHandler(json);
	            }
	        },
	        xhrFields : {
	            withCredentials : true
	        }
	    });
	}	
}
