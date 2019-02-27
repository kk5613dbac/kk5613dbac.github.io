"use strict";	// strictモード：VBでの"Option Explicit"とほぼ同義

function ToggleTextBoxLock(obj){
  
  for( var i=0; i<obj.length; i++) {
    if( obj[i].value == 'その他' ) {
      if( obj[i].selected ) {
        document.getElementById('shop_other').disabled = false;
        document.getElementById('shop_other').setAttribute("required", "");
      } else {
        document.getElementById('shop_other').disabled = true;
        document.getElementById('shop_other').removeAttribute("required");
      }
      break;
    }
  }
  
}

(function(){	// 即時関数（呼び出しなしで実行）
  
  window.addEventListener('load', function(){
    
    var forms = document.getElementsByClassName('needs-validation');
　　
    var validation = Array.prototype.filter.call(forms, function(form) {	// form要素のみ絞り込み
      
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
      
    });
    
  }, false);	// addEventListener
  
})();		// function

function DispPictureFileName(obj){
  
  var customFile = obj.parentNode;
  customFile.getElementsByClassName('custom-file-label')[0].textContent = obj.files[0].name;
  
}