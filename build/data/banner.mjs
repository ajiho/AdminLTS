import pkg from "../../package.json" assert { type: "json" }
const year = new Date().getFullYear()

function getBanner() {
  return `/*!
 * ${pkg.name} v${pkg.version} (${pkg.homepage})
 * Copyright 2023-${year} ${pkg.author}
 * license ${pkg.license}
 */\n`
}

export default getBanner
