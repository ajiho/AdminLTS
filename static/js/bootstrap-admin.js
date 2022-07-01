const bsCollapse = new bootstrap.Collapse('#navbarSupportedContent', {
    toggle: false
});


var bsAdminSidebar = document.querySelector('.bs-admin-sidebar');
var bsAdminMain = document.querySelector('.bs-admin-main');

document.querySelector('.bs-admin-sidebar-toggle').addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (!bsAdminSidebar.classList.contains('bs-admin-sidebar-open')) {

        bsAdminSidebar.classList.add('bs-admin-sidebar-open')
    } else {

        bsAdminSidebar.classList.remove('bs-admin-sidebar-open')
    }

    let mask = document.querySelector('.lyear-mask-modal');
    if (!mask) {
        bsAdminMain.insertAdjacentHTML('beforeEnd', '<div class="lyear-mask-modal"></div>');
    } else {
        mask.remove();
    }

    bsCollapse.hide();


}, false);


document.querySelector('.bs-admin-navbar-toggler-toggle').addEventListener('click', function (event) {
    bsCollapse.toggle();

    if (bsAdminSidebar) {
        bsAdminSidebar.classList.remove('bs-admin-sidebar-open');
    }

    let mask = document.querySelector('.lyear-mask-modal');
    if (mask) {
        mask.remove();
    }


});


document.body.addEventListener('click', function (event) {
    let target = event.target;

    if (target.classList.contains('lyear-mask-modal')) {


        target.remove();


        if (!bsAdminSidebar.classList.contains('bs-admin-sidebar-open')) {

            bsAdminSidebar.classList.add('bs-admin-sidebar-open')
        } else {

            bsAdminSidebar.classList.remove('bs-admin-sidebar-open')
        }


    }

}, false);


/*document.querySelector('.bs-admin-sidebar-wrapper').addEventListener('click', function (event) {
    // event.preventDefault();
    // event.stopPropagation();

    // console.log(this)
    let target = event.target;

    console.log(target)
    // has-children

    if (target.nodeName.toLowerCase() === 'a' && target.classList.contains('has-children')) {



        //找到当前同级的ul

        let nextUlElement = target.nextElementSibling;


        let height = nextUlElement.scrollHeight.toString() + "px";


        // console.log(height);

        // nextUlElement.style.height = 'max-content';
        nextUlElement.style.height = height;

        // console.log(target.nextElementSibling);


    }

},false);*/


$('.bs-admin-sidebar-wrapper').on('click', 'a.has-children', function () {

    let $nextUlElement = $(this).next();
    $nextUlElement.stop().slideToggle(300);
    $(this).parent().siblings().find('a.has-children').next().slideUp(300);


});





