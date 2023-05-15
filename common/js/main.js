// datepicker
$.datepicker.regional['ko'] = {
    closeText: '닫기',
    prevText: '이전달',
    nextText: '다음달',
    currentText: '오늘',
    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    dayNames: ['일','월','화','수','목','금','토'],
    dayNamesShort: ['일','월','화','수','목','금','토'],
    dayNamesMin: ['일','월','화','수','목','금','토'],
    weekHeader: 'Wk',
    dateFormat: 'yy-mm-dd',
    firstDay: 0,
    isRTL: false,
    showMonthAfterYear: true,
    changeMonth: true,
    changeYear: true
};
$.datepicker.setDefaults($.datepicker.regional['ko']);

$(".inp_date").datepicker({
    //showOn: "button",
    //buttonImage: "../img/ico_calendar1.svg",
    //buttonImageOnly: true,
    //showButtonPanel: true
});
    
function set_today(target){
    let date_set = $(target).parents('.date_set');
    let date_start = date_set.find('.date_start');
    let date_end = date_set.find('.date_end');
    date_end.datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
    date_start.datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
}
function set_7d(target){
    let date_set = $(target).parents('.date_set');
    let date_start = date_set.find('.date_start');
    let date_end = date_set.find('.date_end');
    date_end.datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
    date_start.datepicker('setDate', '-7D'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
}
function set_1m(target){
    let date_set = $(target).parents('.date_set');
    let date_start = date_set.find('.date_start');
    let date_end = date_set.find('.date_end');
    date_end.datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
    date_start.datepicker('setDate', '-1M'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
}
function set_3m(target){
    let date_set = $(target).parents('.date_set');
    let date_start = date_set.find('.date_start');
    let date_end = date_set.find('.date_end');
    date_end.datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
    date_start.datepicker('setDate', '-3M'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
}
function set_6m(target){
    let date_set = $(target).parents('.date_set');
    let date_start = date_set.find('.date_start');
    let date_end = date_set.find('.date_end');
    date_end.datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
    date_start.datepicker('setDate', '-6M'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
}
function set_1y(target){
    let date_set = $(target).parents('.date_set');
    let date_start = date_set.find('.date_start');
    let date_end = date_set.find('.date_end');
    date_end.datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
    date_start.datepicker('setDate', '-1Y'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
}





// layer popup
function open_popup(target){
    let layer_popup = document.querySelector(`.layer_popup.${target}`);
    //console.log(layer_popup);
    layer_popup.classList.add('on');
}
function close_popup(target){
    let layer_popup = target.closest('.layer_popup');
    let layer_popup_cont = target.closest('.layer_popup');
    layer_popup.classList.remove('on');
}
let layer_popup_cont = document.querySelectorAll('.layer_popup_cont');
layer_popup_cont.forEach(e=>{
    e.addEventListener('click',(e)=>{
        e.stopPropagation()
    })
});



function tab_btn(e){
    let index = $(e).parent().index();
    let tab_wrap = $(e).closest('.tab_wrap');
    let tab_cont_item =  tab_wrap.find('.tab_cont_item');
    let tab_btn_item = $(e).parent('.tab_list_item');
    //let tab_wrap = this.parents('.tab_wrap');
    //let tab_cont_item = tab_wrap.find('.tab_cont_item');
    tab_btn_item.addClass('on').siblings().removeClass('on');
    tab_cont_item.eq(index).addClass('on').siblings().removeClass('on');
}