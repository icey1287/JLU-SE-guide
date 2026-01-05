// ==================== 详情页面功能 ====================
document.addEventListener('DOMContentLoaded', function() {
    // 初始化代码高亮
    hljs.highlightAll();

    // 初始化各个功能
    initWordCount();
    initReadTime();
    initTOC();
    initFAQ();
    initCodeToggle();
    initSmoothScroll();
});

// ==================== 字数统计 ====================
function initWordCount() {
    const mainContent = document.querySelector('.detail-main');
    const wordCountElement = document.getElementById('wordCount');

    if (!mainContent || !wordCountElement) return;

    // 获取文本内容（排除HTML标签和代码块）
    const content = mainContent.cloneNode(true);

    // 移除代码块
    const codeBlocks = content.querySelectorAll('.code-container, pre, code');
    codeBlocks.forEach(block => block.remove());

    // 获取纯文本
    const text = content.innerText || content.textContent;

    // 统计字数（中文按字符，英文按单词）
    const chineseChars = text.match(/[\u4e00-\u9fa5]/g) || [];
    const englishWords = text.match(/[a-zA-Z]+/g) || [];
    const numbers = text.match(/\d+/g) || [];

    const totalCount = chineseChars.length + englishWords.length + numbers.length;

    // 显示结果
    if (totalCount >= 1000) {
        wordCountElement.textContent = (totalCount / 1000).toFixed(1) + 'k 字';
    } else {
        wordCountElement.textContent = totalCount + ' 字';
    }
}

// ==================== 阅读时间计算 ====================
function initReadTime() {
    const mainContent = document.querySelector('.detail-main');
    const readTimeElement = document.getElementById('readTime');

    if (!mainContent || !readTimeElement) return;

    // 复制内容并移除代码块
    const content = mainContent.cloneNode(true);
    const codeBlocks = content.querySelectorAll('.code-container, pre, code');
    codeBlocks.forEach(block => block.remove());

    // 获取纯文本
    const text = content.innerText || content.textContent;

    // 计算阅读时间
    // 中文：平均400字/分钟
    // 英文：平均200词/分钟
    const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
    const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;

    const chineseTime = chineseChars / 400; // 分钟
    const englishTime = englishWords / 200; // 分钟

    let totalMinutes = Math.ceil(chineseTime + englishTime);

    // 考虑代码阅读时间（代码阅读速度约为普通文本的1/3）
    const allCodeBlocks = document.querySelectorAll('.code-container code');
    let codeMinutes = 0;
    allCodeBlocks.forEach(block => {
        const codeText = block.textContent;
        const codeLines = codeText.split('\n').length;
        codeMinutes += codeLines / 10; // 假设每10行代码需要1分钟
    });

    totalMinutes += Math.ceil(codeMinutes);

    // 显示结果
    if (totalMinutes < 60) {
        readTimeElement.textContent = totalMinutes + ' 分钟';
    } else {
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        readTimeElement.textContent = hours + ' 小时 ' + mins + ' 分钟';
    }
}

// ==================== 目录导航（TOC）====================
function initTOC() {
    const tocList = document.getElementById('tocList');
    const headings = document.querySelectorAll('.content-section h2');

    if (!tocList || headings.length === 0) return;

    // 清空现有目录
    tocList.innerHTML = '';

    // 生成目录项
    headings.forEach((heading, index) => {
        const id = heading.getAttribute('id') || `section-${index}`;
        heading.setAttribute('id', id);

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${id}`;
        a.textContent = heading.textContent;
        a.dataset.target = id;

        li.appendChild(a);
        tocList.appendChild(li);
    });

    // 滚动时高亮当前章节
    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -70%',
        threshold: 0
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                // 移除所有active类
                tocList.querySelectorAll('a').forEach(link => {
                    link.classList.remove('active');
                });

                // 添加active类到当前目录项
                const activeLink = tocList.querySelector(`a[data-target="${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    headings.forEach(heading => {
        observer.observe(heading);
    });
}

// ==================== FAQ 手风琴效果 ====================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (question) {
            question.addEventListener('click', function() {
                const isOpen = item.classList.contains('active');

                // 关闭所有其他FAQ项
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // 切换当前项
                if (isOpen) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        }
    });
}

// ==================== 代码展开/折叠 ====================
function initCodeToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-code');

    toggleButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const codeContainer = this.nextElementSibling;

            if (codeContainer && codeContainer.classList.contains('code-container')) {
                codeContainer.classList.toggle('hidden');

                // 更新按钮文字
                if (codeContainer.classList.contains('hidden')) {
                    this.textContent = '展开代码';
                } else {
                    this.textContent = '折叠代码';
                }
            }
        });
    });
}

// ==================== 平滑滚动 ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== 页面进度指示器（可选）====================
function initReadingProgress() {
    // 创建进度条
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        width: 0%;
        z-index: 999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    // 更新进度
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ==================== 打印优化 ====================
window.addEventListener('beforeprint', function() {
    // 展开所有代码块
    document.querySelectorAll('.code-container.hidden').forEach(container => {
        container.classList.remove('hidden');
    });

    // 展开所有FAQ
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.add('active');
    });
});

// ==================== 键盘快捷键 ====================
document.addEventListener('keydown', function(e) {
    // 左右箭头切换页面
    if (e.key === 'ArrowLeft') {
        const prevButton = document.querySelector('.nav-button.prev');
        if (prevButton && prevButton.getAttribute('href') !== '#') {
            window.location.href = prevButton.getAttribute('href');
        }
    } else if (e.key === 'ArrowRight') {
        const nextButton = document.querySelector('.nav-button.next');
        if (nextButton) {
            window.location.href = nextButton.getAttribute('href');
        }
    }

    // ? 显示帮助（可选）
    if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        showKeyboardShortcuts();
    }
});

