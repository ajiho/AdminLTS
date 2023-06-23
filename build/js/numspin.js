import $ from 'jquery'
import {CountUp} from 'countup.js';

const SELECTOR_DATA_TOGGLE = '[data-bsa-toggle="numspin"]'
const NAME = 'Numspin'
const DATA_KEY = 'bsa.numspin'
const JQUERY_NO_CONFLICT = $.fn[NAME]


const Default = {
//小数点后面的位数
  decimalPlaces: 0,
  //持续时间
  duration: 1.5,
}


class Numspin {
  constructor(element, options) {
    this.element = element;
    this.options = options;
    this.numAnim = new CountUp(element, $(this.element).text(), options);
  }

  start() {
    if (!this.numAnim.error) {
      this.numAnim.start();
    } else {
      console.error(this.numAnim.error);
    }
  }

  static _jQueryInterface(options) {
    //将函数的参数包装成数组
    const args = Array.prototype.slice.call(arguments, 1);


    for (let element of this) {
      //读取一下实例对象
      let instance = $.data(element, DATA_KEY);

      if (!instance) {//如果没有就new

        //先读取一下属性进行合并
        let _options = $.extend({}, Default, typeof options === 'object' ? options : $(element).data());

        const newInstance = new Numspin(element, _options);
        $.data(element, DATA_KEY, newInstance);//再重新设置回去
        instance = newInstance;
      }

      if (typeof options === 'string') {//如果是字符串就当作是要调用类的方法

        if (typeof instance[options] === 'undefined') {//判断要调用的方法是否存在
          throw new TypeError(`方法 "${options}" 不存在`)
        }

        let res = instance[options].apply(instance, args);

        if (typeof res !== 'undefined') {
          return res;
        }
      }
    }
    return this;
  }
}


$(window).on('load', () => {
  $(SELECTOR_DATA_TOGGLE).each(function () {
    Numspin._jQueryInterface.call($(this), 'start');
  })
})


/**
 * jQuery API
 * ====================================================
 */

$.fn[NAME] = Numspin._jQueryInterface
$.fn[NAME].Constructor = Numspin
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Numspin._jQueryInterface
}

export default Numspin
