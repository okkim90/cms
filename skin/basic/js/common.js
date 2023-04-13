
$(function(){
	

    //left영역 2뎁스 리스트 토글 jquery 버전 업시 on 으로 변경하시오 1.9에서 live 는 삭제 되었음.
    $(".list_tit").live("click", function() {

        // $(this).siblings(".lnb_depth2").toggle();
        // $(this).toggleClass("on");

		$(this).siblings(".lnb_depth2").toggle();
		$(this).toggleClass("on");
		var toggle_id=$(this).attr('id');


		if($(this).hasClass('on')){
			$.cookie('toggle_menu_'+toggle_id+'' , '1',{ expires : 7, path : '/' });
		}else{
			$.cookie('toggle_menu_'+toggle_id+'' , '0',{ expires : 7, path : '/' });
		}
    });

    //전체메뉴 토글
	/*
    $("#btn_closeAllmenu, #btn_allMenu").click(function(){
        if($(this).hasClass("on")){
            $("#btn_allMenu").removeClass("on");
            $("#allMenu").toggle();
        }else{
            $("#btn_allMenu").addClass("on");
            $("#allMenu").toggle();
        }
    });
	*/

    //실시간 알림 토글
    $("#btn_closeToday, #btn_realTime").click(function(){
        if($(this).hasClass("on")){
            $("#btn_realTime").removeClass("on");
            $(".realTime").toggle();
        }else{
            $("#btn_realTime").addClass("on");
            $(".realTime").toggle();
        }
    });

    //작업페이지 탭 닫기
    $(".btn_tabClose").click(function(){
        $(this).parent("li").hide();
    });




    
    $.mCustomScrollbar.defaults.theme="light-2"; //set "light-2" as the default theme


    $("#allMenu_scroll").mCustomScrollbar({
        axis:"x",
        advanced:{autoExpandHorizontalScroll:true}
    });
	
	
	$('th').click(function(){
    var table = $(this).parents('table').eq(0)
    var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
    this.asc = !this.asc
    if (!this.asc){rows = rows.reverse()}
    for (var i = 0; i < rows.length; i++){table.append(rows[i])}
	});

});

//atm_th 클릭시 정렬
//function comparer(index) {
//    return function(a, b) {
//        var valA = getCellValue(a, index), valB = getCellValue(b, index)
//        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
//    }
//}
//function getCellValue(row, index){ return $(row).children('td').eq(index).text() }
//--------------------------------------

// 우편번호 찾기
function closeDaumPostcode() {
	var element_layer = document.getElementById('zip_layer');
	element_layer.style.display = 'none';
}
function Postcode(zip,addr1,addr2) {
	var element_layer = document.getElementById('zip_layer');
	new daum.Postcode({
	oncomplete: function(data) {
		var fullAddr = data.address; // 최종 주소 변수
		var extraAddr = ''; // 조합형 주소 변수
		// 기본 주소가 도로명 타입일때 조합한다.
		if(data.addressType === 'R'){
			//법정동명이 있을 경우 추가한다.
			if(data.bname !== ''){
			extraAddr += data.bname;
			}
			// 건물명이 있을 경우 추가한다.
			if(data.buildingName !== ''){
			extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
			}
			// 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
			fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
		}
		if (data.userLanguageType=="E")
		{
			// 우편번호와 주소 및 영문주소 정보를 해당 필드에 넣는다.
			if(data.userSelectedType=="R"){
				$("input[name='"+zip+"']").val(data.zonecode);
				$("input[name='"+addr1+"']").val(data.addressEnglish);
			}else{
				$("input[name='"+zip+"']").val(data.postcode1+'-'+data.postcode2);
				$("input[name='"+addr1+"']").val(data.jibunAddressEnglish);
			}

			$("input[name='"+addr1+"']").val(data.addressEnglish);
			$("input[name='"+addr2+"']").focus();
		}else{
			// 우편번호와 주소 및 영문주소 정보를 해당 필드에 넣는다.
			if(data.userSelectedType=="R"){
				$("input[name='"+zip+"']").val(data.zonecode);
				$("input[name='"+addr1+"']").val(data.address);
			}else{
				$("input[name='"+zip+"']").val(data.postcode1+'-'+data.postcode2);
				$("input[name='"+addr1+"']").val(data.jibunAddress);
			}

			$("input[name='"+addr1+"']").val(data.address);
			$("input[name='"+addr2+"']").focus();
		}
		
		// iframe을 넣은 element를 안보이게 한다.
		element_layer.style.display = 'none';
	},
	width : '100%',
	height : '100%'
	}).embed(element_layer);
	element_layer.style.display = 'block';
}



