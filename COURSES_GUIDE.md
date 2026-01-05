# 课程添加指南

本文档说明如何向网站添加新的课程攻略。

## 快速开始

### 复制模板

在 `index.html` 的课程攻略部分（`<section id="courses">`），复制以下模板：

```html
<div class="course-card" data-category="required lab">
    <div class="course-header">
        <h3 class="course-name">课程名称</h3>
        <span class="course-tag required">必修</span>
    </div>
    <div class="course-meta">
        <span class="course-credit">学分: X</span>
        <span class="course-semester">学期</span>
    </div>
    <div class="course-description">
        <p>课程简介...</p>
    </div>
    <div class="course-topics">
        <h4>重点内容</h4>
        <ul>
            <li>知识点1</li>
            <li>知识点2</li>
        </ul>
    </div>
    <div class="course-resources">
        <h4>学习资源</h4>
        <ul>
            <li>资源1</li>
            <li>资源2</li>
        </ul>
    </div>
    <div class="course-examples">
        <h4>代码示例</h4>
        <button class="toggle-code">展开代码</button>
        <div class="code-container hidden">
            <pre><code class="language-python">代码内容</code></pre>
        </div>
    </div>
</div>
```

## 配置说明

### data-category 属性

组合使用以下值：

- `required` - 必修课
- `elective` - 选修课
- `lab` - 有上机实验/代码示例

示例：
- `data-category="required"` - 必修课（无实验）
- `data-category="required lab"` - 必修课（有实验）
- `data-category="elective"` - 选修课（无实验）
- `data-category="elective lab"` - 选修课（有实验）

### 课程标签

```html
<!-- 必修课 -->
<span class="course-tag required">必修</span>

<!-- 选修课 -->
<span class="course-tag elective">选修</span>
```

### 学期格式

建议格式：
- `大一上` / `大一下`
- `大二上` / `大二下`
- `大三上` / `大三下`
- `大四上` / `大四下`

## 代码示例

### 支持的编程语言

在 `<code>` 标签的 class 属性中指定语言：

| 语言 | class 值 |
|------|----------|
| C | `language-c` |
| C++ | `language-cpp` |
| Python | `language-python` |
| Java | `language-java` |
| JavaScript | `language-javascript` |
| SQL | `language-sql` |
| HTML/CSS | `language-html` / `language-css` |
| Shell | `language-bash` |
| Go | `language-go` |
| Rust | `language-rust` |

### 代码格式化建议

1. **添加注释**：关键代码添加注释说明
2. **简洁示例**：只展示核心代码，不要完整项目
3. **多个示例**：如果代码较长，可以分成多个代码块

示例：

```html
<div class="course-examples">
    <h4>代码示例</h4>

    <!-- 示例1：基础语法 -->
    <button class="toggle-code">展开代码 - 基础示例</button>
    <div class="code-container hidden">
        <pre><code class="language-python"># 基础输入输出
print("Hello, World!")
name = input("请输入姓名: ")
print(f"欢迎, {name}!")</code></pre>
    </div>

    <!-- 示例2：进阶功能 -->
    <button class="toggle-code">展开代码 - 进阶示例</button>
    <div class="code-container hidden">
        <pre><code class="language-python"># 类和对象
class Student:
    def __init__(self, name, id):
        self.name = name
        self.id = id

    def display(self):
        print(f"学生: {self.name}, ID: {self.id}")

# 使用
s = Student("张三", 1001)
s.display()</code></pre>
    </div>
</div>
```

## 课程内容建议

### 课程描述

简要说明：
- 这门课讲什么
- 在专业体系中的地位
- 难度如何

### 重点内容

列出：
- 核心知识点（5-8个）
- 按学习顺序或重要性排序
- 考试重点内容

### 学习资源

可包括：
- 推荐教材（书名 + 作者 + 简短评价）
- 在线课程（MOOC、B站等）
- 实用网站/工具
- 习题平台

### 代码示例（如果有）

提供：
- 经典算法实现
- 实验报告代码
- 常用代码模板
- 避坑示例

## 常见课程示例

### 理论课（无代码）

```html
<div class="course-card" data-category="required">
    <div class="course-header">
        <h3 class="course-name">软件工程</h3>
        <span class="course-tag required">必修</span>
    </div>
    <div class="course-meta">
        <span class="course-credit">学分: 3</span>
        <span class="course-semester">大三上</span>
    </div>
    <div class="course-description">
        <p>学习软件开发的工程化方法，包括需求分析、系统设计、项目管理等。</p>
    </div>
    <div class="course-topics">
        <h4>重点内容</h4>
        <ul>
            <li>软件生命周期模型</li>
            <li>需求工程</li>
            <li>软件设计原则</li>
            <li>测试策略</li>
        </ul>
    </div>
    <div class="course-resources">
        <h4>学习资源</h4>
        <ul>
            <li>《软件工程：实践者的研究方法》</li>
            <li>《代码大全》</li>
        </ul>
    </div>
</div>
```

### 实验课（有代码）

```html
<div class="course-card" data-category="required lab">
    <div class="course-header">
        <h3 class="course-name">Java程序设计</h3>
        <span class="course-tag required">必修</span>
    </div>
    <div class="course-meta">
        <span class="course-credit">学分: 4</span>
        <span class="course-semester">大二上</span>
    </div>
    <div class="course-description">
        <p>面向对象编程基础，学习Java语言核心特性和面向对象设计思想。</p>
    </div>
    <div class="course-topics">
        <h4>重点内容</h4>
        <ul>
            <li>面向对象三大特性</li>
            <li>异常处理</li>
            <li>集合框架</li>
            <li>IO流</li>
            <li>多线程基础</li>
        </ul>
    </div>
    <div class="course-examples">
        <h4>代码示例</h4>
        <button class="toggle-code">展开代码</button>
        <div class="code-container hidden">
            <pre><code class="language-java">// 类和继承示例
public class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;
    }

    public void speak() {
        System.out.println("动物发出声音");
    }
}

public class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }

    @Override
    public void speak() {
        System.out.println(name + "汪汪叫");
    }
}</code></pre>
        </div>
    </div>
</div>
```

## 排序建议

按以下顺序排列课程：

1. 大一课程 → 大四课程
2. 每个学年内：先必修，后选修
3. 同类型课程：按学分或重要性

## 质量检查

添加课程后检查：

- [ ] 课程卡片样式正常
- [ ] 筛选功能正常工作
- [ ] 代码高亮正确
- [ ] 展开/折叠按钮可用
- [ ] 移动端显示正常
- [ ] 链接和引用资源有效

## 批量添加

如果要添加大量课程，建议：

1. 创建临时文档，整理所有课程信息
2. 使用文本编辑器的批量替换功能
3. 一次性添加所有课程卡片
4. 测试所有功能

## 需要帮助？

如果遇到问题：

1. 检查 HTML 结构是否完整
2. 确认所有标签都正确闭合
3. 验证 data-category 属性值
4. 在浏览器控制台查看错误信息

---

**提示**：添加课程时，尽量提供真实、有用的内容，帮助学弟学妹们更好地学习！
