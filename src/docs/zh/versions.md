# 版本列表

在这里你可以找到当前已发布版本的文档

<script setup>
import jsonData from '../versions.json';

</script>

<table>
  <tr v-for="(value, key, index) in jsonData.archived" :key="index">
    <td>{{ key }}</td>
    <td><a :href="value" target="__blank">文档地址</a></td>
    <td> <a :href="`https://github.com/ajiho/think-weather/releases/tag/think-weather-v${key}`">发布日志</a></td>
  </tr>
</table>
