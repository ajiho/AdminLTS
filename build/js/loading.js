import $ from 'jquery'
import _template from 'lodash-es/template'

//模板
const LOADINGTPL = `<div class="bsa-loading">
    <div class="spinner-<%= config.type %> text-<%= config.color %> 
    <% if (config.type == 'border' && config.size == 'sm')  { %> spinner-border-sm <% } %>
    <% if (config.type == 'grow' && config.size == 'sm')  { %> spinner-grow-sm <% } %>
    " role="status" <% if ( typeof config.size == 'string' &&  config.size != 'sm')  { %> style="<%= config.size %>" <% } %>>
        <span class="visually-hidden">Loading...</span>
    </div>
</div>`;


class Loading {

    static show() {

        //根据传入的选项来控制模板
        let tpl = _template(LOADINGTPL)({
            config: $.loading._config
        })

        if ($('.bsa-loading').length === 0) {
            $(tpl).prependTo('body');
        }
    }


    static hide() {

        if (typeof $.loading._config === 'undefined') {
            return;
        }

        $('.bsa-loading').remove();
    }

}


$.loading = {

    //默认参数
    default: {
        //颜色
        color: 'primary',
        //类型 grow:实心圈  border:空心圈
        type: 'border',
        //尺寸 要根据类型来判断  spinner-grow-sm spinner-border-sm  或者行内样式来控制：style="width: 3rem; height: 3rem;"
        size: null
    },

    show: function (params) {

        //参数合并
        this._config = $.extend({}, this.default, params);

        Loading.show(this._config);
    },

    hide: function () {
        Loading.hide();
    }
}


export default Loading