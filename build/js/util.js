//下面都是dom的一些封装方法===========================================
function delegate(element, type, selector, fn, exceptSelector) {
    element.addEventListener(type, function (e) {
        var target = e.target;
        var ctarget = e.currentTarget;

        while (target !== ctarget && (target instanceof  HTMLElement)) {

            if (target.matches(selector)) {
                fn.call(target, e);
                break;
            } else if (target.matches(exceptSelector)) {
                break;
            }
            target = target.parentNode;
        }
    }, false);
}


// 判断是否有滚动条
function hasScrolled(element, direction) {
    if (direction === 'vertical') {
        return element.scrollHeight > element.clientHeight;
    } else if (direction === 'horizontal') {
        return element.scrollWidth > element.clientWidth;
    }
}


// Generate four random hex digits.
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

// Generate a pseudo-GUID by concatenating random hexadecimal.
function guid() {
    return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
}


//原生js实现Jq的outerWidth
function outerWidth(element) {
    if (arguments[1] === true) {//第二个参数，如果传入true则把外边距也给加上
        return element.offsetWidth + parseInt(getComputedStyle(element)['marginLeft']) + parseInt(getComputedStyle(element)['marginLeft']);
    } else {
        return element.offsetWidth;
    }
}


//原生js实现jq的prevAll
function prevAll(el) {

    var _parent = el.parentElement;
    var _child = _parent.children;

    var arr = [];
    for (var i = 0; i < _child.length; i++) {
        var _childI = _child[i];
        if (_childI === el) {
            break;
        }
        arr.push(_childI);
    }
    return arr;
}

//原生js实现jq的nextAll
function nextAll(el) {
    var _parent = el.parentElement;
    var _child = _parent.children;
    var arr = [];
    for (var i = _child.length - 1; i >= 0; i--) {
        var _childI = _child[i];
        if (_childI === el) {
            break;
        }
        arr.unshift(_childI);
    }
    return arr;
}


//原生js实现jq的children()方法
function children(element, selector) {
    var p2 = selector || false;
    // el.matches(selector)
    //处理兼容性问题,也可以判断
    //判断方式2：if(dom.nodeType==1 && dom.tagName){}
    // element.childNodes
    var matchEl = [];
    for (var item of element.childNodes) {
        if (item instanceof HTMLElement) {
            if (p2) {//如果为真，说明传入选择器
                if (item.matches(selector)) {
                    matchEl.push(item);
                }
            } else {
                matchEl.push(item);
            }
        }
    }
    return matchEl;
}


//原生js实现Jq的siblings()方法
function siblings(element, selector) {

    selector = selector || false;
    //先获取到当前传入的元素的所有父元素的子集
    var childrens = element.parentNode.children;


    var eleMatch = [];

    //遍历把自己干掉
    for (var children of childrens) {
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


}


//原生js实现Jq的find()方法
function find(element, selector) {
    return Array.from(element.querySelectorAll(selector));
}


//原生js实现Jq的not()方法
function not(elementArr, selector) {
    var eleMatch = [];
    elementArr.forEach((itemEl) => {
        if (!itemEl.matches(selector)) {
            eleMatch.push(itemEl);
        }
    });
    return eleMatch;
}