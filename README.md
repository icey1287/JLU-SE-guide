# 贡献指南

感谢你考虑为软件工程专业通关指南做贡献！这是一个开源项目，欢迎所有人提交课程攻略和改进建议。

## 🎯 贡献方式

### 方式一：提交课程MD文档（推荐）

这是最简单的贡献方式，适合所有人：

1. **Fork 本仓库**
2. **创建MD文档**：在 `courses/md/` 目录下创建新的MD文件
3. **提交PR**：向我们提交Pull Request

### 方式二：完善现有内容

- 修正错误
- 补充遗漏的知识点
- 添加更多代码示例
- 改进排版和格式

### 方式三：提交Issue

- 报告bug
- 建议新功能
- 提出改进意见

## 📝 MD文档规范

### 文件命名

格式：`{course-name}.md`

示例：
- `c-language.md` - C语言程序设计
- `data-structure.md` - 数据结构与算法
- `database.md` - 数据库原理

使用小写字母和连字符，不要使用空格或特殊字符。

### 文档结构

每个MD文档必须包含以下部分：

```markdown
---
title: 课程名称
category: required|elective
hasLab: true|false
credit: 学分
semester: 学期
difficulty: 1-5
author: Your Name <your.email@example.com>
lastUpdated: YYYY-MM-DD
---

# 课程名称

## 课程概述
（简要介绍课程内容和学习目标）

## 重点内容
（列出课程的主要知识点）

## 代码示例
（提供完整的代码示例，使用 ```c 等代码块）

## 学习资源
（推荐教材、课程、工具等）

## 学习技巧
（学习建议和方法）

## 考试攻略
（考试重点、答题技巧等）

## 常见问题
（FAQ格式）

## 贡献者
（列出贡献者）

## 许可证
（使用CC BY-NC-SA 4.0）
```

### Front Matter 说明

每个MD文档的开头必须包含YAML格式的元数据：

```yaml
---
title: C语言程序设计           # 课程名称
category: required            # required(必修) 或 elective(选修)
hasLab: true                 # 是否有实验课
credit: 4                    # 学分
semester: 大一上              # 学期
difficulty: 3                # 难度等级 1-5
author: Your Name            # 作者
lastUpdated: 2024-01-05      # 最后更新日期
---
```

### 代码块规范

使用正确的语言标识符：

````markdown
```c
// C语言代码
#include <stdio.h>
int main() {
    return 0;
}
```

```python
# Python代码
print("Hello, World!")
```

```sql
-- SQL语句
SELECT * FROM users;
```
````

支持的语言标识符：`c`, `cpp`, `python`, `java`, `javascript`, `sql`, `html`, `css`, `bash`, `go`, `rust` 等。

### 格式规范

1. **标题层级**
   - 一级标题 `#` 只用于文档标题
   - 二级标题 `##` 用于主要章节
   - 三级标题 `###` 用于子章节

2. **列表**
   - 使用 `-` 或 `*` 作为无序列表标记
   - 列表项之间空一行
   - 嵌套列表使用2个空格缩进

3. **强调**
   - 粗体：`**文字**`
   - 斜体：`*文字*`
   - 代码：`` `代码` ``（反引号）

4. **链接**
   - 外部链接：`[文字](URL)`
   - 图片：`![描述](图片URL)`

5. **表格**
   ```markdown
   | 列1 | 列2 | 列3 |
   |-----|-----|-----|
   | 内容1 | 内容2 | 内容3 |
   ```

## 🚀 提交流程

### 1. Fork仓库

点击GitHub页面右上角的"Fork"按钮

### 2. 克隆到本地

```bash
git clone https://github.com/YOUR_USERNAME/software-engineering-guide.git
cd software-engineering-guide
```

### 3. 创建分支

```bash
git checkout -b add-course-name
```

### 4. 创建MD文档

在 `courses/md/` 目录下创建新的MD文件，按照上面的规范编写内容。

### 5. 测试预览（可选）

使用VS Code的Markdown预览功能，或其他Markdown编辑器查看效果。

### 6. 提交更改

```bash
git add courses/md/your-course.md
git commit -m "添加《课程名称》攻略"
git push origin add-course-name
```

### 7. 创建Pull Request

1. 访问你Fork的仓库页面
2. 点击"Pull requests" → "New pull request"
3. 填写PR标题和描述
4. 等待审核

## ✅ PR检查清单

提交PR前请确认：

- [ ] MD文档格式正确，包含必要的Front Matter
- [ ] 代码示例使用了正确的语言标识符
- [ ] 没有语法错误和错别字
- [ ] 内容原创或注明了来源
- [ ] 分支名称清晰（如 `add-data-structure`）
- [ ] PR描述说明了改动内容

## 📖 内容要求

### 原创性

- 鼓励原创内容
- 如果引用他人内容，请注明来源
- 不要直接复制粘贴受版权保护的内容

### 质量

- 内容准确，经得起验证
- 代码示例可以运行
- 解释清晰易懂
- 格式规范统一

### 实用性

- 对学生有实际帮助
- 包含实战经验
- 不是空洞的理论
- 可操作性强

## 🎨 风格指南

### 语气

- 友好、鼓励
- 不说教
- 使用第二人称"你"
- 适当使用emoji增强可读性

### 结构

- 从简单到复杂
- 从理论到实践
- 重点内容加粗
- 使用列表和表格整理信息

### 代码示例

- 完整可运行
- 添加充分注释
- 包含多个例子（简单→复杂）
- 说明运行环境和依赖

## 🤝 代码审核

所有提交都会经过审核，我们会：

1. 检查格式和规范
2. 验证内容准确性
3. 测试代码示例
4. 提出修改建议（如有需要）

审核通过后会合并到主分支。

## 📧 联系方式

如有疑问，欢迎：

- 提交Issue
- 发送邮件：your-email@example.com
- 加入讨论组

## 🌟 贡献者

感谢所有贡献者！

## 📄 许可证

提交的内容默认采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可证。

---

**再次感谢你的贡献！让我们一起帮助更多的学弟学妹！** 🎓
