import $ from 'jquery'
const DATA_KEY = 'bsa.layout'



class Progress {
  constructor(element, options) {
    this.element = element;
    this.options = options;
  }
  myMethod() {
    console.log('myMethod called');
  }
}

$.fn.Progress = function(options) {
  const args = Array.prototype.slice.call(arguments, 1);

  return this.each(function() {
    let instance = $.data(this, DATA_KEY);

    if (!instance) {
      const newInstance = new Progress(this, options);
      $.data(this, DATA_KEY, newInstance);
      instance = newInstance;
    }

    if (typeof options === 'string') {
      instance[options].apply(instance, args);
    }
  });
};

$.extend($.fn.Progress, Progress.prototype);

export default Progress
