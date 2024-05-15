import { glob } from "glob";
import fs from "fs-extra";
import getBanner from "./banner.mjs";



const cssfiles = await glob('dist/css/*.css')

cssfiles.forEach((filePath) => {

    fs.readFile(filePath, 'utf8', (err, data) => {

        //写入文件
        fs.writeFile(filePath, `${getBanner()}${data}`, 'utf8');

    });

});
