/*
	jquery 1.9 부터는 live 이벤트는 삭제되었으며 이상의 버전 사용시 live 대신 on 을 이용하세요.
	// 스크립트 디버깅시 콘솔프린트 금지 ie9 에서 오류남
*/

// backspace 막기
$(document).keydown(function(e) {
    key = (e) ? e.keyCode : event.keyCode;

    var t = document.activeElement;	
    if (key == 8  || key == 17) { // F5 key == 116
        if (key == 8) {
            if (t.tagName != "INPUT" && t.tagName != "TEXTAREA") {
                if (e) {
                    e.preventDefault();
                } else {
                    event.keyCode = 0;
                    event.returnValue = false;
                }
            }
        } else {
            if (e) {
                e.preventDefault();
            } else {
                event.keyCode = 0;
                event.returnValue = false;
            }
        }
    }
});
// backbutton 막기
//history.pushState(null, null, "#noback");
//$(window).bind("hashchange", function(){
  //history.pushState(null, null, "#noback");
//});


$(document).ready(function() {


	var offset = 200,
	scroll_top_duration = 100,
	$back_to_top = $('.cd-top');

	$(window).scroll(function(){
		if($(this).scrollTop() > offset){
			$back_to_top.animate({'bottom':'30px'},100);			

		}else{
		    $back_to_top.animate({'bottom':'-45px'},100);
		}
	});
	$('.cd-top').live( "click", function(event) {		
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});
	//


	$( ".basic_list tr" ).live( "click", function() {
		$(this).closest("table").find("tr").removeClass('tr_selected');
		$(this).addClass('tr_selected');
	});

	// input 선택될때 보더
	$(".text_box").live('focusin', function() {
		//$(this).css("border","1px solid  #a5c7ed");
		$(this).css("border","1px solid  #ff0000");		
		if($(this).hasClass('calendar')){
			$(this).Zebra_DatePicker({show_icon: false,lang_clear_date:'취소'});
		}		
	}).live('focusout', function() {
		$(this).css("border","1px solid #dcdee0");	
	});	

	/*
		예) input class="comma" 사용할 클래스 명을 넣음 라이브 바인딩 됨
	*/

	// 콤마 넣기
	$(".comma").live('keyup', function(event) {
		if(event.which >= 37 && event.which <= 40) return;
		$(this).val(function(index, value) {
			return value
			.replace(/\D/g, "")
			.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
			;
		 });
	});	

	// 전화번호 (-) 넣기
	$(".phone_number").live('keyup', function(event) {
		if(event.which >= 37 && event.which <= 40) return;
		$(this).val(function(index, value) {
			if(value.length==8){
				return value.replace(/\D/g, "").replace(/(\d{4})(\d{4})/,"$1-$2");			
			}else{
				return value.replace(/\D/g, "").replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
			}

		 });
	});	


	// 사업자번호 (-) 넣기
	$(".company_number").live('keyup', function(event) {	
		if(event.which >= 37 && event.which <= 40) return;
		$(this).val(function(index, value) {
			return value
			.replace(/\D/g, "")
			.replace(/(\d{3})(\d{2})(\d{5})/,"$1-$2-$3");
		 });
	});	

	// 주민번호 (-) 넣기
	$(".jumin_number").live('keyup', function(event) {	
		if(event.which >= 37 && event.which <= 40) return;
		$(this).val(function(index, value) {
			return value
			.replace(/\D/g, "")
			.replace(/(\d{6})(\d{7})/,"$1-$2");
		 });
	});	

	// 날짜 시간 (-) 넣기  달력형이 아닌 입력형 요구시
	$(".date_number").live('keyup', function(event) {	
		if(event.which >= 37 && event.which <= 40) return;
		$(this).val(function(index, value) {
			return value
			.replace(/\D/g, "")
			.replace(/(\d{4})(\d{2})(\d{2})/,"$1-$2-$3");
		 });
	});	

	// 시간 (:) 넣기
	$(".time_number").live('keyup', function(event) {	
		if(event.which >= 37 && event.which <= 40) return;
		$(this).val(function(index, value) {
			return value
			.replace(/\D/g, "")
			.replace(/(\d{2})(\d{2})/,"$1:$2");
		 });
	});	
	

	$(".number_only").live('keyup', function(event) {	
		val=$(this).val();
		re=/[^0-9]/gi;
		$(this).val(val.replace(re,""));
	});	


});
//날짜값 yyyy-mm-dd로 바꾸기
function formatDate(date) { 
	
	var d = new Date(date), 
	
	month = '' + (d.getMonth() + 1), 
	day = '' + d.getDate(), 
	year = d.getFullYear(); 
	
	if (month.length < 2) 
		month = '0' + month; 
	if (day.length < 2) 
		day = '0' + day; 
	
	return [year, month, day].join('-'); 
}
//atm_날짜값 10자리 예:)2020-01-01 받아서 쪼개한 값이 올바른지
function dateprompt(instr){
	const str = instr;

	//현재날짜
	var date = new Date(),
	month = '' + (date.getMonth() + 1), 
	day = '' + date.getDate(), 
	year = date.getFullYear();

	//날짜 가공
	if (month.length < 2) 
		month = '0' + month; 
	if (day.length < 2) 
		day = '0' + day; 
	const date_ymd = [year, month, day].join('-');
	
	//날짜값 비정상일때
	if (str == "" || str == undefined || str.length > 10 || str.length < 10){
		return "";
	}
	//날짜값 정상일때
	else if ( str.length == 10 ){
		var strArray = new Array();
		strArray = str.split('-');

		//년도
		if(strArray[0].length == 4 && isNaN(strArray[0]) == false){
			strArray[0]=parseInt(strArray[0]);
			if( strArray[0] > 1900 && strArray[0] < 2100 ){
				return instr;
			}
			else if ( strArray[0] < 1900 || strArray[0] > 2100 ){
				return date_ymd;
			}
		}
		else if (strArray[0].length == 4 && isNaN(strArray[0]) == true ){
			return date_ymd;
		}

		//월
		if(strArray[1].length == 2 && isNaN(strArray[1]) == false){
			strArray[1]=parseInt(strArray[1]);
			if( strArray[1] >= 1 && strArray[1] <=  12){
				return instr;
			}
			else if ( strArray[1] < 1 || strArray[1] > 12 ){
				return date_ymd;
			}
		}
		else if (strArray[1].length == 2 && isNaN(strArray[1]) == true ){
			return date_ymd;
		}

		//일
		if(strArray[2].length == 2 && isNaN(strArray[2]) == false){
			strArray[2]=parseInt(strArray[2]);
			if( strArray[0] >= 1 && strArray[0] <= 31 ){
				return instr;
			}
			else if ( strArray[2] < 1 || strArray[2] > 31 ){
				return date_ymd;
			}
		}
		else if (strArray[2].length == 4 && isNaN(strArray[2]) == true ){
			return date_ymd;
		}
	}
}


