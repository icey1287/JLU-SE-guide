# 课程MD文档系统

这是一个基于Markdown的课程攻略贡献系统，允许所有人轻松提交和完善课程内容。

## 📁 目录结构

```
courses/
├── md/                          # MD文档目录
│   ├── TEMPLATE.md            # MD文档模板
│   ├── c-language.md          # C语言课程MD
│   ├── data-structure.md      # 数据结构课程MD（待添加）
│   └── ...                    # 更多课程MD文档
├── c-language.html             # 课程详情页（手动创建或自动生成）
└── ...                         # 更多课程页面
```

## 🎯 工作原理

### 方案一：前端解析（简单快速）

使用JavaScript在前端解析MD文档并动态渲染到页面。

**优点：**
- 实现简单
- 无需后端
- 适合静态网站
- 实时预览

**缺点：**
- 首次加载需要解析MD
- SEO不友好（如果搜索引擎不执行JS）

**实现：**
1. 使用 [marked.js](https://marked.js.org/) 解析MD
2. 使用 [highlight.js](https://highlightjs.org/) 高亮代码
3. 动态加载MD文件并渲染

### 方案二：静态生成（推荐）

使用静态站点生成器在构建时将MD转换为HTML。

**推荐工具：**
- [Jekyll](https://jekyllrb.com/) - GitHub Pages默认支持
- [Hugo](https://gohugo.io/) - 极快的构建速度
- [VitePress](https://vitepress.dev/) - Vue驱动的静态站点生成器
- [Astro](https://astro.build/) - 现代化的静态站点生成器

**优点：**
- 构建后的HTML可直接使用
- SEO友好
- 性能好
- 可以预渲染所有内容

**缺点：**
- 需要配置构建流程
- 每次更新需要重新构建

### 方案三：混合方案（当前推荐）

1. **主页课程卡片**：手动维护或从MD的Front Matter自动生成
2. **课程详情页**：根据MD文档动态生成或手动创建

## 📝 MD文档格式

### Front Matter

每个MD文档开头必须包含YAML格式的元数据：

```yaml
---
title: 课程名称           # 必需
category: required       # 必需：required(必修) 或 elective(选修)
hasLab: true            # 必需：是否有实验课
credit: 4               # 必需：学分
semester: 大一上         # 必需：学期
difficulty: 3           # 必需：难度等级 1-5
author: Your Name       # 推荐：作者
lastUpdated: 2024-01-05 # 推荐：最后更新日期
---
```

### 内容结构

```markdown
# 课程名称

## 课程概述
...

## 重点内容
...

## 代码示例
...

## 学习资源
...

## 学习技巧
...

## 考试攻略
...

## 常见问题
...

## 贡献者
...

## 许可证
...
```

## 🚀 快速开始

### 1. 创建新的课程MD文档

复制 `TEMPLATE.md` 作为起点：

```bash
cp courses/md/TEMPLATE.md courses/md/your-course.md
```

### 2. 编辑MD文档

按照模板填写内容，确保：
- Front Matter完整且正确
- 代码块使用正确的语言标识符
- 内容格式规范

### 3. 创建对应的HTML页面（可选）

如果选择手动创建HTML页面：

1. 复制现有的课程页面作为模板
2. 修改内容引用对应的MD文档
3. 或将MD内容直接嵌入HTML

### 4. 提交更改

```bash
git add courses/md/your-course.md
git commit -m "添加《课程名称》攻略"
git push
```

创建Pull Request提交到主仓库。

## 🔧 前端解析实现（可选）

如果选择前端解析方案，可以使用以下代码：

### 安装依赖

```html
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/lib/core.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/lib/languages/c.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/lib/languages/python.min.js"></script>
<!-- 添加更多语言支持 -->
```

### 解析MD文档

```javascript
async function loadCourseMarkdown(courseName) {
    try {
        const response = await fetch(`courses/md/${courseName}.md`);
        const markdownText = await response.text();

        // 解析MD
        const htmlContent = marked.parse(markdownText);

        // 渲染到页面
        document.getElementById('course-content').innerHTML = htmlContent;

        // 高亮代码块
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    } catch (error) {
        console.error('加载课程文档失败:', error);
    }
}
```

## 📊 从MD生成课程卡片

如果需要从MD文档自动生成主页的课程卡片，可以：

### 方案1：构建时生成（推荐）

使用脚本在构建时扫描MD目录，提取Front Matter，生成课程列表：

```javascript
// build-cards.js
const fs = require('fs');
const matter = require('gray-matter');
const path = require('path');

const mdDir = './courses/md';
const outputDir = './assets/data';

const courses = [];

fs.readdirSync(mdDir).forEach(file => {
    if (file.endsWith('.md') && file !== 'TEMPLATE.md') {
        const content = fs.readFileSync(path.join(mdDir, file), 'utf8');
        const { data } = matter(content);

        courses.push({
            id: file.replace('.md', ''),
            ...data
        });
    }
});

fs.writeFileSync(
    path.join(outputDir, 'courses.json'),
    JSON.stringify(courses, null, 2)
);
```

### 方案2：运行时生成

在页面加载时使用JavaScript扫描MD文件：

```javascript
// 注意：需要fetch所有MD文件，可能影响性能
async function loadCourseList() {
    const mdFiles = ['c-language', 'data-structure', /* ... */];
    const courses = [];

    for (const file of mdFiles) {
        const response = await fetch(`courses/md/${file}.md`);
        const text = await response.text();

        // 提取Front Matter
        const match = text.match(/^---\n(.*?)\n---/s);
        if (match) {
            const meta = parseYAML(match[1]);
            courses.push(meta);
        }
    }

    renderCourseCards(courses);
}
```

## 🎓 最佳实践

### 1. 内容组织

- 每个章节聚焦一个主题
- 从简单到复杂
- 理论结合实践
- 提供完整可运行的代码

### 2. 代码示例

- 包含注释
- 说明运行环境
- 展示输出结果
- 提供多个难度级别

### 3. 维护

- 定期更新内容
- 及时修正错误
- 添加新的学习资源
- 根据课程调整更新

### 4. 协作

- 明确贡献者
- 使用统一的格式
- 代码审查
- 版本控制

## 🔗 相关资源

- [Markdown基础语法](https://www.markdownguide.org/basic-syntax/)
- [Front Matter规范](https://jekyllrb.com/docs/front-matter/)
- [marked.js文档](https://marked.js.org/)
- [highlight.js文档](https://highlightjs.org/)
- [贡献指南](../CONTRIBUTING.md)

## ❓ 常见问题

### Q: MD文档中的图片怎么处理？

A: 建议将图片放在 `assets/images/courses/` 目录下，使用相对路径引用：

```markdown
![图片描述](../../assets/images/courses/c-language/pointer.png)
```

### Q: 如何添加数学公式？

A: 使用 [KaTeX](https://katex.org/) 或 [MathJax](https://www.mathjax.org/)：

```markdown
行内公式：$E = mc^2$

独立公式：
$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$
```

### Q: MD文档被删除了怎么办？

A: 项目使用Git版本控制，可以随时恢复历史版本：

```bash
git log --all --full-history -- "**/your-course.md"
```

### Q: 可以提交其他人编写的内容吗？

A: 只要获得授权并注明来源即可。请确保遵守原内容的许可证。

---

**开始贡献吧！** 🚀

参考 [CONTRIBUTING.md](../CONTRIBUTING.md) 了解详细的贡献流程。