function Postcode2(addr1) {
	var element_layer = document.getElementById('zip_layer');
	new daum.Postcode({
	oncomplete: function(data) {
		var fullAddr = data.address; // 최종 주소 변수
		var extraAddr = ''; // 조합형 주소 변수
		// 기본 주소가 도로명 타입일때 조합한다.
		if(data.addressType === 'R'){
			//법정동명이 있을 경우 추가한다.
			if(data.bname !== ''){
			extraAddr += data.bname;
			}
			// 건물명이 있을 경우 추가한다.
			if(data.buildingName !== ''){
				extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
			}
			// 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
			fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
		}
		if (data.userLanguageType=="E")
		{
			// 우편번호와 주소 및 영문주소 정보를 해당 필드에 넣는다.
			if(data.userSelectedType=="R"){
				//$("input[name='"+zip+"']").val(data.zonecode);
				$("input[name='"+addr1+"']").val(data.addressEnglish);
			}else{
				//$("input[name='"+zip+"']").val(data.postcode1+'-'+data.postcode2);
				$("input[name='"+addr1+"']").val(data.jibunAddressEnglish);
			}

			$("input[name='"+addr1+"']").val(data.addressEnglish);
			//$("input[name='"+addr2+"']").focus();
		}else{
			// 우편번호와 주소 및 영문주소 정보를 해당 필드에 넣는다.
			if(data.userSelectedType=="R"){
				//$("input[name='"+zip+"']").val(data.zonecode);
				$("input[name='"+addr1+"']").val(data.address);
			}else{
				//$("input[name='"+zip+"']").val(data.postcode1+'-'+data.postcode2);
				$("input[name='"+addr1+"']").val(data.jibunAddress);
			}

			$("input[name='"+addr1+"']").val(data.address);
			//$("input[name='"+addr2+"']").focus();
		}

		
		// iframe을 넣은 element를 안보이게 한다.
		element_layer.style.display = 'none';
	},
	width : '100%',
	height : '100%'
	}).embed(element_layer);
	element_layer.style.display = 'block';
}

function CenterElementPosition(){
/*  $('.center_loading').CSS ({
        position: 'absolute',
        left: ($(window).width() - $('.centreElementWithJQuery').outerWidth()) / 2,
        top: ($(window).height() - $('.centreElementWithJQuery').outerHeight()) / 2
      });
	  */
}


function captureReturnKey(e) {
	if(e.keyCode==13 && e.srcElement.type != 'textarea')
		return false;
}

// 날짜 범위
 function date_limitless(m,obj_name){

	var dt = new Date();
	var yy = dt.getFullYear();
	var mm = dt.getMonth()+m;
	var dd = dt.getDate();

	var dt = new Date(yy, mm, dd);
	var month = dt.getMonth()+1;
	var day = dt.getDate();
	var year = dt.getFullYear();

	if( month <= 9 ){
	   month = '0'+month;
	}
	if( day <= 9 ){
	   day = '0'+day;
	 }
	 var date=year + '-' + month + '-' + day;
	 $("input[name='"+obj_name+"']").val(date);
 }

 // 레이어 서치폼 플러그인 정민우 작업 2018-04-11
 ;
