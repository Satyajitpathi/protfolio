// script.js - All JavaScript functionality for Satyajit Pathi portfolio

// ==================== CONTACT FORM HANDLING ====================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const responseDiv = document.getElementById('response');
            
            // Simple validation
            if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
                responseDiv.innerText = '⚠️ Please fill in all fields';
                responseDiv.style.color = '#ffaa66';
                responseDiv.style.opacity = '1';
                
                setTimeout(() => {
                    responseDiv.style.opacity = '0';
                }, 3000);
                return;
            }
            
            // Email validation (simple)
            if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
                responseDiv.innerText = '⚠️ Please enter a valid email address';
                responseDiv.style.color = '#ffaa66';
                responseDiv.style.opacity = '1';
                
                setTimeout(() => {
                    responseDiv.style.opacity = '0';
                }, 3000);
                return;
            }
            
            // Success message
            const name = nameInput.value.trim();
            responseDiv.innerText = `✨ Thank you for reaching out, ${name}! I'll reply soon.`;
            responseDiv.style.color = '#b5ffb5';
            responseDiv.style.opacity = '1';
            
            // Reset form
            contactForm.reset();
            
            // Hide message after 4 seconds
            setTimeout(() => {
                responseDiv.style.opacity = '0';
            }, 4000);
        });
    }
});

// ==================== SCROLL REVEAL ANIMATIONS ====================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150; // pixels from bottom to trigger
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

// Add reveal class to sections if not already present
document.addEventListener('DOMContentLoaded', function() {
    // Add reveal class to all sections if they don't have it
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (!section.classList.contains('reveal')) {
            section.classList.add('reveal');
        }
    });
    
    // Also add to hero elements if needed
    const heroElements = document.querySelectorAll('.hero-text, .hero-img');
    heroElements.forEach(el => {
        if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
        }
    });
    
    // Initial check for elements in view
    revealOnScroll();
});

// Listen for scroll events
window.addEventListener('scroll', revealOnScroll);

// ==================== SMOOTH SCROLLING FOR NAVIGATION ====================
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Optional: update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
});

// ==================== ACTIVE NAVIGATION HIGHLIGHT ====================
function highlightActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active-nav');
        const linkHref = link.getAttribute('href').substring(1); // Remove #
        if (linkHref === current) {
            link.classList.add('active-nav');
        }
    });
}

// Add CSS for active nav (small addition)
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active-nav {
        color: #61dafb;
    }
    .nav-links a.active-nav::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

window.addEventListener('scroll', highlightActiveNav);
window.addEventListener('load', highlightActiveNav);

// ==================== LAZY LOAD IMAGES WITH FALLBACK ====================
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add error handling for images
        img.addEventListener('error', function() {
            // If image fails to load, replace with placeholder based on context
            const parent = this.parentElement;
            const alt = this.alt.toLowerCase();
            
            if (alt.includes('satyajit') || alt.includes('photo')) {
                this.src = 'https://via.placeholder.com/280x280?text=Profile';
            } else if (parent.classList.contains('portfolio-card')) {
                this.src = 'https://via.placeholder.com/220x110?text=Project';
            } else {
                this.src = 'https://via.placeholder.com/400x200?text=Image+Not+Found';
            }
        });
        
        // Lazy loading for better performance
        if ('loading' in HTMLImageElement.prototype) {
            img.loading = 'lazy';
        }
    });
});

