function ToggleTextBoxLock(obj){
  
  for( var i=0; i<obj.length; i++) {
    if( obj[i].value == 'その他' ) {
      if( obj[i].selected ) {
        document.getElementById('shop_other').disabled = false;
      } else {
        document.getElementById('shop_other').disabled = true;
      }
      break;
    }
  }
  
}