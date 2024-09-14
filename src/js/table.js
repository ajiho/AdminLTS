import $ from "jquery"
import Initialize from "./initializer"

const NAME = "Table"
const DATA_KEY = "lts.table"
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = $.fn[NAME]
const SELECTOR_DATA_TOGGLE = '[data-lts-toggle="table"]'

// 图标相关配置
const ICON = {
  // 图标前缀
  iconsPrefix: "bi",
  // 图标大小 undefined sm lg
  iconSize: undefined,
  // 图标的设置 详细参考:https://examples.bootstrap-table.com/#options/table-icons.html
  icons: {
    paginationSwitchDown: "bi bi-sort-down",
    paginationSwitchUp: "bi bi-sort-up",
    refresh: "bi-arrow-repeat",
    toggleOff: "bi-toggle2-off",
    toggleOn: "bi-toggle2-on",
    fullscreen: "bi-fullscreen",
    columns: "bi-card-checklist",
    detailOpen: "bi-plus",
    detailClose: "bi-dash",
  },
}

//工具栏相关配置
const TOOLBAR = {
  // 工具按钮容器
  toolbar: "#toolbar",
  // true:显示详细视图和列表视图的切换按钮
  showToggle: true,
  // true:显示可以弹出所有列名称的列表的下拉菜单的按钮
  showColumns: true,
  // true:显示刷新按钮
  showRefresh: true,
  // true:显示全屏按钮
  showFullscreen: true,
  // true:显示控制分页的开关的按钮
  showPaginationSwitch: true,
  // true:toolbar的按钮组则会显示图标
  showButtonIcons: true,
  // true:toolbar的按钮组则会显示文本,false:不显示按钮的文本信息，为了美观多半会把该选项设置为false
  showButtonText: false,
  // 按钮的类名前缀
  buttonsPrefix: "btn",
  // 按钮的类,和buttonsPrefix组合使用实际上就是设置按钮的class类名 <button class="btn btn-light" type="button"></button>
  buttonsClass: "light",
  // 给右上角的按钮区域增加一个自定义按钮
  buttons: function () {
    return {
      //这里只做一个示例
      collapseSearch: {
        text: "搜索区域折叠/显示",
        icon: "bi bi-search",
        event: function () {
          $(".lts-search-area").slideToggle()
        },
        attributes: {
          title: "折叠搜索区域",
        },
      },
    }
  },
}

//分页相关配置
const PAGINATION = {
  //是否开启分页
  pagination: true,
  //是客户端分页还是服务端分页  'client','server',由于演示没有后端提供服务，所以采用前端分页演示
  sidePagination: "client",
  // 初始化加载第一页，默认第一页
  pageNumber: 1,
  //默认显示几条
  pageSize: 5,
  //可供选择的每页的行数
  pageList: [5, 10, 25, 50, 100],
  //true:当在最后一页时,点击下一页跳转到第一页
  paginationLoop: true,
  // 展示首尾页的最小页数
  paginationPagesBySide: 2,
}

const Default = {
  //配置语言
  locale: "zh-CN",
  //设置高度就可以固定表头,不过不建议设置
  // height: 300,
  //固定列功能开启
  fixedColumns: true,
  //左侧固定列数
  fixedNumber: 1,
  //右侧固定列数
  fixedRightNumber: 1,
  // 是否启用点击选中行
  clickToSelect: true,
  //点击那些元素可以忽略勾选
  ignoreClickToSelectOn: function (element) {
    //意思就是遇到.more-btn和.form-check-input或者button、a标签的时候被点击的时候行不会被选中
    return !!$(element).closest(
      ".more-btn, .form-check-input,button,a,.treegrid-expander",
    ).length
  },
  // 总数字段
  totalField: "total",
  // 当字段为 undefined 显示
  undefinedText: "-",
  // 定义全局排序方式 只能是undefined, 'asc' or 'desc'
  sortOrder: "asc",
  //加载模板,不改的话，默认的会超出不好看
  loadingTemplate: function () {
    return '<div class="spinner-grow" role="status"><span class="visually-hidden">Loading...</span></div>'
  },
  //所有的事件都会触发的事件,用于初始化bootstrap的提示和气泡插件
  onAll: function (name, args) {
    const $body = $("body")

    $body.Initialize(
      "tooltipInit",
      {
        container: ".bootstrap-table",
      },
      true,
    )

    $body.Initialize(
      "popoverInit",
      {
        container: ".bootstrap-table",
      },
      true,
    )
  },
  ...PAGINATION,
  ...ICON,
  ...TOOLBAR,
}

