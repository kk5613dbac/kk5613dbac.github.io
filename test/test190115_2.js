function ToggleMenu(obj){
  
  var mode_val = obj.getElementsByTagName('label');
  
  for( var i=0; i<mode_val.length; i++) {
    if( mode_val[i].children[0].checked == false ) {
      document.getElementsByTagName('form')[0].children[mode_val[i].children[0].id].style.display = 'none';
    } else {
      document.getElementsByTagName('form')[0].children[mode_val[i].children[0].id].style.display = 'block';
    }
  }
  
}

function ToggleTextBoxLock(obj){
  
  for( var i=0; i<obj.length; i++) {
    if( obj[i].value == 'other' ) {
      if( obj[i].selected ) {
        document.getElementById('shop_other').disabled = false;
      } else {
        document.getElementById('shop_other').disabled = true;
      }
      break;
    }
  }
  
}