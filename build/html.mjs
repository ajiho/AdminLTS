/**
 * 使用twig模板引擎的js实现版本https://github.com/twigjs/twig.js来对静态html进行处理
 */
import Twig from 'twig';
import fs from "fs-extra";
import { glob } from "glob";

import data from "./data/index.mjs";

const input = "src/pages/*.twig";
const output = "dist";

const files = await glob(input)


files.forEach((filePath) => {

  //index.twig
  const filename = filePath.substring(filePath.lastIndexOf('\\') + 1);
  //index
  const notExt = filename.split('.')[0];

  Twig.renderFile(filePath, data, (err, html) => {
    //写入文件
    fs.outputFile(`${output}/${notExt}.html`, html, 'utf8');
  });
});