// 자릿 수 맞추기 10 -> 0010 = pad(10,4);
function pad(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

// 입력값의 바이트 길이를 리턴 * ex) if (getByteLength(form.title) > 100) { 	 *         alert("제목은 한글 50자(영문 100자) 이상 입력할 수 없습니다.");	 *     } 
function getByteLength(input) {
 var byteLength = 0;
 if ( input == null ) return 0;
	for (var inx = 0; inx < input.length; inx++) {
				var oneChar = escape(input.charAt(inx));
			if ( oneChar.length == 1 ) {
				byteLength ++;
				} else if (oneChar.indexOf("%u") != -1) {
					byteLength += 2;
			} else if (oneChar.indexOf("%") != -1) {
					byteLength += oneChar.length/3;
				   }
	} // enf of for loop
	return byteLength;
}


// 화면에 보이는 InnerHTML 을 엑셀로 다운로드 한다.
// onclick="export_excel('HTML아이디','test.xls');"
function export_excel(inner_id,save_filename){
  var data = $("#"+inner_id).html();
  $('#export_xls_data').val(data);
  $('#export_xls_name').val(save_filename); 
  $('#export_data').submit();
}

// 화면에 보이는 InnerHtml 부분을 인쇄 한다.
// onclick="$('#print_body').print();" 별도 함수 없음


function async_menu(url){
	// 동기방식 호출
	var json_data=null;

	url=encodeURIComponent(url);

	$.ajax({
			url: '/get_menu_id.php?url='+url+'&is_get_menu=1',
			type: "POST",
			dataType: "json",
			async:false,
			success : function (data) {					
				json_data=data;
			}
	});
	return json_data;
}



// float table header
;(function($) {
   $.fn.fixMe = function() {
      return this.each(function() {
         var $this = $(this),
            $t_fixed;
         function init() {
            $this.wrap('<div class="container" />');
            $t_fixed = $this.clone();
            $t_fixed.find("tbody").remove().end().addClass("fixed").insertBefore($this);
            resizeFixed();
         }
         function resizeFixed() {
            $t_fixed.find("th").each(function(index) {
               $(this).css("width",$this.find("th").eq(index).outerWidth()+"px");
            });
         }
         function scrollFixed() {
            var offset = $(this).scrollTop(),
            tableOffsetTop = $this.offset().top,
            tableOffsetBottom = tableOffsetTop + $this.height() - $this.find("thead").height();
            if(offset < tableOffsetTop || offset > tableOffsetBottom)
               $t_fixed.hide();
            else if(offset >= tableOffsetTop && offset <= tableOffsetBottom && $t_fixed.is(":hidden"))
               $t_fixed.show();
         }
         $(window).resize(resizeFixed);
         $(window).scroll(scrollFixed);
         init();
      });
   };
})(jQuery);
/*
$(document).ready(function(){
   $("#system_perm").fixMe();
   $(".up").click(function() {
      $('html, body').animate({
      scrollTop: 0
   }, 2000);
 });
});
*/

function set_cookie(name, value, expirehours, domain)
{
	var today = new Date();
	today.setTime(today.getTime() + (60*60*1000*expirehours));
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + today.toGMTString() + ";";
	if (domain) {
		document.cookie += "domain=" + domain + ";";
	}
}

function popup(url,width,height,left,top,pname) {	
	window.open(url,pname, "menubar=no,toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes,width=" + width + ",height=" + height + ",left="+left+",top="+top+"").focus();;
}

function popup_full(url,width,height,left,top,pname) {	
	window.open(url,pname, "menubar=no,toolbar=no,location=no,directories=no,status=no,scrollbars=yes,fullscreen=yes, resizable=yes,width=" +  screen.availWidth + ",height=" + screen.availHeight + ",left=0,top=0").focus();;
}

function popup_close_layer(id) {
    set_cookie("popup_" + id, 1, 24, window.location.host);
    jQuery("#popup_"+id).css("display", "none");
}

function popup_close_layer_normal(id) {   
    jQuery("#popup_"+id).css("display", "none");
}



function fnNumber(str){
var str=String(str);
	str=str.split(/\./)[0];
	str=stripComma(str);

	if (str=='' || str==Infinity || isNaN(str) ) {
		return false;
	}else{
		return Number(str);  //parseInt  parseFloat Number(str)
	}
};

function addComma(str){
	var str=String(str);
	var thisValue=str.replace(/[^0-9\-]/g,"");
	var thisSimbol="";
		if (thisValue.charAt(0)=="-") thisSimbol="-";
		thisValue=thisValue.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return thisSimbol+thisValue;

	//return str.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");

}

function stripComma(str){
	var str=String(str);
	var thisValue=str.replace(/[^0-9\-]/g,"");
		return thisValue;
//	return str.replace(/^\s*|\s*$/g, '').replace(/[^\.\-\d]+/g, '');
}