// ==================== 显示快捷键帮助 ====================
function showKeyboardShortcuts() {
    const helpHTML = `
        <div id="keyboard-help" style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 10000;
            max-width: 400px;
        ">
            <h3 style="margin-top: 0;">⌨️ 键盘快捷键</h3>
            <ul style="list-style: none; padding: 0;">
                <li style="padding: 0.5rem 0;"><kbd>←</kbd> 上一课</li>
                <li style="padding: 0.5rem 0;"><kbd>→</kbd> 下一课</li>
                <li style="padding: 0.5rem 0;"><kbd>Home</kbd> 返回顶部</li>
                <li style="padding: 0.5rem 0;"><kbd>ESC</kbd> 关闭帮助</li>
            </ul>
            <p style="color: #666; font-size: 0.875rem;">按 ESC 关闭</p>
        </div>
        <div id="keyboard-help-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 9999;
        "></div>
    `;

    document.body.insertAdjacentHTML('beforeend', helpHTML);

    // 点击关闭
    document.getElementById('keyboard-help-overlay').addEventListener('click', closeKeyboardHelp);
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeKeyboardHelp();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

function closeKeyboardHelp() {
    const help = document.getElementById('keyboard-help');
    const overlay = document.getElementById('keyboard-help-overlay');
    if (help) help.remove();
    if (overlay) overlay.remove();
}

// ==================== 分享功能（可选）====================
function shareContent(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        });
    } else {
        // 复制链接到剪贴板
        navigator.clipboard.writeText(url).then(() => {
            alert('链接已复制到剪贴板！');
        });
    }
}

// ==================== 懒加载图片 ====================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== 导出为PDF（需要html2pdf.js）====================
function exportToPDF() {
    const element = document.querySelector('.detail-main');

    if (!element) return;

    // 这里需要引入 html2pdf.js 库
    // const opt = {
    //     margin: 1,
    //     filename: 'course-guide.pdf',
    //     image: { type: 'jpeg', quality: 0.98 },
    //     html2canvas: { scale: 2 },
    //     jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    // };
    // html2pdf().set(opt).from(element).save();

    alert('导出PDF功能需要引入html2pdf.js库');
}

// ==================== 侧边栏跟随（可选）====================
function initStickySidebar() {
    const sidebar = document.querySelector('.detail-sidebar');

    if (!sidebar) return;

    let sidebarTop = sidebar.offsetTop;
    const sidebarHeight = sidebar.offsetHeight;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > sidebarTop - 90) {
            sidebar.style.position = 'fixed';
            sidebar.style.top = '90px';
            sidebar.style.width = '320px';
        } else {
            sidebar.style.position = 'static';
            sidebar.style.width = 'auto';
        }
    });
}

// ==================== 添加书籍签（可选，使用localStorage）====================
function addBookmark(courseId) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');

    if (!bookmarks.includes(courseId)) {
        bookmarks.push(courseId);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        alert('已添加书签');
    } else {
        // 移除书签
        bookmarks = bookmarks.filter(id => id !== courseId);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        alert('已移除书签');
    }
}

// ==================== 学习进度追踪（可选）====================
function saveReadingProgress(courseId, sectionId) {
    const progress = JSON.parse(localStorage.getItem('readingProgress') || '{}');
    progress[courseId] = sectionId;
    localStorage.setItem('readingProgress', JSON.stringify(progress));
}

function getReadingProgress(courseId) {
    const progress = JSON.parse(localStorage.getItem('readingProgress') || '{}');
    return progress[courseId] || null;
}

// ==================== 评论系统（可选，需要后端支持）====================
// 这里只提供前端框架
function loadComments(courseId) {
    // 从API加载评论
    // fetch(`/api/comments/${courseId}`)
    //     .then(res => res.json())
    //     .then(comments => renderComments(comments));
}

function renderComments(comments) {
    const container = document.getElementById('comments-container');
    if (!container) return;

    // 渲染评论
}

// ==================== 搜索功能 ====================
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();

        // 在当前页面搜索
        const contentSections = document.querySelectorAll('.content-section');

        contentSections.forEach(section => {
            const text = section.textContent.toLowerCase();

            if (text.includes(searchTerm) || searchTerm === '') {
                section.style.display = '';
            } else {
                section.style.display = 'none';
            }
        });
    });
}

// ==================== 深色模式切换 ====================
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// 页面加载时检查深色模式设置
function checkDarkModePreference() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
    }
}

// ==================== 打印页面 ====================
function printPage() {
    window.print();
}

// ==================== 复制代码功能 ====================
function initCopyCodeButton() {
    const codeBlocks = document.querySelectorAll('.code-container');

    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-code-button';
        button.textContent = '复制';
        button.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            padding: 0.25rem 0.75rem;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            color: white;
            border-radius: 0.25rem;
            cursor: pointer;
            font-size: 0.875rem;
            transition: all 0.3s ease;
        `;

        button.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255,255,255,0.2)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255,255,255,0.1)';
        });

        button.addEventListener('click', function() {
            const code = block.querySelector('code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                this.textContent = '已复制！';
                setTimeout(() => {
                    this.textContent = '复制';
                }, 2000);
            });
        });

        block.style.position = 'relative';
        block.appendChild(button);
    });
}

// 初始化复制按钮
initCopyCodeButton();
