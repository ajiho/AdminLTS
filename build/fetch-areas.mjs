import fs from "fs-extra"

const url = "https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json"
const outputFile = "src/assets/areas.json"

try {
  // 检查文件是否存在
  const fileExists = await fs.pathExists(outputFile)

  if (fileExists) {
    console.log(`File already exists: ${outputFile}`)
  } else {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()

    fs.writeFile(outputFile, JSON.stringify(data), "utf8")

    console.log(`File saved successfully as ${outputFile}`)
  }
} catch (error) {
  console.error("Error fetching data:", error)
}