class Table {
  #config
  #element
  #table

  constructor(element, config) {
    this.#config = config
    this.#element = element
  }

  #init() {
    //实例化bootstrapTable
    this.#table = this.#element.bootstrapTable(this.#config)
  }

  //快速刷新
  refreshSelectPage(page = 1) {
    this.#table.bootstrapTable("refresh")
    this.#table.bootstrapTable("selectPage", page)
  }

  // 快速搜索的方法
  search(btnSelector) {
    const that = this
    $(document).on("click", btnSelector, function (event) {
      event.preventDefault()
      that.refreshSelectPage()
    })
  }

  // 快速重置,如果情况不满足还可以通过回调函数进行自定义处理
  reset(btnSelector, formSelector, callback) {
    const that = this
    $(document).on("click", btnSelector, function (event) {
      event.preventDefault()

      //找到传递进来的form表单
      if (typeof formSelector === "string") {
        $(formSelector)[0].reset() //快速重置表单
      }
      typeof callback === "function" && callback.call(that, formSelector)

      //然后刷新
      that.refreshSelectPage()
    })
  }

  //批量删除
  batch(btnSelector, callback, conditionFn) {
    const that = this

    const $btn = $(btnSelector)
    that.#table.on("all.bs.table", function (name, args) {
      const selectedRows = that.#table.bootstrapTable("getSelections")
      let conditionResult
      // 如果传递了条件函数，则使用传递的条件函数进行判断
      if (typeof conditionFn === "function") {
        conditionResult = conditionFn.call(that, selectedRows)
      } else {
        // 默认条件：选中行数量大于 0
        conditionResult = selectedRows.length > 0
      }
      // 根据条件结果设置按钮状态
      $btn.attr("disabled", !conditionResult)
    })
    $(document).on("click", btnSelector, function () {
      //获取所有选中行的id
      const ids = []
      const rowSelected = that.#table.bootstrapTable("getSelections")
      $.each(rowSelected, function (index, row) {
        ids.push(row.id)
      })
      callback.call(this, ids, rowSelected)
    })
  }

  /**
   * 让按钮具备bootstrap-table的treegrid拓展的全部展开和折叠能力
   * @param {String} btnSelector
   */
  treegridExtSlideToggleByButton(btnSelector) {
    const that = this
    $(document).on("click", btnSelector, function (event) {
      event.preventDefault()
      if (that.#table.find("tr").hasClass("treegrid-expanded")) {
        //只要有一个tr是被展开的就折叠
        that.#table.treegrid("collapseAll")
      } else {
        that.#table.treegrid("expandAll")
      }
    })
  }

  treegridExtSlideToggleClickRow(exceptSelector = "button") {
    //给整行绑定事件委托

    this.#element.on("click", "tbody tr", function (event) {
      const $target = $(event.target)

      if (!$target.closest(exceptSelector).length) {
        if (!$target.is(".treegrid-expander")) {
          if ($(this).treegrid("isExpanded")) {
            $(this).treegrid("collapse")
          } else {
            $(this).treegrid("expand")
          }
        }
      }
    })
  }

  treegridExtInit() {
    const that = this

    that.#table.on("post-body.bs.table", function (event, data) {
      const options = that.#table.bootstrapTable("getOptions")
      const columns = options.columns
      const columnsFirst = columns[0]

      if (columns && columnsFirst) {
        const treeColumn = columnsFirst.findIndex(
          (obj) => obj.field === options.treeShowField,
        )
        if (treeColumn !== -1 && columnsFirst[treeColumn].visible) {
          that.#table.treegrid({
            treeColumn: treeColumn,
            onChange: function () {
              that.#table.bootstrapTable("resetView")
            },
            saveState: true,
          })
        }
      }
    })
  }

  #getParents(
    data,
    row,
    result = [],
    rowsIndex = [],
    idField = "id",
    pidField = "pid",
  ) {
    data.forEach((item, index) => {
      if (item[idField] === row[pidField]) {
        result.push(item)
        rowsIndex.push(index)
        this.#getParents(data, item, result, rowsIndex, idField, pidField)
      }
    })
  }

  #getChildren(
    data,
    row,
    result = [],
    rowsIndex = [],
    idField = "id",
    pidField = "pid",
  ) {
    data.forEach((item, index) => {
      if (item[pidField] === row[idField]) {
        result.push(item)
        rowsIndex.push(index)
        this.#getChildren(data, item, result, rowsIndex, idField, pidField)
      }
    })
  }

  #toggleParentOnLastChildUncheck(data, row, idField = "id", pidField = "pid") {
    //找到父级的数据
    const parentIndex = data.findIndex((obj) => obj.id === row.pid)
    const parentRow = data[parentIndex]
    if (parentIndex !== -1) {
      //找到所有子集
      const sonData = []
      this.#getChildren(data, parentRow, sonData, [], idField, pidField)

      //获取所有的被勾选的row
      const sonCheckedData = sonData.filter((item) => item[0] === true)
      if (sonCheckedData.length === 0) {
        this.#table.bootstrapTable("uncheck", parentIndex)

        //递归调用
        this.#toggleParentOnLastChildUncheck(data, parentRow, idField, pidField)
      }
    }
  }

  //勾选节点关联
  toggleCheckRelation(idField = "id", pidField = "pid") {
    const that = this
    that.#table.on("change", ".bs-checkbox input", function () {
      const $input = $(this)
      const rowIndex = $input.attr("data-index")

      if (rowIndex !== undefined) {
        const data = that.#table.bootstrapTable("getData")
        const row = data[rowIndex]

        if ($input.is(":checked")) {
          const parentsIndex = []
          const childrenIndex = []
          that.#getParents(data, row, [], parentsIndex, idField, pidField)
          that.#getChildren(data, row, [], childrenIndex, idField, pidField)
          //所有的行索引
          const rowsIndex = [...parentsIndex, ...childrenIndex]
          rowsIndex.forEach((index) => {
            that.#table.bootstrapTable("check", index)
          })
        } else {
          //1.把所有的子节点都取消掉
          const childrenIndex = []
          that.#getChildren(data, row, [], childrenIndex, idField, pidField)
          childrenIndex.forEach((index) => {
            that.#table.bootstrapTable("uncheck", index)
          })

          //2.取消选中最后一个子元素时查找对应父元素取消
          that.#toggleParentOnLastChildUncheck(data, row, idField, pidField)
        }
      }
    })
  }

  // Static
  static jQueryInterface(config, ...args) {
    let value

    this.each(function () {
      let data = $(this).data(DATA_KEY)

      if (typeof config === "string") {
        if (!data) {
          return
        }

        if (typeof data[config] !== "undefined") {
          value = data[config](...args)
        } else if (data.#table.bootstrapTable.methods.includes(config)) {
          value = data.#table.bootstrapTable(config, ...args)
        } else {
          throw new TypeError(`No method named "${config}"`)
        }
        return
      }

      if (data) {
        console.warn("You cannot initialize the table more than once!")
        return
      }

      data = new Table(
        $(this),
        $.extend(
          {},
          Default,
          typeof config === "object" ? config : $(this).data(),
        ),
      )
      $(this).data(DATA_KEY, data)
      data.#init()
    })

    return typeof value === "undefined" ? this : value
  }
}

/**
 * Data API
 * ====================================================
 */

$(() => {
  $(SELECTOR_DATA_TOGGLE).each(function () {
    Table.jQueryInterface.call($(this))
  })
})

/**
 * jQuery API
 * ====================================================
 */

$.fn[NAME] = Table.jQueryInterface
$.fn[NAME].Constructor = Table
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Table.jQueryInterface
}

export default Table
