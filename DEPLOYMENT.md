# 部署指南

本文档详细说明如何将网站部署到 GitHub Pages。

## 方法一：直接部署主分支（推荐新手）

### 步骤

1. **创建 GitHub 仓库**

   - 访问 https://github.com/new
   - 仓库名称：`software-engineering-guide`（或其他名称）
   - 设置为 Public（公开）
   - 不要初始化 README
   - 点击 "Create repository"

2. **推送代码到 GitHub**

   在项目目录执行：

   ```bash
   # 初始化 git 仓库
   git init

   # 添加所有文件
   git add .

   # 提交
   git commit -m "初始提交"

   # 设置远程仓库（替换 YOUR_USERNAME）
   git remote add origin https://github.com/YOUR_USERNAME/software-engineering-guide.git

   # 推送到主分支
   git branch -M main
   git push -u origin main
   ```

3. **启用 GitHub Pages**

   - 在 GitHub 仓库页面，点击 **Settings**
   - 左侧菜单找到 **Pages**
   - Source 下选择：**Deploy from a branch**
   - Branch 选择：**main** 和 **/ (root)**
   - 点击 **Save**

4. **访问网站**

   等待 1-5 分钟后，访问：
   ```
   https://YOUR_USERNAME.github.io/software-engineering-guide/
   ```

---

## 方法二：使用 gh-pages 分支

### 安装依赖

```bash
# 全局安装 gh-pages
npm install -g gh-pages
```

### 部署步骤

1. **在 package.json 中添加脚本**（如果有的话）

   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d ."
     }
   }
   ```

2. **执行部署**

   ```bash
   # 方法1：直接命令
   gh-pages -d .

   # 方法2：使用 npm script
   npm run deploy
   ```

3. **配置 GitHub Pages**

   - Settings → Pages
   - Source 选择：**Deploy from a branch**
   - Branch 选择：**gh-pages** 和 **/ (root)**

---

## 方法三：使用 GitHub Actions（自动部署）

### 创建工作流文件

在项目根目录创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 配置 GitHub Pages

1. 进入仓库 **Settings** → **Pages**
2. Build and deployment 下：
   - Source 选择：**GitHub Actions**
3. 提交代码后自动部署

---

## 方法四：使用 Vercel（推荐）

### 优点

- 更快的部署速度
- 自动 HTTPS
- 自定义域名
- 预览部署

### 步骤

1. **访问 Vercel**

   https://vercel.com

2. **导入项目**

   - 点击 "New Project"
   - 选择你的 GitHub 仓库
   - 点击 "Import"

3. **配置项目**

   - Framework Preset：**Other**
   - Root Directory：**./**
   - Build Command：留空
   - Output Directory：**./**

4. **部署**

   点击 "Deploy" 按钮

5. **访问网站**

   部署成功后，获得 `.vercel.app` 域名

---

## 方法五：使用 Netlify

### 步骤

1. **访问 Netlify**

   https://netlify.com

2. **拖拽部署**

   - 将项目文件夹拖到 Netlify 页面
   - 等待部署完成

3. **配置**

   - Build settings：留空（静态文件不需要构建）
   - 点击 "Deploy site"

---

## 自定义域名（可选）

### GitHub Pages 配置

1. **购买域名**（如：example.com）

2. **配置 DNS**

   在域名提供商添加 CNAME 记录：
   ```
   类型: CNAME
   名称: @
   值: YOUR_USERNAME.github.io
   ```

3. **在仓库添加 CNAME 文件**

   在项目根目录创建 `CNAME` 文件：
   ```
   example.com
   ```

4. **在 GitHub 设置**

   - Settings → Pages
   - Custom domain 填入：`example.com`
   - 勾选 "Enforce HTTPS"

---

## 更新网站

### 简单更新

1. 修改文件
2. 提交更改
3. 推送到 GitHub

```bash
git add .
git commit -m "更新课程内容"
git push origin main
```

GitHub Pages 会自动重新部署（通常 1-3 分钟）

### 批量更新

```bash
# 拉取最新代码
git pull origin main

# 进行修改

# 提交所有更改
git add .
git commit -m "批量更新课程"
git push origin main
```

---

## 常见问题

### 1. 页面显示 404

- 检查 Settings → Pages 是否启用
- 等待几分钟让部署完成
- 确认文件名是 `index.html`（小写）

### 2. 样式丢失

- 检查 CSS 文件路径：`assets/css/style.css`
- 确认文件已上传到仓库
- 清除浏览器缓存

### 3. 代码不显示高亮

- 确认引入了 highlight.js
- 检查 `hljs.highlightAll()` 是否调用
- 查看 class 名称是否正确（如 `language-python`）

### 4. 筛选功能不工作

- 检查 `main.js` 是否正确引入
- 查看浏览器控制台是否有错误
- 确认 `data-category` 属性值正确

### 5. 移动端显示异常

- 检查 viewport 设置
- 测试不同屏幕尺寸
- 清除移动浏览器缓存

---

## 性能优化

### 1. 压缩资源

```bash
# 压缩 CSS
npx clean-css-cli assets/css/style.css -o assets/css/style.min.css

# 压缩 JS
npx terser assets/js/main.js -o assets/js/main.min.js
```

### 2. 优化图片

```bash
# 使用在线工具
# https://tinypng.com/

# 或使用命令行工具
npm install -g imagemin-cli
imagemin assets/images/* --out-dir=assets/images/optimized
```

### 3. 启用缓存

在 `.htaccess` 文件添加（如果使用 Apache）：

```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
</IfModule>
```

---

## 监控和分析

### 添加 Google Analytics

1. 注册 Google Analytics
2. 获取跟踪代码
3. 在 `index.html` 的 `</head>` 前添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 安全建议

1. **不要提交敏感信息**
   - API 密钥
   - 个人信息
   - 密码

2. **使用 .gitignore**
   - 已经配置好了 `.gitignore` 文件

3. **定期更新依赖**
   - 如果使用 npm，定期更新包

---

## 备份策略

### 定期备份

```bash
# 创建备份脚本
#!/bin/bash
DATE=$(date +%Y%m%d)
git archive --format=tar.gz --output=backup_$DATE.tar.gz main
```

### 导出到其他平台

- GitHub（已有）
- GitLab（镜像）
- 本地备份

---

## 需要帮助？

如果遇到问题：

1. 查看 GitHub Pages 官方文档
2. 检查浏览器控制台错误
3. 在 GitHub Issues 提问
4. 搜索类似问题的解决方案

---

**提示**：部署后记得测试所有功能，确保一切正常工作！
