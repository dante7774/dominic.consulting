document.addEventListener('DOMContentLoaded', function() {
    const actionBtn = document.getElementById('actionBtn');
    
    actionBtn.addEventListener('click', function() {
        alert('Hello! Welcome to your website!');
    });

    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
