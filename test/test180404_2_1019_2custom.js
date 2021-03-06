﻿var parsedArray;
var browserType;

function makeTable(callback) {
	
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

					callback();
					
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

var testArray1 = [
  ["みずほ普通（札幌）", 492132],
  ["みずほ普通（辻堂）", 0],
  ["みずほ定期（札幌）", 3000],
  ["みずほ積立（札幌）", -10000],
  ["現金", 210]
];

var total = 0;

document.addEventListener('DOMContentLoaded', function(){
detectBrowserType();
/* makeTableをコールバックにしないと取得したJSONオブジェクトを以下の処理へ渡せない */
makeTable(function () {
for (var i=0; i<parsedArray.length; i++) {
  $('.accordion #target').append("<div id='#target'></div>");
  $('.accordion #target div').eq(i).attr('id', 'target' + String(i+1));
  $('.accordion #target div').eq(i).attr('data-deleted', 'false');
  $('.accordion #target div').eq(i).attr('data-modified', 'false');
  $('.accordion #target' + String(i+1)).load('template_1017.html', null,
    /* クロージャーでラッピングしないとカウンターの制御がうまくいかない */
    /* →　コールバックの外側が回りきってから内側が実行される */
    (function(i) {
      return function(response, status) {
        $(this).children('.card').attr('data-paymentsId', parsedArray[i][0]);
        $(this).find('.card-header').attr('id', 'heading' + String(i+1));
        $(this).find('.collapse').attr('aria-labelledby', 'heading' + String(i+1));
        $(this).find('.text-body').attr('href', '#collapse' + String(i+1));
        $(this).find('.text-body').attr('aria-controls', 'collapse' + String(i+1));
        $(this).find('.collapse').attr('id', 'collapse' + String(i+1));
        $(this).find('.card-header td').eq(0).text(parsedArray[i][1].substring(0, parsedArray[i][1].indexOf(' ')).replace(/-/g, '/'));
        $(this).find('.card-header td').eq(1).text(parsedArray[i][3]);
        if ((parsedArray[i][4] >= 0) && (parsedArray[i][5] == 0)) {
          $(this).find('.card-header td').eq(2).children('b').text('-\xA5' + String(parsedArray[i][4]).replace('-', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
          total = total - Number(parsedArray[i][4]);
        } else if ((parsedArray[i][4] == 0) && (parsedArray[i][5] >= 0)) {
          $(this).find('.card-header td').eq(2).children('b').text('\xA5' + String(parsedArray[i][5]).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
          total = total + Number(parsedArray[i][5]);
        }
        $(this).find('.details tr').eq(0).children('td').eq(2).text(parsedArray[i][2]);
        $(this).find('.details tr').eq(1).children('td').eq(2).text(parsedArray[i][6]);
        $(this).find('.details tr').eq(2).children('td').eq(2).children('span').eq(0).text(parsedArray[i][7]);
        $(this).find('.details tr').eq(2).children('td').eq(2).children('span').eq(1).text(parsedArray[i][8]);
        $(this).find('.details tr').eq(3).children('td').eq(2).text(parsedArray[i][9]);
        if (i == parsedArray.length - 1) {
          if (total < 0) {
            $('.total td').find('span').text("\xA5" + String(total).replace('-', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
          } else {
            $('.total td').find('span').text("+\xA5" + String(total).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
          }
        }
      };
    })(i)
  );
}
});

for (var i=0; i<testArray1.length; i++) {
  $('.dropdown .list-group').append('<li class="list-group-item custom"><a class="collapsed text-body" data-toggle="collapse" role="button" aria-expanded="false"></a></li>');
  $('.dropdown .list-group-item').eq(i).attr('value', testArray1[i][0]);
  $('.dropdown .collapse a[data-toggle="collapse"]').eq(i).text(testArray1[i][0]);
  $('.dropdown .collapse a[data-toggle="collapse"]').eq(i).attr('href', '#collapseDD' + String(i));
  $('.dropdown .collapse a[data-toggle="collapse"]').eq(i).attr('aria-controls', 'collapseDD' + String(i));
}
    var hiddenItemNo = 0;
    var visibleItem = $('.dropdown .card-header a[data-toggle="collapse"]');
    var selectItem = $('.dropdown .list-group-item').eq(hiddenItemNo);
    visibleItem.text(selectItem.attr('value'));
    selectItem.hide();
    if (testArray1[hiddenItemNo][1] < 0) {
      $('.balance-list td b').text("-\xA5" + String(testArray1[hiddenItemNo][1]).replace('-', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
    } else {
      $('.balance-list td b').text("\xA5" + String(testArray1[hiddenItemNo][1]).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
    }
}, false);

  $(function(){
    $('.dropdown .list-group-item').click(function(){

/* $( selector [ , context ] ) */
/* セレクター文字列を指定して、マッチした要素群のjQueryオブジェクトを返します。 */
/* selector 要素を特定するセレクター文字列を指定します。 */
/* context contextにDOM要素、document、jQueryオブジェクト等を指定することで、selectorはcontexに指定されたものの中から、要素を特定するようになります。 */
/* $('div.foo').click(function() { */
/*   $('span', this).addClass('bar'); */
/* }); */
/* contextにthisを指定することで、this(div.foo)要素内のspanを対象としています。 */

      $('.list-group-item', $(this).closest('.dropdown')).show();
      var hiddenItemNo = $('.list-group-item', $(this).closest('.dropdown')).index(this);
      var visibleItem = $('.card .card-header a[data-toggle="collapse"]', $(this).closest('.dropdown'));
      visibleItem.text($(this).attr('value'));
      $(this).hide();
      if (testArray1[hiddenItemNo][1] < 0) {
        $('.balance-list td b').text("-\xA5" + String(testArray1[hiddenItemNo][1]).replace('-', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
      } else {
        $('.balance-list td b').text("\xA5" + String(testArray1[hiddenItemNo][1]).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
      }
      var visibleItem = $('.collapse', $(this).closest('.dropdown'));
      visibleItem.collapse('hide');
    });
  });

  $(function(){
    /* この記述でないと動的追加要素に作用しない */
    $('#target').on('click', '.btn-outline-secondary, .btn-secondary', function(){
      if ($(this).hasClass('btn-outline-secondary')) {
      $(this).closest('.card-body').children('#target-addform').before('<hr>');
      $(this).closest('.card-body').children('#target-addform')
      /* 引数として指定するコールバック関数は即時関数として記述しないこと */
        .load('template2.html', null, function(){
        /* 日付 */
          $(this).closest('.card-body').find('.edit-form tr').eq(0).find('input')
            /* 複数個所へ反映させるには'<文字列>'ではなく/<文字列>/gで指定 */
            .val($(('.card-header'), $(this).closest('.card')).find('.text-body td').eq(0).text().replace(/\//g, ''));
        /* 分類 */
          $(this).closest('.card-body').find('.edit-form tr').eq(1).find('input')
            .val($(this).closest('.card-body').find('.details tr').eq(0).children('td').eq(2).text());
        /* 項目 */
          $(this).closest('.card-body').find('.edit-form tr').eq(2).find('input')
            .val($(('.card-header'), $(this).closest('.card')).find('.text-body td').eq(1).text());
        /* 支出／収入 */
          $(this).closest('.card-body').find('.edit-form tr').eq(3).find('input')
            .val($(('.card-header'), $(this).closest('.card')).find('.text-body td').eq(2).text().replace('\xA5', '').replace(',', ''));
        /* 種類 */
          $(this).closest('.card-body').find('.edit-form tr').eq(4).find('input')
            .val($(this).closest('.card-body').find('.details tr').eq(1).children('td').eq(2).text());
        /* 費目 */
          $(this).closest('.card-body').find('.edit-form tr').eq(5).find('input')
            .val($(this).closest('.card-body').find('.details tr').eq(2).children('td').eq(2).children('span').eq(0).text());
        /* 内訳 */
          $(this).closest('.card-body').find('.edit-form tr').eq(6).find('input')
            .val($(this).closest('.card-body').find('.details tr').eq(2).children('td').eq(2).children('span').eq(1).text());
        /* 口座 */
          $(this).closest('.card-body').find('.edit-form tr').eq(7).find('input')
            .val($(this).closest('.card-body').find('.details tr').eq(3).children('td').eq(2).text());
      });
      $(this).text('適用');
      $(this).removeClass('btn-outline-secondary');
      $(this).addClass('btn-secondary');
      } else if ($(this).hasClass('btn-secondary')) {
      $(this).closest('.card').map(function(){
        /* 日付 */
        if (($(this).find('.edit-form tr').eq(0).find('input').val() != '')
          && ($(this).find('.edit-form tr').eq(0).find('input').val() != $(this).find('.card-header td').eq(0).text().replace(/\//g, ''))) {
            $(this).find('.card-header td').eq(0).css({
              'font-weight': 'bold',
              'color': 'red'
            });
          $(this).find('.card-header td').eq(0).text($(this).find('.edit-form tr').eq(0).find('input').val()
            .replace(/(\d{4})(\d{2})(\d{2})/g, '$1/$2/$3'));
          if ($(this).closest('.card').parent().attr('data-modified') == 'false') {
            $(this).closest('.card').parent().attr('data-modified', 'true');
          }
        }
        /*  */
        /* 分類 */
        if (($(this).find('.edit-form tr').eq(1).find('input').val() != '')
          && ($(this).find('.edit-form tr').eq(1).find('input').val() != $(this).find('.details tr').eq(0).children('td').eq(2).text())) {
            $(this).find('.details tr').eq(0).children('td').eq(2).css({
              'font-weight': 'bold',
              'color': 'red'
            });
          $(this).find('.details tr').eq(0).children('td').eq(2).text($(this).find('.edit-form tr').eq(1).find('input').val());
          if ($(this).closest('.card').parent().attr('data-modified') == 'false') {
            $(this).closest('.card').parent().attr('data-modified', 'true');
          }
        }
        /*  */
        /* 項目 */
        if (($(this).find('.edit-form tr').eq(2).find('input').val() != '')
          && ($(this).find('.edit-form tr').eq(2).find('input').val() != $(this).find('.card-header td').eq(1).text())) {
            $(this).find('.card-header td').eq(1).css({
              'font-weight': 'bold',
              'color': 'red'
            });
          $(this).find('.card-header td').eq(1).text($(this).find('.edit-form tr').eq(2).find('input').val());
          if ($(this).closest('.card').parent().attr('data-modified') == 'false') {
            $(this).closest('.card').parent().attr('data-modified', 'true');
          }
        }
        /*  */
        /* 支出／収入 */
        if (($(this).find('.edit-form tr').eq(3).find('input').val() != '')
          && ($(this).find('.edit-form tr').eq(3).find('input').val() != $(this).find('.card-header td').eq(2).text().replace('\xA5', '').replace(',', ''))) {
            $(this).find('.card-header td').eq(2).css({
              'font-weight': 'bold',
              'color': 'red'
            });
          if (Number($(this).find('.edit-form tr').eq(3).find('input').val()) < 0) {
            $(this).find('.card-header td').eq(2).text("-\xA5" + $(this).find('.edit-form tr').eq(3).find('input').val()
              .replace('-', '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
          } else {
            $(this).find('.card-header td').eq(2).text("\xA5" + $(this).find('.edit-form tr').eq(3).find('input').val()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
          }
          if ($(this).closest('.card').parent().attr('data-modified') == 'false') {
            $(this).closest('.card').parent().attr('data-modified', 'true');
          }
        }
        /*  */
        /* 種類 */
        if (($(this).find('.edit-form tr').eq(4).find('input').val() != '')
          && ($(this).find('.edit-form tr').eq(4).find('input').val() != $(this).find('.details tr').eq(1).children('td').eq(2).text())) {
            $(this).find('.details tr').eq(1).children('td').eq(2).css({
              'font-weight': 'bold',
              'color': 'red'
            });
          $(this).find('.details tr').eq(1).children('td').eq(2).text($(this).find('.edit-form tr').eq(4).find('input').val());
          if ($(this).closest('.card').parent().attr('data-modified') == 'false') {
            $(this).closest('.card').parent().attr('data-modified', 'true');
          }
        }
        /*  */

        /* 費目 */
        if (($(this).find('.edit-form tr').eq(5).find('input').val() != '')
          && ($(this).find('.edit-form tr').eq(5).find('input').val() != $(this).find('.details tr').eq(2).children('td').eq(2).children('span').eq(0).text())) {
            $(this).find('.details tr').eq(2).children('td').eq(2).children('span').eq(0).css({
              'font-weight': 'bold',
              'color': 'red'
            });
          $(this).find('.details tr').eq(2).children('td').eq(2).children('span').eq(0).text($(this).find('.edit-form tr').eq(5).find('input').val());
          if ($(this).closest('.card').parent().attr('data-modified') == 'false') {
            $(this).closest('.card').parent().attr('data-modified', 'true');
          }
        }
        /*  */

        /* 内訳 */
        if (($(this).find('.edit-form tr').eq(6).find('input').val() != '')
          && ($(this).find('.edit-form tr').eq(6).find('input').val() != $(this).find('.details tr').eq(2).children('td').eq(2).children('span').eq(1).text())) {
            $(this).find('.details tr').eq(2).children('td').eq(2).children('span').eq(1).css({
              'font-weight': 'bold',
              'color': 'red'
            });
          $(this).find('.details tr').eq(2).children('td').eq(2).children('span').eq(1).text($(this).find('.edit-form tr').eq(6).find('input').val());
          if ($(this).closest('.card').parent().attr('data-modified') == 'false') {
            $(this).closest('.card').parent().attr('data-modified', 'true');
          }
        }
        /*  */

        /* 口座 */
        if (($(this).find('.edit-form tr').eq(7).find('input').val() != '')
          && ($(this).find('.edit-form tr').eq(7).find('input').val() != $(this).find('.details tr').eq(3).children('td').eq(2).text())) {
            $(this).find('.details tr').eq(3).children('td').eq(2).css({
              'font-weight': 'bold',
              'color': 'red'
            });
          $(this).find('.details tr').eq(3).children('td').eq(2).text($(this).find('.edit-form tr').eq(7).find('input').val());
          if ($(this).closest('.card').parent().attr('data-modified') == 'false') {
            $(this).closest('.card').parent().attr('data-modified', 'true');
          }
        }
        /*  */
      });
      $(this).closest('.card-body').find('hr').remove();
      $(this).closest('.card-body').find('.edit-form').remove();
      $(this).text('編集');
      $(this).removeClass('btn-secondary');
      $(this).addClass('btn-outline-secondary');
      }
    });
  });

  $(function(){
    $('.linkTest').click(function(){
	getJSON();
    });
  });

  $(function(){
    $('#target').on('click', '.btn-danger, .btn-success', function(){
      var deletedFlag = $(this).closest('.card').parent().attr('data-deleted');
      switch (deletedFlag) {
        case 'false':
      if(confirm('本当に削除しますか？')){
        $('.card-header', $(this).closest('.card')).addClass('bg-warning');
        $(this).closest('.card').parent().attr('data-deleted', 'true');
        $(this).html('削除<br>取消');
        $(this).removeClass('btn-danger');
        $(this).addClass('btn-success');
        alert('削除しました');
      }else{
        return 'false';
      }
          break;
        case 'true':
      if(confirm('削除を取り消しますか？')){
        $('.card-header', $(this).closest('.card')).removeClass('bg-warning');
        $(this).closest('.card').parent().attr('data-deleted', 'false');
        $(this).text('削除');
        $(this).removeClass('btn-success');
        $(this).addClass('btn-danger');
        alert('削除を取り消しました');
      }else{
        return 'false';
      }
      }
    });
  });