(function($) {

    var search_layer = function(obj, opts) {
        var $this = this, o={};

		var data={};

		defaults = {
            search_tbl: 'member',
			popup_id:'customer_layer',
			multiple:true,	// 다중 선택
			freeload:false,	// 팝업창 로드시 전체 자료를 보여주느냐 마느냐
			where:''
        };

        $.extend(this, $.fn, {
            init : function () {
               o = $.extend(defaults, opts);

			   $('.multiple_selected').css('display','');
			   if(o.multiple==false){
					$('.multiple_selected').css('display','none');
			   }
               obj.on('click', $this.showpopup);

            }, keywordenter : function (e) { // bind input text
				if (event.keyCode == 13) {
					 $this.searched();
				}
			},
			 showpopup : function (e) {
				$('#'+o.popup_id).css('display','');

				$(".layer_search_keyword").val('');
				$(".layer_search_keyword").focus();

				$(".layer_search_btn").off('click');
				$(".layer_search_btn").on('click', $this.searched);

 			    $(".layer_search_keyword").off('keyup');
			    $(".layer_search_keyword").on('keyup', $this.keywordenter);

				$("input[name='selected_layer[]']:checkbox").prop("checked",false);

				if(o.freeload)
					$this.searched();
				//alert(o.search_tbl);
			    //$this.triggerChange();
            },
			searched : function (e) {
				var find_word=$(".layer_search_keyword").val();
				var postData={"mode":"layer_find_word", "find_word":find_word, "where":o.where};

				if(o.search_tbl=="member"){ // 내부 직원 검색
					var url="../admin/ajax_common.php";
					$.post(url, postData, function(data){
						$this.data={};
						$this.data=eval("("+data+")");
						$(".result_layer").html('');
						if($this.data.length==0){
							$(".result_layer").append('<li style="text-align:center;"><div style=\"margin-top:100px;line-height:20px;\"><b>&quot;'+find_word+'&quot;</b><br>로 검색된 자료가 없습니다.</div></li>');
						}else{
							$.each($this.data, function(i, item) {
								var addCheck="";
								if(o.multiple==true){	// 다중 선택이냐
									addCheck="<input  type='checkbox' name='selected_layer[]' style='margin-top:2px;' id='layer_item_"+i+"' value='"+i+"'>&nbsp;";
								}

								var outHtml  ="<li data="+i+" class='layer_search_li' >";
								    outHtml +=addCheck;
								    outHtml +="<label style='cursor:pointer;' for='layer_item_"+i+"'>";
									outHtml +="<img src='/skin/basic/images/ico_member.png' alt=''>&nbsp;";
									outHtml +="<span style='display:inline-block;width:80px;'>"+item.m_name+"</span>";
									outHtml +="<span style='display:inline-block;width:100px;'>"+item.m_id+"</span>";
									outHtml +="<span style='display:inline-block;'>"+item.m_mobile+"</span>";
								    outHtml +="</label>"
								    outHtml +="</li>"

								$(".result_layer").append(outHtml);

							});
						} // end len


						$(".multiple_selected").off('click');
						$(".result_layer > li").off('click');

						if(o.multiple==true){
							$(".multiple_selected").on('click', $this.multiple_selected);
						}else{
							$(".result_layer > li").on('click', $this.selected);
						}
					});	 // end post
				}// end member

				if(o.search_tbl=="customer"){ // 거래처 검색
					var url="../customer/ajax_common.php";
					$.post(url, postData, function(data){
						$this.data={};
						$this.data=eval("("+data+")");
						$(".result_layer").html('');
						if($this.data.length==0){
							$(".result_layer").append('<li style="text-align:center;"><div style=\"margin-top:100px;line-height:20px;\"><b>&quot;'+find_word+'&quot;</b><br>로 검색된 자료가 없습니다.</div></li>');
						}else{
							$.each($this.data, function(i, item) {
								var addCheck="";
								if(o.multiple){	// 다중 선택이냐
									addCheck="<input  type='checkbox' name='selected_layer[]' style='margin-top:2px;' id='layer_item_"+i+"' value='"+i+"'>&nbsp;";
								}

								var outHtml  ="<li data="+i+" class='layer_search_li' >";
								    outHtml +=addCheck;
								    outHtml +="<label style='cursor:pointer;' for='layer_item_"+i+"'>";
									outHtml +="<img src='/skin/basic/images/ico_home.png' alt=''>&nbsp;";
									outHtml +="<span style='display:inline-block;width:150px;'>"+item.customer_name+"</span>";
									outHtml +="<span style='display:inline-block;width:80px;'>"+item.customer_group_name+"</span>";
									outHtml +="<span style='display:inline-block;'>"+item.customer_tel+"</span>";
								    outHtml +="</label>"
								    outHtml +="</li>"

								$(".result_layer").append(outHtml);
							});
						} // end len

						//$(".multiple_selected").off($this.multiple_selected);
						//$(".result_layer > li").off($this.selected);
						$(".multiple_selected").off('click');
						$(".result_layer > li").off('click');

						if(o.multiple){
							$(".multiple_selected").on('click', $this.multiple_selected);
						}else{
							$(".result_layer > li").on('click', $this.selected);
						}
					});	 // end post
				}// end member
			},
			selected : function (e) {
				var $seq=$(this).attr('data');
				if($seq>=0){
					var selected_data={};
					selected_data[0]=$this.data[$seq];
					$this.triggerChange(selected_data);
				}else{
					return false;
				}
			},
			multiple_selected : function (e) {
				var selected_data={};
				var searchIDs = $("input[name='selected_layer[]']:checkbox:checked").map(function(i){
					var $seq=$(this).val();
					selected_data[i]=$this.data[$seq];
					return $(this).val();
				}).toArray();
				$this.triggerChange(selected_data);
			},
            triggerChange : function (data) {
				obj.trigger('oncomplete', [data]);
				$('#'+o.popup_id).css('display','none');
                // obj.trigger('oncomplete', [{msg: 'jmw'}]);
            }
        });
        this.init();
    };
    $.fn.search_layer = function(opts) {
        new search_layer(this, opts);
        return this;
    };
})(jQuery);

$(function(){
	// 실시간 전자결제 문서 도착 알림
	function check_alert_start() {
		$.post("/document/check_alert_document.php", {}, function(data) {
			var obj = jQuery.parseJSON(data);
			if (obj.un_cnt) { $("#document_unsettled_list").html( obj.un_cnt ); }
		});

		setTimeout(check_alert_start, 15000); // 10초 후 재귀호출
	}

	check_alert_start(); // 문서가 준비되면 start 함수실행

});