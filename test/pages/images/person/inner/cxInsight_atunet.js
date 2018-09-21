// Cxense tracking script start 
var cX = cX || {}; cX.callQueue = cX.callQueue || [];
var cx_props = cx_props || {}; cx_props['k'] = []; cx_props["lang"] = "en";
cX.callQueue.push(["invoke",function(){var cp={},sa={},cpMaxLen=40;try{var refhost=cX.library._findRealReferrer().split("/")[2];refhost&&location.hostname!==refhost&&(cp.referrer_host=sa.referrer_host_S=refhost.slice(0,cpMaxLen))}catch(b){}var u=["utm_source","utm_medium","utm_term","utm_content","utm_campaign"];location.search&&location.search.substring(1).split("&").forEach(function(b){try{var a=b.split("=");"cx_"===a[0].slice(0,3)&&a[1]?sa[a[0].replace(/^cx_/,"")+"_S"]=decodeURIComponent(a[1]).slice(0,cpMaxLen):-1!==u.indexOf(a[0].toLowerCase())&&a[1]&&(cp[a[0].toLowerCase()]=sa[a[0].toLowerCase()+"_S"]=decodeURIComponent(a[1]).slice(0,cpMaxLen))}catch(c){}});if(cX.getUserId(!1))try{var t=(new Date).getTime()-parseInt(cX.library.m_atfr.match(/altm=(\d+)/)[1]);if(18E5<=t){cX.stopAllSessionAnnotations();var da=Math.floor(t/864E5);cp.elapsed=1>da?sa.elapsed_S="1\u65e5\u4ee5\u5185":7>da?sa.elapsed_S=String(da)+"\u65e5\u3076\u308a":31>da?sa.elapsed_S=String(Math.floor(da/7))+"\u9031\u9593\u3076\u308a":365>da?sa.elapsed_S=String(Math.floor(da/31))+"\u30f6\u6708\u3076\u308a":sa.elapsed_S="1\u5e74\u4ee5\u4e0a"}}catch(b){}else cp.newuser=sa.newuser_S="true";var originalRef=document.referrer;if(originalRef.match(/faeb92b469b40c9d72e4-dc920caace12a27e58d45a42e86d29a2\.ssl\.cf2\.rackcdn\.com\/generic_v[0-9]+\.html/)||originalRef.match(/cdn\.cxpublic\.com\/generic_v[0-9]+\.html/))sa.cx_source_S="cxrecs";0<Object.keys(cp).length&&cX.setCustomParameters(cp);0<Object.keys(sa).length&&cX.startSessionAnnotation(sa);try{"newuser_S"in cX.library._getSessionAnnotations()&&cx_props.k.push("newuser")}catch(b){};}]);
cX.callQueue.push(['setSiteId', '1132869265463521454']);
cX.callQueue.push(['invoke', function() {if(0<cx_props.k.length){var pcp={};cx_props.k[0].split(" ").forEach(function(a){a=a.split(":");"p0"!==a[0]&&"p"===a[0].substr(0,1)&&a[1]&&(pcp[a[0]]=a[1])});0<Object.keys(pcp).length&&cX.setCustomParameters(pcp)};}]);
cX.callQueue.push(['sendPageViewEvent']);
cX.callQueue.push(['sync', {'partner': 'aone', 'customerId': 'ff2f3a7bd0ba9892'}]);

(function(d,s,e,t){e=d.createElement(s);e.type='text/java'+s;e.async='async';
e.src='http'+('https:'===location.protocol?'s://s':'://')+'cdn.cxense.com/cx.js';
t=d.getElementsByTagName(s)[0];t.parentNode.insertBefore(e,t);})(document,'script');
// Cxense tracking end

// Cxense advertising script start
var cxUserAttr = {};
(function() {
    var replaceAge = function(age){
        var age = parseInt(age);
        try{
            if(age >= 18 && age <= 19){
                return "1819";
            }else if(age >= 20 && age <= 24){
                return "2024";
            }else if(age >= 25 && age <= 29){
                return "2529";
            }else if(age >= 30 && age <= 34){
                return "3034";
            }else if(age >= 35 && age <= 39){
                return "3539";
            }else if(age >= 40 && age <= 44){
                return "4044";
            }else if(age >= 45 && age <= 49){
                return "4549";
            }else if(age >= 50 && age <= 54){
                return "5054";
            }else if(age >= 55 && age <= 59){
                return "5559";
            }else if(age >= 60 && age <= 64){
                return "6064";
            }else if(age >= 65){
                return "6500";
            }
        }catch(e){}
    };
    var sliceAddressCode = function(address){
        try{
            return address.slice(0,2);
        }catch(e){}
    };
    var cx_k = (function(){
        try{
            var str = "p0:all ";
            if(typeof p2 !== "undefined"){
                str = str + "p2:"+p2+" ";
            }
            if(typeof p3 !== "undefined"){
                str = str + "p3:"+p3+" ";
            }
            if(typeof p4 !== "undefined"){
                str = str + "p4:"+p4+" ";
            }
            if(typeof p5 !== "undefined"){
                str = str + "p5:"+replaceAge(p5)+" ";
            }
            if(typeof p6 !== "undefined"){
                str = str + "p6:"+sliceAddressCode(p6)+" ";
            }
            if(typeof p8 !== "undefined"){
                str = str + "p8:"+p8+" ";
            }
            return str;
        }catch(e){}
    })();
    cx_props.k.push(cx_k);
    cx_props.k.push(cx_k.replace(/:/g, ""));
    cxUserAttr = (function(){
        var str ="";
        try{
            var obj = {};
            obj['sid_kazokudiv'] = p1 ? p1 : "" ;
            obj['p1'] = typeof p10 !== "undefined" ? p10 : "";
            obj['p2'] = typeof p11 !== "undefined" ? p11 : "";
            obj['p3'] = typeof p12 !== "undefined" ? p12 : "";
            obj['p5'] = typeof p13 !== "undefined" ? p13 : "";
            for(var key in obj){
                str = str + "&" + key + "=" + obj[key]
            }
            return encodeURIComponent(str);
        }catch(e){
            return {sid_kazokudiv : "",p1:"",p2:"",p3:"",p5:""};
        }
    })();
})();
function cxRenderFunction(data,context){
    if (typeof cxAdCallback !== 'function') {
        return;
    }
    try{
        var ads = data.searchResult.spaces[0].ads;
        var params = decodeURIComponent(context.userAttr);
        for(var i=0;i<ads.length;i++){
            var ad = ads[i];
            var creative = ad.creative;
            var content = creative.content;
            var isLogin = false;
            for (var j = 0; j < content.length; j++) {
                var contentItem = content[j];
                if (contentItem.key == 'login' && cX.library.getAllText(contentItem.value) == "yes"){
                    isLogin = true;
                }
            }
            if(isLogin){
                var target_url = "";
                var click_url = ad.clickUrl;
                var base_url = creative.destinationUrl;
                target_url = click_url + "?r=" + base_url + params;
                ad.clickUrl = target_url;
            }
        }
        cxAdCallback(data);
    }catch(e){
        cxAdCallback(false);
    }
}
// Cxense advertising script end
