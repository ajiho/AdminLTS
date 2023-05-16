import $ from 'jquery'


export default {
    //判断是否为主页面
    isIndex() {
        return ($('.bsa-header').length !== 0 && $('.bsa-sidebar').length !== 0)
    },


    canAccessIFrame(iframe) {
        let html = null;
        try {
            // 浏览器兼容
            let doc = iframe.contentDocument || iframe.contentWindow.document;
            html = doc.body.innerHTML;
        } catch (err) {
            // do nothing
        }
        return (html !== null);
    },

    isObject(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    },

    /**
     * 通过key更新obj中的指定数据
     * @param obj 更新值的对象
     * @param objKey 拼接后的key数据，string ‘.’符号拼接
     * @param newValue 更新的值
     * @returns {*} 返回更新后的数据
     */
    updateObjDataByKey(obj, objKey, newValue) {
        const keyList = objKey.split('.');
        const lastKey = keyList[keyList.length - 1];
        keyList.reduce((pre, item) => {
            if (item === lastKey) pre[item] = newValue;
            return pre[item];
        }, obj);
        return obj;
    },
    //html反转义
    htmlspecialchars_decode(text) {
        let temp = document.createElement('div');
        temp.innerHTML = text;
        let output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    },

    // HTML转义
    htmlspecialchars(html) {
        let temp = document.createElement('div');
        (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
        let output = temp.innerHTML;
        temp = null;
        return output;
    },
}