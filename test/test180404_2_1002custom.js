var parsedArray;
var browserType;

function makeTable() {
	
	var resultJSON;
	
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', 'test180330_2_2_1002custom.php', true);
	
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	
	xhr.responseType = 'json'
	
	xhr.onreadystatechange = function() {
		
		if (xhr.readyState === 4) {
			
			resultJSON = xhr.response;
			
			if (resultJSON) {
				
				if (browserType == 'Internet Explorer') {
					
					parsedArray = JSON.parse(resultJSON);

					
				} else {
					
					parsedArray = resultJSON;
					
				}
				
			} else {
				
				alert('Error');
				
			}
			
		xhr.abort();
		
		}
	
	};
	
	xhr.send();
	
}

function detectBrowserType() {
	
	var userAgent = window.navigator.userAgent.toLowerCase();
	
	if ((userAgent.indexOf('msie') != -1) || (userAgent.indexOf('trident') != -1)) {
		browserType = 'Internet Explorer';
	} else if (userAgent.indexOf('edge') != -1) {
		browserType = 'Edge';
	} else if (userAgent.indexOf('chrome') != -1) {
		browserType = 'Google Chrome';
	} else if (userAgent.indexOf('safari') != -1) {
		browserType = 'Safari';
	} else if (userAgent.indexOf('firefox') != -1) {
		browserType = 'FireFox';
	} else if (userAgent.indexOf('opera') != -1) {
		browserType = 'Opera';
	} else {
		browserType = 'Unknown';
	}
	
}

function getJSON() {
	
	alert(parsedArray);
	alert(parsedArray.length);
	alert(parsedArray[0].length);
	
}

// ビジーwaitを使う方法
function sleep(waitMsec) {
  var startMsec = new Date();
 
  // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
  while (new Date() - startMsec < waitMsec);
}