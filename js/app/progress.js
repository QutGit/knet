function getHeadCanvas(bgNum,iTime){
	var canvas = document.getElementById("canvasHead");
          if (canvas == null) {
              // return false;
          }
          var context = canvas.getContext('2d');
       
        if (!bgNum) {
        	bgNum = 360;
        };
		var timer = null;
		// bgNum = 360;
		var iNum = 0;
		timer = setInterval(function() {

			context.clearRect(0,0,canvas.width,canvas.height);
			
			if (iNum == bgNum) {
				clearInterval(timer);
			}else{
				iNum++;
			}
            
            //最外层的大圆
            context.beginPath();
            context.shadowOffsetX = 6;
            context.shadowOffsetY = 6;
            context.shadowColor = 'rgba(100,100,100,0.5)';
            context.shadowBlur = 6;

            context.lineWidth = 1;
            context.strokeStyle = "#dfe3e3";
            context.arc(100, 100, 70, 0, Math.PI*2, true);
            context.fillStyle = '#fff';
            context.fill();
            context.closePath();
            // context.stroke();

            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.shadowColor = '';
            context.shadowBlur = 0;

            //进度条划过的下面的圆，渐变圆
            var g1 = context.createRadialGradient(100, 100, 10, 120, 120, 60);
            g1.addColorStop(0.5, 'rgb(64,248,20)');  
            g1.addColorStop(1, 'rgb(15,179,212)');
            context.fillStyle = g1;
            context.beginPath();
            context.arc(100, 100, 70, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();


            //外面运动的圆
            context.arc(100, 100, 60, 0*Math.PI/180, iNum*Math.PI/180, false);
            context.fillStyle = '#ececec';
            context.lineTo(100,100);
            context.fill();
            context.closePath();

            //最里面的空心圆
            context.beginPath();
            context.arc(100, 100, 50, 0, Math.PI*2, true);
            context.fillStyle = '#fff';
            context.fill();
            context.closePath();
         },iTime)
}

function dragProgress(iLevel){
	var isMove=false;//预置移动
	var $bg_width=$(".pro-bg").width();//设置标尺宽度
	//进度背景的偏移量
	var $bg_left = $(".pro-bg").offset().left;

	var $btn_width = $(".pro-btn").width();

	var $cur_left = parseInt($(".pro-btn").css("left"));

	if (iLevel) {
		if (iLevel == "low") {
			setLow(0);
		}else if(iLevel == "mid"){

			var iLeft = $bg_width/2 - $btn_width/2 + 12;
			setMid(iLeft);

		}else if(iLevel == "high"){

			var iLeft = $bg_width - $btn_width;
			setHigh(iLeft);

		}else{
			setLow(0);
		}
	}else{
		setLow(0);
	}

	//设置拖动按钮的初始位置
	// $(".pro-btn").css("left",0);
	//设置拖动按钮的鼠标按下事件
	$(".pro-btn").mousedown(function(){
		isMove = true;
		//设置鼠标移动按钮
		$(this).mousemove(function(e){
			if (isMove) {
				$(this).css("left",e.pageX - $bg_left - $btn_width/2);

				$cur_left = parseInt($(".pro-btn").css("left"));

				var self = this;
				
				//如果超出左边界设置left为0
				if ($cur_left < 0) {
					$(this).css("left",0);
				};
				//如果超出右边界设置显示在拖动条的最右边
				if ($cur_left > ($bg_width - $btn_width)) {
					$(this).css("left",($bg_width - $btn_width));
				};
				
			};
		})
	})

	$(document).mouseup(function(){
		isMove=false;
		var $b_left = parseInt($(".pro-btn").css("left"));
		$(".level").parent().removeClass('[class^=lev]');
		//高
		if ($b_left >= $bg_width * 0.75) {
			var iLeft = $bg_width - $btn_width;
			setHigh(iLeft);

		}else if($b_left >= $bg_width * 0.5){//中
			var iLeft = $bg_width/2 - $btn_width/2 + 12;
			setMid(iLeft);
		}else if($b_left >= $bg_width * 0.25){//中
			var iLeft = $bg_width/2 - $btn_width/2 + 12;
			setMid(iLeft);
		}else{//低
			setLow(0);
		}
	});
	
}

function setLow(iLeft){
	$(".pro-btn").css("left",0);
	// $(".level").parent().removeClass('[class*=lev-]');
	$(".high").addClass('lev-l')
	$(".mid").removeClass('lev-m');
	$(".low").removeClass('lev-h');
	return iLeft;
}

function setMid(iLeft){
	$(".pro-btn").css("left",iLeft);
	$(".level").parent().removeClass('[class^=lev]');
	$(".mid").addClass('lev-m')

	$(".high").removeClass('lev-l')
	$(".low").removeClass('lev-h');
	return iLeft;
}

function setHigh(iLeft){
	$(".pro-btn").css("left",iLeft);
	$(".level").parent().removeClass('[class^=lev]');
	$(".low").addClass('lev-h');

	$(".mid").removeClass('lev-m')
	$(".high").removeClass('lev-l');
	return iLeft;
}

//初始化页面的高度
function initPage(){
	var H = $(document.body).height();
	var navH = $(".totalbar").height();
	var footH = $(".footer").height();

	var getH = H - navH - footH;
	var trueH = $(".wrap").height();

	if (trueH < getH) {
		$(".wrap").height(getH);
	};
}

