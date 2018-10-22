var parsedArray; /* デバッグ用 */

var testArray1 = [
  ['みずほ普通（札幌）', 492132],
  ['みずほ普通（辻堂）', 0],
  ['みずほ定期（札幌）', 3000],
  ['みずほ積立（札幌）', -10000],
  ['現金', 210]
];

function DetectBrowserType() {
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
  return browserType;
}

function GetAjaxRequest(callback1, callback2) {
  var browserType;
  /* var parsedArray; */
  var resultJSON;
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'test180330_2_2_1002custom.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.responseType = 'json'
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      resultJSON = xhr.response;
      if (resultJSON) {
        browserType = callback1();
        if (browserType == 'Internet Explorer') {
          parsedArray = JSON.parse(resultJSON);
          callback2(parsedArray);
        } else {
          parsedArray = resultJSON;
          callback2(parsedArray);
        }
      } else {
        alert('Error');
      }
      xhr.abort();
    }
  };
  xhr.send();
}

function CreateCardTable(JSONArray) {
  var total = 0;
  for (var i=0; i<JSONArray.length; i++) {
    $('.accordion #target').append('<div id=\'#target\'></div>');
    $('.accordion #target div').eq(i).attr('id', 'target' + String(i+1));
    $('.accordion #target div').eq(i).attr('data-deleted', 'false');
    $('.accordion #target div').eq(i).attr('data-modified', 'false');
    /* クロージャーでラッピングしないとカウンターの制御がうまくいかない */
    /* →　コールバックの外側が回りきってから内側が実行される */
    $('.accordion #target' + String(i+1)).load('template_1017.html', null, (function(cnt) {
      return function(response, status) {
        $(this).children('.card').attr('data-paymentsId', JSONArray[cnt][0]);
        $(this).find('.card-header').attr('id', 'heading' + String(cnt+1));
        $(this).find('.collapse').attr('aria-labelledby', 'heading' + String(cnt+1));
        $(this).find('.text-body').attr('href', '#collapse' + String(cnt+1));
        $(this).find('.text-body').attr('aria-controls', 'collapse' + String(cnt+1));
        $(this).find('.collapse').attr('id', 'collapse' + String(cnt+1));
        $(this).find('.card-header td').eq(0).text(JSONArray[cnt][1].substring(0, JSONArray[cnt][1].indexOf(' ')).replace(/-/g, '/'));
        $(this).find('.card-header td').eq(1).text(JSONArray[cnt][3]);
        if ((JSONArray[cnt][4] >= 0) && (JSONArray[cnt][5] == 0)) {
          $(this).find('.card-header td').eq(2).children('b').text('-\xA5' + String(JSONArray[cnt][4]).replace('-', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
          total = total - Number(JSONArray[cnt][4]);
        } else if ((JSONArray[cnt][4] == 0) && (JSONArray[cnt][5] >= 0)) {
          $(this).find('.card-header td').eq(2).children('b').text('\xA5' + String(JSONArray[cnt][5]).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
          total = total + Number(JSONArray[cnt][5]);
        }
        $(this).find('.details tr').eq(0).children('td').eq(2).text(JSONArray[cnt][2]);
        $(this).find('.details tr').eq(1).children('td').eq(2).text(JSONArray[cnt][6]);
        $(this).find('.details tr').eq(2).children('td').eq(2).children('span').eq(0).text(JSONArray[cnt][7]);
        $(this).find('.details tr').eq(2).children('td').eq(2).children('span').eq(1).text(JSONArray[cnt][8]);
        $(this).find('.details tr').eq(3).children('td').eq(2).text(JSONArray[cnt][9]);
        if (cnt == JSONArray.length - 1) {
          if (total < 0) {
            $('.total td').find('span').text('\xA5' + String(total).replace('-', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
          } else {
            $('.total td').find('span').text('+\xA5' + String(total).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
          }  /* if (total ...) */
        }  /* if (cnt ...) */
      };  /* return */
      })(i)  /* (function(cnt) { ... })(i) */
    );  /* load */
  }  /* forループ */
}

function CreatePaymentSourceTable() {
  for (var i=0; i<testArray1.length; i++) {
    $('.dropdown .list-group').append('<li class=\'list-group-item custom\'><a class=\'collapsed text-body\' data-toggle=\'collapse\' role=\'button\' aria-expanded=\'false\'></a></li>');
    $('.dropdown .list-group-item').eq(i).attr('value', testArray1[i][0]);
    $('.dropdown .collapse a[data-toggle=\'collapse\']').eq(i).text(testArray1[i][0]);
    $('.dropdown .collapse a[data-toggle=\'collapse\']').eq(i).attr('href', '#collapseDD' + String(i));
    $('.dropdown .collapse a[data-toggle=\'collapse\']').eq(i).attr('aria-controls', 'collapseDD' + String(i));
  }
  var hiddenItemNo = 0;
  var visibleItem = $('.dropdown .card-header a[data-toggle=\'collapse\']');
  var selectItem = $('.dropdown .list-group-item').eq(hiddenItemNo);
  visibleItem.text(selectItem.attr('value'));
  selectItem.hide();
  if (testArray1[hiddenItemNo][1] < 0) {
    $('.balance-list td b').text('-\xA5' + String(testArray1[hiddenItemNo][1]).replace('-', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
  } else {
    $('.balance-list td b').text('\xA5' + String(testArray1[hiddenItemNo][1]).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
  }
}

function TogglePaymentSource(targetObj) {
  $('.list-group-item', targetObj.closest('.dropdown')).show();
  var hiddenItemNo = $('.list-group-item', targetObj.closest('.dropdown')).index(targetObj);
  var visibleItem = $('.card .card-header a[data-toggle=\'collapse\']', targetObj.closest('.dropdown'));
  visibleItem.text(targetObj.attr('value'));
  targetObj.hide();
  if (testArray1[hiddenItemNo][1] < 0) {
    $('.balance-list td b').text('-\xA5' + String(testArray1[hiddenItemNo][1]).replace('-', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
  } else {
    $('.balance-list td b').text('\xA5' + String(testArray1[hiddenItemNo][1]).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
  }
}

function ToggleEditForm(targetObj) {
  if (targetObj.hasClass('btn-outline-secondary')) {
    targetObj.closest('.card-body').children('#target-addform').before('<hr>');
    targetObj.closest('.card-body').children('#target-addform')
      /* 引数として指定するコールバック関数は即時関数として記述しないこと */
      .load('template2.html', null, function(){
        MapDetailsInfo(targetObj.closest('.card-body').children('#target-addform'));
      });
    targetObj.text('適用');
    targetObj.removeClass('btn-outline-secondary');
    targetObj.addClass('btn-secondary');
  } else if (targetObj.hasClass('btn-secondary')) {
    targetObj.closest('.card').map(function(){
      HighlightModifiedText(targetObj.closest('.card'));
    });
    targetObj.closest('.card-body').find('hr').remove();
    targetObj.closest('.card-body').find('.edit-form').remove();
    targetObj.text('編集');
    targetObj.removeClass('btn-secondary');
    targetObj.addClass('btn-outline-secondary');
  }
}

function MapDetailsInfo(targetObj){
  /* 日付 */
  targetObj.closest('.card-body').find('.edit-form tr').eq(0).find('input')
    /* 複数個所へ反映させるには'<文字列>'ではなく/<文字列>/gで指定 */
    .val($(('.card-header'), targetObj.closest('.card')).find('.text-body td').eq(0).text().replace(/\//g, ''));
  /* 分類 */
  targetObj.closest('.card-body').find('.edit-form tr').eq(1).find('input')
    .val(targetObj.closest('.card-body').find('.details tr').eq(0).children('td').eq(2).text());
  /* 項目 */
  targetObj.closest('.card-body').find('.edit-form tr').eq(2).find('input')
    .val($(('.card-header'), targetObj.closest('.card')).find('.text-body td').eq(1).text());
  /* 支出／収入 */
  targetObj.closest('.card-body').find('.edit-form tr').eq(3).find('input')
    .val($(('.card-header'), targetObj.closest('.card')).find('.text-body td').eq(2).text().replace('\xA5', '').replace(',', ''));
  /* 種類 */
  targetObj.closest('.card-body').find('.edit-form tr').eq(4).find('input')
    .val(targetObj.closest('.card-body').find('.details tr').eq(1).children('td').eq(2).text());
  /* 費目 */
  targetObj.closest('.card-body').find('.edit-form tr').eq(5).find('input')
    .val(targetObj.closest('.card-body').find('.details tr').eq(2).children('td').eq(2).children('span').eq(0).text());
  /* 内訳 */
  targetObj.closest('.card-body').find('.edit-form tr').eq(6).find('input')
    .val(targetObj.closest('.card-body').find('.details tr').eq(2).children('td').eq(2).children('span').eq(1).text());
  /* 口座 */
  targetObj.closest('.card-body').find('.edit-form tr').eq(7).find('input')
    .val(targetObj.closest('.card-body').find('.details tr').eq(3).children('td').eq(2).text());
}

function HighlightModifiedText(targetObj){
  /* 日付 */
  if ((targetObj.find('.edit-form tr').eq(0).find('input').val() != '')
    && (targetObj.find('.edit-form tr').eq(0).find('input').val() != targetObj.find('.card-header td').eq(0).text().replace(/\//g, ''))) {
      targetObj.find('.card-header td').eq(0).css({
        'font-weight': 'bold',
        'color': 'red'
      });
    targetObj.find('.card-header td').eq(0).text(targetObj.find('.edit-form tr').eq(0).find('input').val()
      .replace(/(\d{4})(\d{2})(\d{2})/g, '$1/$2/$3'));
    if (targetObj.closest('.card').parent().attr('data-modified') == 'false') {
      targetObj.closest('.card').parent().attr('data-modified', 'true');
    }
  }
  /*  */
  /* 分類 */
  if ((targetObj.find('.edit-form tr').eq(1).find('input').val() != '')
    && (targetObj.find('.edit-form tr').eq(1).find('input').val() != targetObj.find('.details tr').eq(0).children('td').eq(2).text())) {
      targetObj.find('.details tr').eq(0).children('td').eq(2).css({
        'font-weight': 'bold',
        'color': 'red'
      });
    targetObj.find('.details tr').eq(0).children('td').eq(2).text(targetObj.find('.edit-form tr').eq(1).find('input').val());
    if (targetObj.closest('.card').parent().attr('data-modified') == 'false') {
      targetObj.closest('.card').parent().attr('data-modified', 'true');
    }
  }
  /*  */
  /* 項目 */
  if ((targetObj.find('.edit-form tr').eq(2).find('input').val() != '')
    && (targetObj.find('.edit-form tr').eq(2).find('input').val() != targetObj.find('.card-header td').eq(1).text())) {
      targetObj.find('.card-header td').eq(1).css({
        'font-weight': 'bold',
        'color': 'red'
      });
    targetObj.find('.card-header td').eq(1).text(targetObj.find('.edit-form tr').eq(2).find('input').val());
    if (targetObj.closest('.card').parent().attr('data-modified') == 'false') {
      targetObj.closest('.card').parent().attr('data-modified', 'true');
    }
  }
  /*  */
  /* 支出／収入 */
  if ((targetObj.find('.edit-form tr').eq(3).find('input').val() != '')
    && (targetObj.find('.edit-form tr').eq(3).find('input').val() != targetObj.find('.card-header td').eq(2).text().replace('\xA5', '').replace(',', ''))) {
      targetObj.find('.card-header td').eq(2).css({
        'font-weight': 'bold',
        'color': 'red'
      });
    if (Number(targetObj.find('.edit-form tr').eq(3).find('input').val()) < 0) {
      targetObj.find('.card-header td').eq(2).text("-\xA5" + targetObj.find('.edit-form tr').eq(3).find('input').val()
        .replace('-', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
    } else {
      targetObj.find('.card-header td').eq(2).text("\xA5" + targetObj.find('.edit-form tr').eq(3).find('input').val()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
    }
    if (targetObj.closest('.card').parent().attr('data-modified') == 'false') {
      targetObj.closest('.card').parent().attr('data-modified', 'true');
    }
  }
  /*  */
  /* 種類 */
  if ((targetObj.find('.edit-form tr').eq(4).find('input').val() != '')
    && (targetObj.find('.edit-form tr').eq(4).find('input').val() != targetObj.find('.details tr').eq(1).children('td').eq(2).text())) {
      targetObj.find('.details tr').eq(1).children('td').eq(2).css({
        'font-weight': 'bold',
        'color': 'red'
      });
    targetObj.find('.details tr').eq(1).children('td').eq(2).text(targetObj.find('.edit-form tr').eq(4).find('input').val());
    if (targetObj.closest('.card').parent().attr('data-modified') == 'false') {
      targetObj.closest('.card').parent().attr('data-modified', 'true');
    }
  }
  /*  */
  /* 費目 */
  if ((targetObj.find('.edit-form tr').eq(5).find('input').val() != '')
    && (targetObj.find('.edit-form tr').eq(5).find('input').val() != targetObj.find('.details tr').eq(2).children('td').eq(2).children('span').eq(0).text())) {
      targetObj.find('.details tr').eq(2).children('td').eq(2).children('span').eq(0).css({
        'font-weight': 'bold',
        'color': 'red'
      });
    targetObj.find('.details tr').eq(2).children('td').eq(2).children('span').eq(0).text(targetObj.find('.edit-form tr').eq(5).find('input').val());
    if (targetObj.closest('.card').parent().attr('data-modified') == 'false') {
      targetObj.closest('.card').parent().attr('data-modified', 'true');
    }
  }
  /*  */
  /* 内訳 */
  if ((targetObj.find('.edit-form tr').eq(6).find('input').val() != '')
    && (targetObj.find('.edit-form tr').eq(6).find('input').val() != targetObj.find('.details tr').eq(2).children('td').eq(2).children('span').eq(1).text())) {
      targetObj.find('.details tr').eq(2).children('td').eq(2).children('span').eq(1).css({
        'font-weight': 'bold',
        'color': 'red'
      });
    targetObj.find('.details tr').eq(2).children('td').eq(2).children('span').eq(1).text(targetObj.find('.edit-form tr').eq(6).find('input').val());
    if (targetObj.closest('.card').parent().attr('data-modified') == 'false') {
      targetObj.closest('.card').parent().attr('data-modified', 'true');
    }
  }
  /*  */
  /* 口座 */
  if ((targetObj.find('.edit-form tr').eq(7).find('input').val() != '')
    && (targetObj.find('.edit-form tr').eq(7).find('input').val() != targetObj.find('.details tr').eq(3).children('td').eq(2).text())) {
      targetObj.find('.details tr').eq(3).children('td').eq(2).css({
        'font-weight': 'bold',
        'color': 'red'
      });
    targetObj.find('.details tr').eq(3).children('td').eq(2).text(targetObj.find('.edit-form tr').eq(7).find('input').val());
    if (targetObj.closest('.card').parent().attr('data-modified') == 'false') {
      targetObj.closest('.card').parent().attr('data-modified', 'true');
    }
  }
  /*  */
}

function ToggleDeleteFlag(targetObj) {
  var deletedFlag = targetObj.closest('.card').parent().attr('data-deleted');
  switch (deletedFlag) {
    case 'false':
      if(confirm('本当に削除しますか？')){
        $('.card-header', targetObj.closest('.card')).addClass('bg-warning');
        targetObj.closest('.card').parent().attr('data-deleted', 'true');
        targetObj.html('削除<br>取消');
        targetObj.removeClass('btn-danger');
        targetObj.addClass('btn-success');
        alert('削除しました');
      }else{
        return 'false';
      }
      break;
    case 'true':
      if(confirm('削除を取り消しますか？')){
        $('.card-header', targetObj.closest('.card')).removeClass('bg-warning');
        targetObj.closest('.card').parent().attr('data-deleted', 'false');
        targetObj.html('削除');
        targetObj.removeClass('btn-success');
        targetObj.addClass('btn-danger');
        alert('削除を取り消しました');
      }else{
        return 'false';
      }
  }
}

function getJSON() {
  alert(parsedArray);
  alert(parsedArray.length);
  alert(parsedArray[0].length);
}

document.addEventListener('DOMContentLoaded', function() {
  /* makeTableをコールバックにしないと取得したJSONオブジェクトを以下の処理へ渡せない */
  GetAjaxRequest(DetectBrowserType, CreateCardTable);
  CreatePaymentSourceTable();
}, false);

$(function(){
  $('.dropdown .list-group-item').click(function() {
    /* $( selector [ , context ] ) */
    /* セレクター文字列を指定して、マッチした要素群のjQueryオブジェクトを返します。 */
    /* selector 要素を特定するセレクター文字列を指定します。 */
    /* context contextにDOM要素、document、jQueryオブジェクト等を指定することで、selectorはcontexに指定されたものの中から、要素を特定するようになります。 */
    /* $('div.foo').click(function() { */
    /*   $('span', this).addClass('bar'); */
    /* }); */
    /* contextにthisを指定することで、this(div.foo)要素内のspanを対象としています。 */
    TogglePaymentSource($(this));
    var visibleItem = $('.collapse', $(this).closest('.dropdown'));
    visibleItem.collapse('hide');
  });
});

  /* この記述でないと動的追加要素に作用しない */
$(function(){
  $('#target').on('click', '.btn-outline-secondary, .btn-secondary', function() {
    ToggleEditForm($(this));
  });
});

$(function(){
  $('#target').on('click', '.btn-danger, .btn-success', function() {
    ToggleDeleteFlag($(this));
  });
});

$(function(){
  $('.linkTest').click(function() {
    getJSON();
  });
});