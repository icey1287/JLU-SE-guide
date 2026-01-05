// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', function() {
    // 初始化代码高亮
    hljs.highlightAll();

    // 初始化各个功能模块
    initNavigation();
    initBackToTop();
    initCourseFilters();
    initCodeToggle();
    initSmoothScroll();
    initScrollSpy();
});

// ==================== 导航栏功能 ====================
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 移动端菜单切换
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // 汉堡菜单动画
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });
    }

    // 点击导航链接后关闭移动端菜单
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');

                // 重置汉堡菜单
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
    });

    // 导航栏滚动效果
    let lastScroll = 0;
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }

        lastScroll = currentScroll;
    });
}

// ==================== 平滑滚动 ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // 忽略空链接
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== 滚动监听（高亮当前导航） ====================
function initScrollSpy() {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-80px 0px -80px 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                // 移除所有active类
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // 添加active类到当前导航
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// ==================== 回到顶部按钮 ====================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    if (!backToTopBtn) return;

    // 监听滚动，显示/隐藏按钮
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // 点击回到顶部
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== 课程筛选功能 ====================
function initCourseFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 更新按钮状态
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // 筛选课程卡片
            courseCards.forEach(card => {
                const categories = card.getAttribute('data-category');

                if (filter === 'all') {
                    card.style.display = '';
                    card.classList.add('fade-in');
                } else if (categories && categories.includes(filter)) {
                    card.style.display = '';
                    card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('fade-in');
                }
            });

            // 移除动画类（防止重复添加）
            setTimeout(() => {
                courseCards.forEach(card => {
                    card.classList.remove('fade-in');
                });
            }, 500);
        });
    });
}

// ==================== 代码展开/折叠功能 ====================
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

// ==================== 搜索功能（可选） ====================
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const courseCards = document.querySelectorAll('.course-card');

    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();

        courseCards.forEach(card => {
            const courseName = card.querySelector('.course-name').textContent.toLowerCase();
            const courseDescription = card.querySelector('.course-description').textContent.toLowerCase();

            if (courseName.includes(searchTerm) || courseDescription.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// ==================== 深色模式切换（可选扩展功能） ====================
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // 检查本地存储中的主题偏好
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    if (!darkModeToggle) return;

    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');

        // 保存主题偏好
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
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

// ==================== 添加页面加载动画 ====================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');

    // 添加滚动时的元素淡入效果
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.advice-card, .pitfall-card, .course-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ==================== 导出工具函数 ====================
// 生成课程数据JSON（方便后续动态加载课程）
function exportCoursesData() {
    const courses = [];

    document.querySelectorAll('.course-card').forEach(card => {
        const course = {
            name: card.querySelector('.course-name').textContent,
            category: card.getAttribute('data-category'),
            credit: card.querySelector('.course-credit').textContent,
            semester: card.querySelector('.course-semester').textContent,
            description: card.querySelector('.course-description p').textContent,
            topics: [],
            resources: [],
            code: null
        };

        // 提取重点内容
        const topicsList = card.querySelector('.course-topics ul');
        if (topicsList) {
            topicsList.querySelectorAll('li').forEach(li => {
                course.topics.push(li.textContent);
            });
        }

        // 提取学习资源
        const resourcesList = card.querySelector('.course-resources ul');
        if (resourcesList) {
            resourcesList.querySelectorAll('li').forEach(li => {
                course.resources.push(li.textContent);
            });
        }

        // 提取代码示例
        const codeBlock = card.querySelector('pre code');
        if (codeBlock) {
            course.code = codeBlock.textContent;
        }

        courses.push(course);
    });

    return JSON.stringify(courses, null, 2);
}

// 打印页面时优化显示
window.addEventListener('beforeprint', function() {
    // 展开所有代码块
    document.querySelectorAll('.code-container.hidden').forEach(container => {
        container.classList.remove('hidden');
    });
});

// ==================== 响应式图片处理 ====================
function handleResponsiveImages() {
    const images = document.querySelectorAll('.course-image, .hero-image');

    images.forEach(img => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                img.setAttribute('src', img.dataset.mobileSrc || img.src);
            } else {
                img.setAttribute('src', img.dataset.desktopSrc || img.src);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
    });
}

// ==================== 性能监控（开发环境） ====================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`页面加载时间: ${pageLoadTime}ms`);
        }, 0);
    });
}

// ==================== 键盘快捷键 ====================
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K 打开搜索（如果实现了搜索功能）
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }

    // ESC 关闭移动端菜单
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }
});

// ==================== 工具提示 ====================
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');

    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            tooltip.classList.add('visible');
        });

        el.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}
