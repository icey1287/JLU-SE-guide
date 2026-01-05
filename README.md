# 软件工程专业通关指南

一个帮助软件工程专业学生更好地规划大学生活的静态网站，包含完整的时间线、学习建议、课程攻略和避坑指南。

## 功能特性

- 📅 **大学时间线** - 从大一到大四的完整规划建议
- 💡 **学习建议** - 专业前辈总结的学习经验
- 📚 **课程攻略** - 所有必修课和选修课的详细攻略
- 💻 **代码示例** - 有实验的课程附上完整代码
- ⚠️ **避坑指南** - 常见误区和注意事项
- 🔍 **课程筛选** - 按必修/选修/是否有实验筛选
- 📱 **响应式设计** - 完美适配手机、平板、电脑

## 本地运行

1. 克隆项目到本地
```bash
git clone https://github.com/your-username/software-engineering-guide.git
cd software-engineering-guide
```

2. 直接用浏览器打开 `index.html` 文件

或者使用本地服务器：
```bash
# 使用 Python 3
python -m http.server 8002

# 使用 Node.js (需要先安装 http-server)
npx http-server
```

3. 在浏览器中访问 `http://localhost:8002`

## 添加课程内容

### 方法一：直接编辑 HTML

在 `index.html` 中找到课程攻略部分（`#courses`），复制已有的课程卡片模板，修改内容：

```html
<div class="course-card" data-category="required lab">
    <div class="course-header">
        <h3 class="course-name">课程名称</h3>
        <span class="course-tag required">必修</span> <!-- 或 elective -->
    </div>
    <div class="course-meta">
        <span class="course-credit">学分: 4</span>
        <span class="course-semester">大一上</span>
    </div>
    <!-- ... 其他内容 -->
</div>
```

注意 `data-category` 属性：
- `required` - 必修课
- `elective` - 选修课
- `lab` - 有上机实验

### 方法二：使用 JSON 数据

1. 编辑 `assets/data/courses-template.json`
2. 添加课程信息
3. 后续可以通过 JavaScript 动态加载（需要修改 `main.js`）

### 添加代码示例

在课程卡片中添加代码示例：

```html
<div class="course-examples">
    <h4>代码示例</h4>
    <button class="toggle-code">展开代码</button>
    <div class="code-container hidden">
        <pre><code class="language-python">你的代码</code></pre>
    </div>
</div>
```

支持的语言：
- `c` - C语言
- `cpp` - C++
- `python` - Python
- `java` - Java
- `javascript` - JavaScript
- `sql` - SQL
- 等等...

## 部署到 GitHub Pages

### 方法一：直接部署主分支

1. 将代码推送到 GitHub 仓库

```bash
git add .
git commit -m "初始提交"
git branch -M main
git remote add origin https://github.com/your-username/software-engineering-guide.git
git push -u origin main
```

2. 在 GitHub 仓库页面：
   - 进入 Settings → Pages
   - Source 选择：Deploy from a branch
   - Branch 选择：main / root
   - 点击 Save

3. 等待几分钟后，访问 `https://your-username.github.io/software-engineering-guide/`

### 方法二：使用 gh-pages 分支

```bash
# 安装 gh-pages 包
npm install -g gh-pages

# 构建并部署
gh-pages -d .
```

### 方法三：使用 GitHub Actions

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .
```

## 自定义配置

### 修改主题颜色

编辑 `assets/css/style.css` 中的 CSS 变量：

```css
:root {
    --primary-color: #2563eb;      /* 主色调 */
    --secondary-color: #7c3aed;    /* 辅助色 */
    --success-color: #10b981;      /* 成功色 */
    /* ... 其他颜色 */
}
```

### 修改网站信息

在 `index.html` 中修改：
- `<title>` 标签 - 网页标题
- `.hero-title` - 主标题
- `.hero-subtitle` - 副标题
- `.hero-stats` - 统计数据

## 项目结构

```
software-engineering-guide/
├── index.html                 # 主页面
├── assets/
│   ├── css/
│   │   └── style.css         # 样式文件
│   ├── js/
│   │   └── main.js           # JavaScript 交互
│   ├── data/
│   │   └── courses-template.json  # 课程数据模板
│   └── images/               # 图片资源
└── README.md                 # 说明文档
```

## 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式设计（Grid + Flexbox 布局）
- **JavaScript (ES6+)** - 交互功能
- **highlight.js** - 代码高亮

## 功能说明

### 导航栏
- 固定在顶部，滚动时有阴影效果
- 移动端自动折叠为汉堡菜单
- 滚动时自动高亮当前区域

### 时间线
- 响应式设计，大屏幕左右交替，小屏幕单侧显示
- 每个学期列出关键任务

### 课程筛选
- 点击按钮快速筛选课程
- 支持：全部 / 必修 / 选修 / 有实验

### 代码高亮
- 使用 highlight.js 自动识别语言
- 点击按钮展开/折叠代码
- 深色主题，易于阅读

### 回到顶部
- 滚动超过 300px 后显示
- 点击平滑滚动到顶部

## 常见问题

**Q: 如何修改统计数字？**
A: 编辑 `index.html` 中的 `.hero-stats` 部分。

**Q: 如何添加新的课程？**
A: 复制现有的 `.course-card` 结构，修改内容即可。

**Q: 如何禁用某个功能？**
A: 在 `assets/js/main.js` 中注释掉对应的初始化函数调用。

**Q: 页面加载慢怎么办？**
A: 考虑压缩图片、使用 CDN、或者使用静态站点生成器。

## 贡献指南

欢迎提交问题和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 待办事项

- [ ] 添加搜索功能
- [ ] 支持暗黑模式
- [ ] 添加课程评价功能
- [ ] 添加学习进度追踪
- [ ] 支持导出 PDF
- [ ] 添加评论系统

## 许可证

本项目采用 MIT 许可证 - 详见 LICENSE 文件

## 致谢

感谢所有为本项目做出贡献的同学！

---

**用 ❤️ 制作，帮助每一位软件工程专业学生**

如有问题或建议，欢迎联系：your-email@example.com
