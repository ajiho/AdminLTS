;(function () {


    // 给每一个组件div都增加一个查看源码的按钮
    const bsaComponents = document.querySelectorAll('.bsa-component');
    for (const element of bsaComponents) {
        const button = `<button class="bsa-source-button btn btn-success btn-xs"><i class="bi bi-code"></i></button>`;
        element.insertAdjacentHTML('beforeend', button);
    }


    //复制代码按钮点击事件
    eventDelegate(document.body, 'click', '#bsa-source-modal .bsa-btn-copy', function (event) {
        event.preventDefault();
        if (navigator.clipboard) {
            const code = document.querySelector('#bsa-source-modal').querySelector('.modal-body pre').innerText;
            navigator.clipboard.writeText(code).then(r => {
            });
        }
        bootstrap.Modal.getOrCreateInstance(document.querySelector('#bsa-source-modal')).hide();
    });


    //查看源码按钮点击事件
    eventDelegate(document.body, 'click', '.bsa-source-button', function (event) {
        event.preventDefault();
        event.stopPropagation();
        //1.往body中插入展示代码的模态框，先判断是否存在这个模态框
        const sourceModalHtml = `
            <div id="bsa-source-modal" class="modal fade" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered  modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">源代码</h4>
                            <div class="d-flex align-items-center flex-nowrap gap-2">
                                <button type="button" class="btn btn-success bsa-btn-copy"><i class="bi bi-clipboard me-1"></i>复制</button>
                            </div>
                        </div>
                        <div class="modal-body">
                            <pre class="language-html"><code></code></pre>
                        </div>
                    </div>
                </div>
            </div>
            `;
        let bsaSourceModal = document.querySelector('#bsa-source-modal');
        if (!bsaSourceModal) {
            document.body.insertAdjacentHTML('beforeend', sourceModalHtml);
        }
        //2.获取html
        let html = this.parentNode.innerHTML;
        //3.处理html内容
        html = Prism.highlight(cleanSource(html), Prism.languages.html, 'html');
        //4.赋值给code标签
        document.querySelector('#bsa-source-modal').querySelector('code').innerHTML = html;
        //5.实例化bootstrap模态框并显示
        bootstrap.Modal.getOrCreateInstance(document.querySelector('#bsa-source-modal')).show();

    });


    function escapeHtml(html) {
        return html.replace(/×/g, '&times;')
            .replace(/«/g, '&laquo;')
            .replace(/»/g, '&raquo;')
            .replace(/←/g, '&larr;')
            .replace(/→/g, '&rarr;');
    }
    function cleanSource(html) {
        //转义HTML,将行拆分为数组,删除空元素,并移除最后一个元素
        let lines = escapeHtml(html).split('\n').filter(Boolean).slice(0, -1);
        const indentSize = lines[0].length - lines[0].trim().length;
        const re = new RegExp(' {' + indentSize + '}');

        lines = lines.map(line => {
            return re.test(line) ? line.slice(Math.max(0, indentSize)) : line;
        });

        return lines.join('\n');
    }

})();



