export default {
  template(tpl = {}, count = 1) {
    const retData = {
      msg: "success",
      code: 200,
    }

    if (typeof tpl === "function") {
      retData["data"] = tpl()
    } else {
      retData[`data|${count}`] = [tpl]
    }

    return retData
  },
  convertToFlatNodes(
    nodeList,
    id = 1,
    parentId = 0,
    result = [],
    childrenKey = "children",
  ) {
    nodeList.forEach((node) => {
      const newNode = {
        id,
        pid: parentId,
        ...node,
      }
      result.push(newNode)
      if (node[childrenKey] && node[childrenKey].length > 0) {
        id = this.convertToFlatNodes(
          node[childrenKey],
          id + 1,
          newNode.id,
          result,
          childrenKey,
        )
      }
      id++
    })
    return id
  },
}
