// ==================== 课程MD加载器 ====================
document.addEventListener('DOMContentLoaded', function() {
    // 从URL参数获取课程名称
    const urlParams = new URLSearchParams(window.location.search);
    const courseName = urlParams.get('course') || 'c-language';

    // 加载课程MD文档
    loadCourseMarkdown(courseName);
});

/**
 * 加载并解析课程MD文档
 */
async function loadCourseMarkdown(courseName) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorMessage = document.getElementById('errorMessage');
    const mainContent = document.getElementById('mainContent');

    try {
        // 加载MD文件
        const response = await fetch(`courses/md/${courseName}.md`);

        if (!response.ok) {
            throw new Error(`无法加载课程文档：${courseName}.md`);
        }

        const markdownText = await response.text();

        // 隐藏加载指示器，显示主内容
        loadingIndicator.classList.add('hidden');
        mainContent.classList.remove('hidden');

        // 解析MD文档
        parseAndRender(markdownText);

    } catch (error) {
        console.error('加载课程文档失败:', error);
        loadingIndicator.classList.add('hidden');
        errorMessage.classList.remove('hidden');
        document.getElementById('errorText').textContent = error.message;
    }
}

/**
 * 解析MD文档并渲染到页面
 */
function parseAndRender(markdownText) {
    // 提取Front Matter
    const { frontMatter, content } = extractFrontMatter(markdownText);

    // 解析Front Matter
    const metadata = parseFrontMatter(frontMatter);

    // 渲染课程头部信息
    renderCourseHeader(metadata);

    // 将MD内容转换为HTML
    const htmlContent = marked.parse(content);

    // 渲染MD内容
    renderContent(htmlContent);

    // 生成目录
    generateTOC();

    // 高亮代码块
    highlightCode();

    // 计算字数和阅读时间
    calculateStats(content);

    // 添加代码复制按钮
    addCopyButtons();

    // 初始化其他功能
    initFAQ();
    initCodeToggle();
}

/**
 * 提取Front Matter和内容
 */
function extractFrontMatter(text) {
    const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = text.match(frontMatterRegex);

    if (match) {
        return {
            frontMatter: match[1],
            content: match[2]
        };
    }

    return {
        frontMatter: '',
        content: text
    };
}

/**
 * 解析Front Matter（简单的YAML解析）
 */
function parseFrontMatter(frontMatter) {
    const metadata = {};
    const lines = frontMatter.split('\n');

    lines.forEach(line => {
        const match = line.match(/^(\w+):\s*(.+)$/);
        if (match) {
            const key = match[1];
            let value = match[2].trim();

            // 移除引号
            if ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }

            // 解析布尔值
            if (value === 'true') value = true;
            if (value === 'false') value = false;

            // 解析数字
            if (!isNaN(value) && value !== '') {
                value = Number(value);
            }

            metadata[key] = value;
        }
    });

    return metadata;
}

/**
 * 渲染课程头部信息
 */
function renderCourseHeader(metadata) {
    // 设置课程标题
    document.title = `${metadata.title || '课程攻略'} - 软件工程专业通关指南`;
    document.getElementById('courseTitle').textContent = metadata.title || '未知课程';
    document.getElementById('courseTitleMain').textContent = metadata.title || '未知课程';

    // 渲染标签
    const tagsContainer = document.getElementById('courseTags');
    tagsContainer.innerHTML = '';

    if (metadata.category === 'required') {
        tagsContainer.innerHTML += '<span class="course-tag required">必修</span>';
    } else if (metadata.category === 'elective') {
        tagsContainer.innerHTML += '<span class="course-tag elective">选修</span>';
    }

    if (metadata.hasLab) {
        tagsContainer.innerHTML += '<span class="course-tag lab">有实验</span>';
    }

    // 设置元信息
    document.getElementById('courseCredit').textContent = metadata.credit || '-';
    document.getElementById('courseSemester').textContent = metadata.semester || '-';

    // 渲染难度星级
    const difficulty = metadata.difficulty || 3;
    const starsContainer = document.getElementById('difficultyStars');
    starsContainer.innerHTML = '';

    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.className = 'star' + (i <= difficulty ? ' filled' : '');
        star.textContent = '★';
        starsContainer.appendChild(star);
    }

    // 设置难度文本
    const difficultyTexts = ['', '非常简单', '较简单', '中等', '较难', '很难'];
    document.getElementById('difficultyText').textContent = difficultyTexts[difficulty] || '中等';

    // 设置作者信息
    if (metadata.author) {
        document.getElementById('authorInfo').style.display = 'block';
        document.getElementById('authorName').textContent = metadata.author;
    }

    if (metadata.lastUpdated) {
        document.getElementById('lastUpdated').textContent = metadata.lastUpdated;
    }
}

/**
 * 渲染MD内容
 */
function renderContent(htmlContent) {
    const mdContent = document.getElementById('mdContent');
    mdContent.innerHTML = htmlContent;

    // 为所有标题添加ID（用于目录和跳转）
    const headings = mdContent.querySelectorAll('h1, h2, h3, h4');
    headings.forEach((heading, index) => {
        if (!heading.id) {
            const text = heading.textContent.trim();
            const id = text.toLowerCase()
                .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
                .replace(/^-+|-+$/g, '');
            heading.id = id || `heading-${index}`;
        }
    });
}