// ==================== BACK TO TOP BUTTON (OPTIONAL ENHANCEMENT) ====================
function createBackToTopButton() {
    // Check if button already exists
    if (document.getElementById('back-to-top')) return;
    
    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.setAttribute('aria-label', 'Back to top');
    
    // Style the button
    btn.style.position = 'fixed';
    btn.style.bottom = '30px';
    btn.style.right = '30px';
    btn.style.width = '50px';
    btn.style.height = '50px';
    btn.style.borderRadius = '50%';
    btn.style.background = 'linear-gradient(145deg, #61dafb, #45f882)';
    btn.style.color = '#0a111f';
    btn.style.border = 'none';
    btn.style.cursor = 'pointer';
    btn.style.fontSize = '1.3rem';
    btn.style.display = 'flex';
    btn.style.alignItems = 'center';
    btn.style.justifyContent = 'center';
    btn.style.boxShadow = '0 4px 20px #61dafb80';
    btn.style.transition = 'all 0.3s ease';
    btn.style.zIndex = '999';
    btn.style.opacity = '0';
    btn.style.visibility = 'hidden';
    
    // Hover effect
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-5px)';
        btn.style.boxShadow = '0 8px 25px #45f882';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
        btn.style.boxShadow = '0 4px 20px #61dafb80';
    });
    
    // Click action
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(btn);
    
    // Show/hide based on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
        } else {
            btn.style.opacity = '0';
            btn.style.visibility = 'hidden';
        }
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// ==================== TYPEWRITER EFFECT FOR HERO (OPTIONAL) ====================
function addTypewriterEffect() {
    const heroHeading = document.querySelector('.hero-text h1');
    if (!heroHeading) return;
    
    // Store original text
    const originalText = heroHeading.textContent;
    
    // Only apply on larger screens to avoid performance issues
    if (window.innerWidth > 768) {
        // Clear and add typewriter class
        heroHeading.textContent = '';
        heroHeading.style.borderRight = '3px solid #61dafb';
        heroHeading.style.display = 'inline-block';
        heroHeading.style.whiteSpace = 'nowrap';
        heroHeading.style.overflow = 'hidden';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroHeading.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                heroHeading.style.borderRight = 'none';
            }
        }
        
        // Start animation after page load
        setTimeout(typeWriter, 500);
    }
}

// Uncomment if you want typewriter effect (can be heavy)
// document.addEventListener('DOMContentLoaded', addTypewriterEffect);

// ==================== CERTIFICATE CARD ANIMATIONS ====================
document.addEventListener('DOMContentLoaded', function() {
    const certCards = document.querySelectorAll('.certificate-card');
    
    certCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.2, 0.9, 0.3, 1)';
        });
    });
});

// ==================== MOBILE MENU TOGGLE (IF NEEDED) ====================
function createMobileMenu() {
    // Check if mobile and nav-links exist
    const navLinks = document.querySelector('.nav-links');
    const mainNav = document.querySelector('.main-nav');
    
    if (!navLinks || !mainNav) return;
    
    // Only add if screen is small
    if (window.innerWidth <= 800) {
        // Check if toggle doesn't already exist
        if (document.querySelector('.mobile-menu-toggle')) return;
        
        const toggle = document.createElement('button');
        toggle.className = 'mobile-menu-toggle';
        toggle.innerHTML = '<i class="fas fa-bars"></i>';
        toggle.style.background = 'transparent';
        toggle.style.border = '2px solid #61dafb';
        toggle.style.color = '#61dafb';
        toggle.style.fontSize = '1.5rem';
        toggle.style.padding = '0.5rem 1rem';
        toggle.style.borderRadius = '8px';
        toggle.style.cursor = 'pointer';
        toggle.style.marginLeft = '1rem';
        
        toggle.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.right = '5vw';
                navLinks.style.background = '#0b0f17';
                navLinks.style.padding = '1.5rem';
                navLinks.style.borderRadius = '16px';
                navLinks.style.border = '1px solid #61dafb40';
                navLinks.style.backdropFilter = 'blur(10px)';
                navLinks.style.zIndex = '1000';
            }
        });
        
        mainNav.appendChild(toggle);
        
        // Hide nav-links initially on mobile
        navLinks.style.display = 'none';
    }
}

// Initialize mobile menu on load and resize
document.addEventListener('DOMContentLoaded', createMobileMenu);
window.addEventListener('resize', () => {
    // Remove and re-create mobile menu based on screen size
    const existingToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth > 800) {
        if (existingToggle) existingToggle.remove();
        if (navLinks) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.background = 'transparent';
            navLinks.style.padding = '0';
            navLinks.style.border = 'none';
            navLinks.style.backdropFilter = 'none';
        }
    } else {
        if (!existingToggle) {
            createMobileMenu();
        }
    }
});

// ==================== PERFORMANCE OPTIMIZATIONS ====================
// Debounce scroll events for better performance
function debounce(func, wait = 10) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Replace scroll listeners with debounced versions
window.removeEventListener('scroll', revealOnScroll);
window.removeEventListener('scroll', highlightActiveNav);

const debouncedReveal = debounce(revealOnScroll, 10);
const debouncedHighlight = debounce(highlightActiveNav, 10);

window.addEventListener('scroll', debouncedReveal);
window.addEventListener('scroll', debouncedHighlight);

// ==================== INITIALIZATION LOG ====================
console.log('🚀 Satyajit Pathi portfolio script loaded successfully');
console.log('📅 Version: 2025.1');
