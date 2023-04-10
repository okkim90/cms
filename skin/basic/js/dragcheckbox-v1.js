//jquery 플러그인이 include 되어야만 작동함

$.fn.dragCheckbox = function () {
    var source = this;
    var ConditionA = false;
    var ConditionB = false;

    source.mousedown(function(){
        ConditionA = true;
        ConditionB = true;
    });
    $(document).mouseup(function(){
        ConditionA = false;
        ConditionB = false;
    })
    source.mouseenter(function(){
        if(ConditionA != false) {
            $(this).trigger('click');
        }
    });
    source.mouseout(function(){
        if(ConditionA != false && ConditionB != false) {
            $(this).trigger('click');
            ConditionB = false;
        }
    });
}