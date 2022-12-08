document.onclick = function (event) {
    var target = event.target;
    if (target.classList.contains('runnable')) {

        //获取status属性
        var status = target.dataset.status;

        if (status === undefined) {

            var file = target.dataset.file;

            var iframeDomTxt = `<iframe  style="height:80vh;width: 100%;margin: 1rem 0 0;box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)"  src="example/${file}"></iframe>`;

            target.insertAdjacentHTML("afterend", iframeDomTxt);

            //设置已经加载
            target.dataset.status = '1';
            //修改文本
            target.innerHTML = `⇱运行示例`;

        } else if (status === '1') {//点击隐藏

            target.nextElementSibling.style.display = 'none';
            //设置已经加载
            target.dataset.status = '0';
            //修改文本
            target.innerHTML = `⇲运行示例`;

        } else {
            target.nextElementSibling.style.display = '';
            //设置已经加载
            target.dataset.status = '1';
            //修改文本
            target.innerHTML = `⇱运行示例`;

        }


    }


}



