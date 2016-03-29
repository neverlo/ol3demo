/**
 * 系统管理员
 */
var ADMIN = function(areaCode){
    this.initSysParams();
    this.setParam('areaCode',areaCode)
}

ADMIN.prototype = {
    /**
     * 初始化系统参数
     */
    initSysParams: function(){
        var params = new Object({});
        params.areaCode = '';//系统当前编码
        this.params = params;
    },
    getParams: function(){
        return this.params;
    },
    /**
     * 获取系统参数值
     * @param type 参数Key
     * @returns {*}
     */
    getParam: function(type){
        return this.params[type];
    },
    /**
     * 改变系统参数
     * @param type 参数key
     * @param value 参数值
     */
    setParam: function(type,value){
        this.params[type] = value;
    },
    /**
     * 根据编码获取地区中文名称
     * @param code
     */
    getNameByCode: function(code){
        return areaAndName[code];
    },
    /**
     * 根据中文名称获取区域编码
     * @param name
     */
    getCodeByName: function(name){
        for(var key in areaAndName){
            if(areaAndName[key] === name){
                return key;
            }
        }
    },
    /**
     * 获取当前区域类型 pro city county
     * @returns {*}
     */
    getAreaType: function(){
        var code = this.getParam('areaCode');
        code = code.replace(/\00/g, '');
        var codeLength = code.length;
        if(codeLength==2){
            return 'pro';
        }else if(codeLength==4){
            return 'city';
        }else{
            return 'county';
        }
    }
}

//区域代码与中文互转
var areaAndName = {
    '440100' : '广州市'
};