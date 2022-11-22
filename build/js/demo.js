// 给每一个组件div都增加一个查看源码的按钮
document.querySelectorAll('.bsa-component').forEach(function (el) {
    el.insertAdjacentHTML('beforeend', `<button class="bsa-source-button btn btn-success btn-xs"><i class="bi bi-code"></i></button>`);
});