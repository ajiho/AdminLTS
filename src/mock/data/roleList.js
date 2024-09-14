const roleData = [
  {
    name: "经理",
    create_at: "@datetime",
  },
  {
    name: "组长",
    create_at: "@datetime",
  },
  {
    name: "研发组长",
    create_at: "@datetime",
  },
  {
    name: "客服",
    create_at: "@datetime",
  },
  {
    name: "文章审核员",
    create_at: "@datetime",
  },
  {
    name: "销售",
    create_at: "@datetime",
  },
]

const roleList = roleData.map((role, index) => {
  return { id: index + 1, ...role }
})

export default roleList