/**
 * 生成目录（TOC）
 */
function generateTOC() {
    const tocList = document.getElementById('tocList');
    const mdContent = document.getElementById('mdContent');
    const headings = mdContent.querySelectorAll('h2, h3');

    if (headings.length === 0) {
        tocList.innerHTML = '<li><span class="toc-empty">暂无目录</span></li>';
        return;
    }

    tocList.innerHTML = '';

    headings.forEach(heading => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${heading.id}`;
        a.textContent = heading.textContent;
        a.dataset.target = heading.id;

        if (heading.tagName === 'H3') {
            a.style.paddingLeft = '1.5rem';
            a.style.fontSize = '0.875rem';
        }

        li.appendChild(a);
        tocList.appendChild(li);
    });

    // 滚动时高亮当前章节
    initScrollSpy();
}

/**
 * 滚动监听
 */
function initScrollSpy() {
    const headings = document.querySelectorAll('#mdContent h2, #mdContent h3');
    const tocLinks = document.querySelectorAll('#tocList a');

    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -70%',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                tocLinks.forEach(link => {
                    link.classList.remove('active');
                });

                const activeLink = document.querySelector(`#tocList a[data-target="${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    headings.forEach(heading => observer.observe(heading));
}

/**
 * 高亮代码块
 */
function highlightCode() {
    document.querySelectorAll('#mdContent pre code').forEach((block) => {
        hljs.highlightElement(block);
    });
}

/**
 * 计算字数和阅读时间
 */
function calculateStats(content) {
    // 移除代码块
    const textWithoutCode = content.replace(/```[\s\S]*?```/g, '');

    // 统计中文字符
    const chineseChars = (textWithoutCode.match(/[\u4e00-\u9fa5]/g) || []).length;

    // 统计英文单词
    const englishWords = (textWithoutCode.match(/[a-zA-Z]+/g) || []).length;

    // 总字数
    const totalWords = chineseChars + englishWords;

    // 显示字数
    const wordCountElement = document.getElementById('wordCount');
    if (totalWords >= 1000) {
        wordCountElement.textContent = (totalWords / 1000).toFixed(1) + 'k 字';
    } else {
        wordCountElement.textContent = totalWords + ' 字';
    }

    // 计算阅读时间
    const chineseTime = chineseChars / 400;
    const englishTime = englishWords / 200;
    const codeTime = (content.match(/```/g) || []).length * 2;

    let totalMinutes = Math.ceil(chineseTime + englishTime + codeTime);

    const readTimeElement = document.getElementById('readTime');
    if (totalMinutes < 60) {
        readTimeElement.textContent = totalMinutes + ' 分钟';
    } else {
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        readTimeElement.textContent = hours + ' 小时 ' + mins + ' 分钟';
    }
}

/**
 * 添加代码复制按钮
 */
function addCopyButtons() {
    document.querySelectorAll('#mdContent pre').forEach(pre => {
        const button = document.createElement('button');
        button.className = 'copy-code-button';
        button.textContent = '复制';

        button.addEventListener('click', async () => {
            const code = pre.querySelector('code').textContent;
            try {
                await navigator.clipboard.writeText(code);
                button.textContent = '已复制！';
                setTimeout(() => {
                    button.textContent = '复制';
                }, 2000);
            } catch (err) {
                console.error('复制失败:', err);
                button.textContent = '失败';
            }
        });

        pre.style.position = 'relative';
        pre.appendChild(button);
    });
}

/**
 * 初始化FAQ手风琴
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('#mdContent h3');

    faqItems.forEach(heading => {
        const text = heading.textContent.trim();

        // 只处理以"Q:"开头的标题
        if (!text.startsWith('Q:')) return;

        const faqItem = heading.parentElement;
        const nextElement = heading.nextElementSibling;

        if (!nextElement || !nextElement.textContent.startsWith('A:')) return;

        // 创建FAQ结构
        const faqContainer = document.createElement('div');
        faqContainer.className = 'faq-item';

        const question = document.createElement('h3');
        question.className = 'faq-question';
        question.textContent = text.replace(/^Q:\s*/, '');
        question.onclick = () => {
            faqContainer.classList.toggle('active');
        };

        const answer = document.createElement('div');
        answer.className = 'faq-answer';
        answer.innerHTML = nextElement.innerHTML;

        faqContainer.appendChild(question);
        faqContainer.appendChild(answer);

        faqItem.replaceWith(faqContainer);
        nextElement.remove();
    });
}

/**
 * 初始化代码切换按钮
 */
function initCodeToggle() {
    // 如果MD中使用了特定的标记，可以在这里实现代码块展开/折叠
}

// 配置marked选项
if (typeof marked !== 'undefined') {
    marked.setOptions({
        breaks: true,
        gfm: true,
        headerIds: true,
        highlight: function(code, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(code, { language: lang }).value;
                } catch (err) {}
            }
            return code;
        }
    });
}
