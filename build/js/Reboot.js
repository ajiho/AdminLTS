
//bootstrap气泡组件初始化
[].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
});
//bootstrap提示组件初始化
[].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});

//优化:使无效表单禁止提交
document.querySelectorAll('form:not([action]),form[action="#"]').forEach(function (form) {
    form.addEventListener('submit', event => {
        event.preventDefault();
    });
});

//优化:禁止所有的input记忆输入内容
document.querySelectorAll('input').forEach((e) => {
    e.setAttribute("AutoComplete", "off");
});