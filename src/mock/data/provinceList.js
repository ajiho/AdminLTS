// 定义数组
const province = [
  { name: '北京市' },
  { name: '天津市' },
  { name: '河北省' },
  { name: '山西省' },
  { name: '内蒙古自治区' },
  { name: '辽宁省' },
  { name: '吉林省' },
  { name: '黑龙江省' },
  { name: '上海市' },
  { name: '江苏省' },
  { name: '浙江省' },
  { name: '安徽省' },
  { name: '福建省' },
  { name: '江西省' },
  { name: '山东省' },
  { name: '河南省' },
  { name: '湖北省' },
  { name: '湖南省' },
  { name: '广东省' },
  { name: '广西壮族自治区' },
  { name: '海南省' },
  { name: '重庆市' },
  { name: '四川省' },
  { name: '贵州省' },
  { name: '云南省' },
  { name: '西藏自治区' },
  { name: '陕西省' },
  { name: '甘肃省' },
  { name: '青海省' },
  { name: '宁夏回族自治区' },
  { name: '新疆维吾尔自治区' },
  { name: '台湾省' },
  { name: '香港特别行政区' },
  { name: '澳门特别行政区' },
  { name: '南海诸岛' },
]

// 遍历数组，为每个对象添加 value 字段并赋值为随机数
province.forEach(function (item) {
  item.value = Math.floor(Math.random() * 10000) + 1 // 生成1到10000之间的随机数
})

// 按照 value 字段从高到低排序
province.sort(function (a, b) {
  return b.value - a.value
})

export default province
