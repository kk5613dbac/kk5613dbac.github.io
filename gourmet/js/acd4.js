function acdMenu2(){
	$("#acd-menu dd").css("display", "none");
	$("#acd-menu dt").click(function(){
		$(".open").not(this).removeClass("open").next().slideUp("fast");
		$(this).toggleClass("open").next().slideToggle("fast");
	});
}

$(function(){
	acdMenu2();
});
