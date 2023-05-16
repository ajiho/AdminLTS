import{_ as a,c as t,o as s,V as o}from"./chunks/framework.2d5e76c0.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"javascript/index.md","filePath":"javascript/index.md"}'),e={name:"javascript/index.md"},l=o(`<h2 id="说明" tabindex="-1">说明 <a class="header-anchor" href="#说明" aria-label="Permalink to &quot;说明&quot;">​</a></h2><p>布局插件管理布局，微调bootstrap-admin的相关设置</p><h2 id="用法" tabindex="-1">用法 <a class="header-anchor" href="#用法" aria-label="Permalink to &quot;用法&quot;">​</a></h2><p>此插件在窗口加载时自动激活。</p><h2 id="选项" tabindex="-1">选项 <a class="header-anchor" href="#选项" aria-label="Permalink to &quot;选项&quot;">​</a></h2><table><thead><tr><th>选项</th><th>类型</th><th>默认值</th><th>说明</th></tr></thead><tbody><tr><td>scrollbarAutoHide</td><td>boolean</td><td><code>true</code></td><td>滚动条是否鼠标移出后自动隐藏</td></tr><tr><td>preloadDuration</td><td>Integer</td><td>800</td><td>遮罩层加载时长</td></tr><tr><td>themeOnTabPage</td><td>boolean</td><td><code>true</code></td><td>子页面是否也进行主题适配</td></tr></tbody></table><p>您可以像这样通过数据属性使用任何选项。</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">body</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">data-scrollbar-auto-hide</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">true</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">data-theme-on-tab-page</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">true</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">...</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">body</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><h2 id="方法" tabindex="-1">方法 <a class="header-anchor" href="#方法" aria-label="Permalink to &quot;方法&quot;">​</a></h2><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td>fullscreen</td><td>全屏</td></tr><tr><td>exitFullscreen</td><td>退出全屏</td></tr></tbody></table><p>例子:</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">$</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">body</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Layout</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">fullscreen</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">$</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">body</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Layout</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">exitFullscreen</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span></code></pre></div>`,12),n=[l];function p(r,c,d,D,i,y){return s(),t("div",null,n)}const u=a(e,[["render",p]]);export{h as __pageData,u as default};
