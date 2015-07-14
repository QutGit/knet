
jQuery.divselect = function (divselectid, inputselectid) {
	var inputselect = $(inputselectid);
	$(divselectid+" cite").click(function(){
		var ul = $(divselectid+" ul");
		if(ul.css("display")=="none"){
			ul.slideDown("fast");
		}else{
			ul.slideUp("fast");
		}
	});
	$(divselectid+" ul li a").click(function(){
		var txt = $(this).text();
		$(divselectid+" cite").html(txt);
		var value = $(this).attr("selectid");
		inputselect.val(value);
		$(divselectid+" ul").hide();

		$(this).parent().parent().next("input").val(txt);
	});
	$(document).click(function(evt){
		var $target = $(evt.target);
		if (!$target.is("cite") && $target.parents("cite").length == 0) {
			$(divselectid+" ul").hide();
		};
		
	});
};