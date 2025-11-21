document.addEventListener('DOMContentLoaded', function() {
    const articles = document.querySelectorAll('article');
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    
    const logo = document.getElementById('logo');
    logo.addEventListener('click', function() {
        const homeArticle = document.getElementById('article-home');
        if (homeArticle) {
            homeArticle.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    const articleLabels = {
        'article-home': 'Home',
        'article-people': 'People',
        'article-processes': 'Processes',
        'article-technology': 'Technology',
        'article-about': 'About'
    };
    
    articles.forEach((article, index) => {
        const container = document.createElement('div');
        container.className = 'scroll-dot-container';
        
        const dot = document.createElement('div');
        dot.className = 'scroll-dot';
        if (index === 0) dot.classList.add('active');
        
        const label = document.createElement('div');
        label.className = 'scroll-label';
        label.textContent = articleLabels[article.id] || 'Section';
        
        dot.addEventListener('click', () => {
            article.scrollIntoView({ behavior: 'smooth' });
        });
        
        container.appendChild(label);
        container.appendChild(dot);
        scrollIndicator.appendChild(container);
    });
    
    document.body.appendChild(scrollIndicator);
    
    const updateActiveDot = () => {
        const dots = document.querySelectorAll('.scroll-dot');
        let currentIndex = 0;
        
        articles.forEach((article, index) => {
            const rect = article.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentIndex = index;
            }
        });
        
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };
    
    window.addEventListener('scroll', updateActiveDot);
    
    let scrollTimeout;
    let lastScrollTop = 0;
    let isScrolling = false;
    
    window.addEventListener('scroll', function() {
        if (isScrolling) return;
        
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(function() {
            const currentScrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            
            let targetIndex = 0;
            articles.forEach((article, index) => {
                const rect = article.getBoundingClientRect();
                if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
                    targetIndex = index;
                }
            });
            
            if (articles[targetIndex]) {
                isScrolling = true;
                articles[targetIndex].scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    isScrolling = false;
                }, 1000);
            }
            
            lastScrollTop = currentScrollTop;
        }, 150);
    }, { passive: true });
    
    document.addEventListener('keydown', function(e) {
        const currentScroll = window.scrollY;
        const windowHeight = window.innerHeight;
        
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            window.scrollBy({ top: windowHeight, behavior: 'smooth' });
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            window.scrollBy({ top: -windowHeight, behavior: 'smooth' });
        }
    });
    
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            const windowHeight = window.innerHeight;
            if (diff > 0) {
                window.scrollBy({ top: windowHeight, behavior: 'smooth' });
            } else {
                window.scrollBy({ top: -windowHeight, behavior: 'smooth' });
            }
        }
    }

        // **New logic to change header background on scroll**
    const header = document.querySelector('header');
    const updateHeaderBackground = () => {
        // The header should change background when the user scrolls past the first article.
        // Since each article is 100vh, we check if scrollY is past the viewport height.
        if (window.scrollY >= window.innerHeight - 1) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        // **Attach the new handler to the scroll event**
        window.addEventListener('scroll', updateHeaderBackground, { passive: true });

        // **Call on load to check initial state (in case of refresh on a scrolled page)**
        updateHeaderBackground();
    });
});
