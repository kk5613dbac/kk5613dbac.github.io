/***************************************
* レイアウト調整JS
*/

(function($) {
$(document).ready(function() {

	/* 直接記述されている属性の削除 */
	$("*").removeAttr("width");
	$("*").removeAttr("height");
	/* 
		JSPにstyle属性が直接記述されたため、
		JSPの該当要素にclass（removeStyleSp）を追記し
		style属性を削除する
	*/
	$(".removeStyleSp").removeAttr("style");

});
})(jQuery);
