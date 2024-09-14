import { createRequire } from "module";
import c from "picocolors";
import AdmZip from "adm-zip";
import cpy from "cpy";
import fs from "fs-extra";

// 获取当前 package.json 版本号
const { version: currentVersion } = createRequire(import.meta.url)(
  "../package.json",
);

const zip = new AdmZip();
const distDir = `adminlts-${currentVersion}-dist`;
const zipFile = `${distDir}.zip`;

// 用于在过程中输出提示信息
const step = (msg) => console.log(c.cyan(msg));

// 删除旧的 dist 目录和 zip 文件
step("清理旧的版本dist和zip文件...");
fs.removeSync(distDir);
fs.removeSync(zipFile);

// 复制 dist 目录到新的版本化目录
step(`复制dist到${distDir}目录中...`);
await cpy(
  [
    "dist/**", // 复制所有的文件
    "!dist/docs", // 除了docs目录
  ],
  distDir,
);

// 压缩新的版本化目录
step("开始压缩...");
zip.addLocalFolder(distDir);
zip.writeZip(zipFile);
step("压缩完毕");

// 删除临时的版本化目录
step(`压缩包文件${zipFile}已生成`);
fs.removeSync(distDir);
