if (navigator.userAgent.match(/iPhone.*Mobile.*Safari/)) {
    window.onpageshow = clickInit;
    window.onpagehide = clickInit;
} else {
    window.onload = clickInit;
    window.onunload = clickInit;
}
window.document.onkeydown = checkShortKey;
var isClicked = false;

function MM_preloadImages() { //v3.0
  clickInit();
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function checkShortKey(e) {
 
 var e = e || window.event;

 var sourceObject = null;

 if (document.all) {
  sourceObject = e.srcElement;
 } else {
  sourceObject = e.target;
 }

 if (((sourceObject.type == "text")
    || (sourceObject.type == "password"))
    && e.keyCode == 13) {
  return false;
 }
 
 return true;
}

function cancelconfirm() {
     if (window.confirm("今までの入力が破棄されますがよろしいですか？")) {
          return true;
     } else {
          return false;
     }
}

function cancelconfirmNoInput() {
     if (window.confirm("お申し込みキャンセルになりますがよろしいですか？")) {
          return true;
     } else {
          return false;
     }
}

function popup(path) {
  	
  	var win = null;
  	
  	text=path.split("/");   	
  	
  	var filename = text[text.length - 1];
  	 
  	text2=filename.split(".");  
  	
  	
 	win = window.open(path,text2[0],'width=920,height=660,titlebar=no,scrollbars=yes,toolbar=no,status=no');
 	win.focus();
  	return false;
}

function externalPopup(path, target, params) {
  	
  	var win = null;
  	  	
 	win = window.open(path, target, params);
 	win.focus();
  	return false;
}

function clickInit() {
  isClicked = false;
}

function alreadyClicked() {
  if(isClicked) {
    return false;
  } else {
    isClicked = true;
    return true;
  }
}

function alreadyClickedEx() {
	if(isClicked) {
		return false;
	} else {
		return true;
	}
}

function mailDeliveryHopeCheck() {
   if(document.forms[0].mobileEmailAddress.value ==""){
   	document.forms[0].sendMailToMB[0].checked = false;
   	document.forms[0].sendMailToMB[1].checked = true;
 	}
}

function removeElement() {
	var rmb;
	if (arguments.length == 1) {
		rmb = document.getElementById(arguments[0]);
	} else {
		rmb = document.getElementById('rmb');
	}
		
	if (rmb != null) {
		var p = rmb.parentNode;
		p.removeChild(rmb);
	}
}

// ポイント広場でアイテム番号検索時の特殊対応
function hideElement(nm,inArea){
  var style=document.getElementById?
              document.getElementById(nm).style:(
                document.all?document.all(nm).style:(
                  document.layers?document.layers[nm]:null
                  )
              );
  if(style) style.visibility='hidden';
  //
  document.getElementById(inArea).value  = '';
}

function cancelconfirmplus() {
    if (window.confirm("自動交換設定は完了していません。\nここで画面を閉じると自動交換設定はされませんがよろしいですか？")) {
    	  window.opener=null;
         window.close();
    } else {
         return false;
    }
}