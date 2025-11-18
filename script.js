document.addEventListener('DOMContentLoaded', function() {
    const articles = document.querySelectorAll('article');
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    
    articles.forEach((article, index) => {
        const dot = document.createElement('div');
        dot.className = 'scroll-dot';
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            article.scrollIntoView({ behavior: 'smooth' });
        });
        
        scrollIndicator.appendChild(dot);
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
});
