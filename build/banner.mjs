import { glob } from "glob";
import fs from "fs-extra";
import getBanner from "./data/banner.mjs";


// 使用 glob 模式匹配文件
const directoryPattern = process.argv[2];
const cssfiles = await glob(directoryPattern)

cssfiles.forEach((filePath) => {

    fs.readFile(filePath, 'utf8', (err, data) => {

        //写入文件
        fs.writeFile(filePath, `${getBanner()}${data}`, 'utf8');

    });

});
