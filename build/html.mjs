/**
 * 使用twig模板引擎的js实现版本https://github.com/twigjs/twig.js来对静态html进行处理
 * 真正的语法文档可以参考https://twig.symfony.com/
 * 因为twig是一个php的模板引擎，因此对于该开源项目最好使用phpstorm来开发可以获取最佳开发体验
 */
import Twig from 'twig';
import fs from "fs-extra";
import {glob} from "glob";


const input = "src/pages/*.twig";
const output = "dist";

const files = await glob(input)


files.forEach((filePath) => {

  //index.twig
  const filename = filePath.substring(filePath.lastIndexOf('\\') + 1);
  //index
  const notExt = filename.split('.')[0];

  Twig.renderFile(filePath, [], (err, html) => {
    //写入文件
    fs.outputFile(`${output}/${notExt}.html`, html, 'utf8');
  });
});



