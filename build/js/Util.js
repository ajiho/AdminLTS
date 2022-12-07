export default {
    //事件委托
    delegate(element, type, selector, fn, exceptSelector) {
        element.addEventListener(type, function (e) {
            let target = e.target;
            let currTarget = e.currentTarget;
            while (target !== currTarget && (target instanceof HTMLElement)) {
                if (target.matches(selector)) {
                    fn.call(target, e);
                    break;
                } else if (target.matches(exceptSelector)) {
                    break;
                }
                target = target.parentNode;
            }
        }, false);
    },


    /**
     * 原生js实现jq的siblings()方法
     * @param element
     * @param selector
     * @returns {*[]}
     */
    siblings(element, selector) {
        selector = selector || false;
        //先获取到当前传入的元素的所有父元素的子集
        let pChildren = element.parentNode.children;
        let eleMatch = [];
        //遍历把自己干掉
        for (let children of pChildren) {
            if (children instanceof HTMLElement) {
                if (selector) {//如果为真，说明传入选择器
                    if (children !== element && children.matches(selector)) {
                        eleMatch.push(children);
                    }
                } else {//没有传入
                    if (children !== element) {
                        eleMatch.push(children);
                    }
                }
            }
        }
        return eleMatch;
    },


    /**
     * 通过字符串创建节点
     * @param htmlStr
     * @returns {Element}
     */
    createNode(htmlStr) {
        let div = document.createElement("div");
        div.innerHTML = htmlStr;
        return div.children[0];
    },


    /**
     * 节流函数
     * @param func
     * @param wait
     * @returns {(function(...[*]): void)|*}
     */
    debounce(func, wait = 500) {
        let timeID;
        return function (...args) {
            if (timeID) clearTimeout(timeID);
            timeID = setTimeout(() => {
                func.apply(this, args);
            }, wait);
        }
    }

}