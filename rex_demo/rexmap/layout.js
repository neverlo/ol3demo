/**
 * 系统布局控件
 */
var layout = function(){

}

layout.prototype = {
    /**
     * 初始化头部
     */
    initHeader: function(){
        var header = $('<div class="headerDiv"></div>');
        $(header).appendTo($('body'));
        this.header = header;
        return header;
    },
    initSysBar: function(adminObj){
        var title = $('<div class="sysBar">'+adminObj.getNameByCode(adminObj.getParam('areaCode'))+'</div>');
        $(title).appendTo($(this.header));
    }
}