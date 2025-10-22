

// Custom Cursor (simplified)
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.follower = document.querySelector('.cursor-follower');
        this.links = document.querySelectorAll('a, button, .video-preview, .pricing__btn, .before-after-slider, .card');
        
        this.init();
    }
    
    init() {
        if (!this.cursor || !this.follower) return;
        
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                this.follower.style.left = e.clientX + 'px';
                this.follower.style.top = e.clientY + 'px';
            }, 0);
        });
        
        this.links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                this.follower.classList.add('hovered');
            });
            
            link.addEventListener('mouseleave', () => {
                this.follower.classList.remove('hovered');
            });
        });
    }
}

// Interactive Text Animation
class InteractiveText {
    constructor() {
        this.spansSlow = document.querySelectorAll('.spanSlow');
        this.spansFast = document.querySelectorAll('.spanFast');
        this.width = window.innerWidth;
        
        this.init();
    }
    
    init() {
        if (this.spansSlow.length === 0) return;
        
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        window.addEventListener('resize', () => this.handleWindowResize());
    }
    
    handleMouseMove(e) {
        let normalizedPosition = e.pageX / (this.width / 2) - 1;
        let speedSlow = 100 * normalizedPosition;
        let speedFast = 200 * normalizedPosition;
        
        this.spansSlow.forEach(span => {
            span.style.transform = `translate(${speedSlow}px)`;
        });
        
        this.spansFast.forEach(span => {
            span.style.transform = `translate(${speedFast}px)`;
        });
    }
    
    handleWindowResize() {
        this.width = window.innerWidth;
    }
}

// 3D Parallax Cards
class ParallaxCards {
    constructor() {
        this.cards = document.querySelectorAll('.card, .video-preview');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            // Add shine layer if it doesn't exist
            if (!card.querySelector('.shineLayer')) {
                const shineLayer = document.createElement('div');
                shineLayer.className = 'shineLayer';
                card.prepend(shineLayer);
            }
            
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
            card.addEventListener('mouseenter', (e) => this.handleMouseEnter(e, card));
            card.addEventListener('mouseleave', (e) => this.handleMouseLeave(e, card));
        });
    }
    
    handleMouseMove(event, card) {
        const rect = card.getBoundingClientRect();
        const mouseCoord = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
        
        // Cleanup coordinates
        mouseCoord.x = Math.max(0, Math.min(rect.width, mouseCoord.x));
        mouseCoord.y = Math.max(0, Math.min(rect.height, mouseCoord.y));
        
        // Card transformation
        let transformCard = "scale3d(1.08, 1.08, 1.08) perspective(700px)";
        transformCard += " rotateX(" + (((mouseCoord.y / rect.height) * 18) - 9) + "deg)";
        transformCard += " rotateY(" + (((mouseCoord.x / rect.width) * 26) - 13) * -1 + "deg)";
        transformCard += " translateX(" + (((mouseCoord.x / rect.width) * 6) - 3) + "px)";
        transformCard += " translateY(" + (((mouseCoord.y / rect.height) * 10) - 5) + "px)";
        
        card.style.transform = transformCard;
        
        // Image and Video transformation
        const cardMedia = card.querySelector('img, video');
        if (cardMedia) {
            let transformCardMedia = "rotateX(" + (((mouseCoord.y / rect.height) * 10) - 5) * -1 + "deg)";
            transformCardMedia += " rotateY(" + (((mouseCoord.x / rect.width) * 26) - 13) * -1 + "deg)";
            cardMedia.style.transform = transformCardMedia;
        }
        
        // Shine layer
        const shineLayer = card.querySelector('.shineLayer');
        if (shineLayer) {
            const backgroundShineLayerOpacity = ((mouseCoord.y / rect.height) * 0.3) + 0.1;
            const backgroundShineLayerDegree = (Math.atan2(mouseCoord.y - (rect.height / 2), mouseCoord.x - (rect.width / 2)) * 180 / Math.PI) - 90;
            const adjustedDegree = backgroundShineLayerDegree < 0 ? backgroundShineLayerDegree + 360 : backgroundShineLayerDegree;
            const backgroundShineLayer = `linear-gradient(${adjustedDegree}deg, rgba(255,255,255,${backgroundShineLayerOpacity}) 0%, rgba(255,255,255,0) 80%)`;
            shineLayer.style.background = backgroundShineLayer;
        }
    }
    
    handleMouseEnter(event, card) {
        this.cards.forEach(c => c.classList.add('blur'));
        card.classList.remove('blur');
    }
    
    handleMouseLeave(event, card) {
        card.style.transform = "scale3d(1, 1, 1)";
        
        const cardMedia = card.querySelector('img, video');
        if (cardMedia) {
            cardMedia.style.transform = "";
        }
        
        const shineLayer = card.querySelector('.shineLayer');
        if (shineLayer) {
            shineLayer.style.background = "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 80%)";
        }
        
        this.cards.forEach(c => c.classList.remove('blur'));
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        const scrollLinks = document.querySelectorAll('[data-scroll]');
        
        scrollLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-scroll');
                const target = document.getElementById(targetId);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for header height
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Header Scroll Effects
class HeaderEffects {
    constructor() {
        this.header = document.querySelector('.header');
        this.init();
    }
    
    init() {
        if (!this.header) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        });
    }
}

// Enhanced Scroll Animations
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.animate-on-scroll, .slide-in-left, .slide-in-right, .slide-in-up');
        this.init();
    }
    
    init() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Handle staggered animations
                    const element = entry.target;
                    
                    // Add animated class for all animation types
                    element.classList.add('animated');
                    
                    // Handle staggered elements in containers
                    const container = element.closest('.pricing__cards, .contact__content');
                    if (container) {
                        const staggerElements = container.querySelectorAll('.stagger-1, .stagger-2, .stagger-3, .stagger-4');
                        staggerElements.forEach((staggerEl, index) => {
                            if (!staggerEl.classList.contains('animated')) {
                                setTimeout(() => {
                                    staggerEl.classList.add('animated');
                                }, index * 100);
                            }
                        });
                    }
                }
            });
        }, options);
        
        this.elements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Before/After Sliders
class BeforeAfterSlider {
    constructor() {
        this.sliders = document.querySelectorAll('.before-after-slider');
        this.init();
    }
    
    init() {
        this.sliders.forEach(slider => {
            const afterImage = slider.querySelector('.after-image');
            const handle = slider.querySelector('.slider-handle');
            let isDragging = false;
            
            const updateSlider = (clientX) => {
                const rect = slider.getBoundingClientRect();
                const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
                
                afterImage.style.clipPath = `polygon(${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%)`;
                handle.style.left = `${percentage}%`;
            };
            
            // Mouse events
            slider.addEventListener('mousedown', (e) => {
                isDragging = true;
                updateSlider(e.clientX);
            });
            
            document.addEventListener('mousemove', (e) => {
                if (isDragging) {
                    updateSlider(e.clientX);
                }
            });
            
            document.addEventListener('mouseup', () => {
                isDragging = false;
            });
            
            // Touch events for mobile
            slider.addEventListener('touchstart', (e) => {
                isDragging = true;
                updateSlider(e.touches[0].clientX);
            });
            
            document.addEventListener('touchmove', (e) => {
                if (isDragging) {
                    e.preventDefault();
                    updateSlider(e.touches[0].clientX);
                }
            });
            
            document.addEventListener('touchend', () => {
                isDragging = false;
            });
        });
    }
}

// Video Previews with Enhanced Parallax
class VideoPreview {
    constructor() {
        this.videos = document.querySelectorAll('.video-preview');
        this.init();
    }
    
    init() {
        this.videos.forEach(videoContainer => {
            const video = videoContainer.querySelector('video');
            const overlay = videoContainer.querySelector('.play-overlay');
            
            if (!video) return;
            
            // Video play/pause functionality
            videoContainer.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    if (overlay) overlay.style.opacity = '0';
                } else {
                    video.pause();
                    if (overlay) overlay.style.opacity = '1';
                }
            });
            
            video.addEventListener('ended', () => {
                if (overlay) overlay.style.opacity = '1';
            });
            
            // Ensure video containers maintain aspect ratio during transforms
            video.addEventListener('loadedmetadata', () => {
                video.style.transformOrigin = 'center center';
            });
        });
    }
}

// Form Validation
class FormValidation {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);
            
            if (this.validateForm(data)) {
                this.submitForm(data);
            }
        });
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearError(input);
            });
        });
    }
    
    validateForm(data) {
        let isValid = true;
        
        // Name validation
        if (!data.name || data.name.trim().length < 2) {
            this.showError('name', 'Имя должно содержать минимум 2 символа');
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            this.showError('email', 'Введите корректный email адрес');
            isValid = false;
        }
        
        // Phone validation (optional but if provided should be valid)
        if (data.phone && data.phone.trim().length > 0) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(data.phone)) {
                this.showError('phone', 'Введите корректный номер телефона');
                isValid = false;
            }
        }
        
        // Message validation
        if (!data.message || data.message.trim().length < 10) {
            this.showError('message', 'Сообщение должно содержать минимум 10 символов');
            isValid = false;
        }
        
        return isValid;
    }
    
    validateField(input) {
        const value = input.value.trim();
        const name = input.name;
        
        switch (name) {
            case 'name':
                if (value.length < 2) {
                    this.showError(name, 'Имя должно содержать минимум 2 символа');
                    return false;
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    this.showError(name, 'Введите корректный email адрес');
                    return false;
                }
                break;
                
            case 'phone':
                if (value.length > 0) {
                    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
                    if (!phoneRegex.test(value)) {
                        this.showError(name, 'Введите корректный номер телефона');
                        return false;
                    }
                }
                break;
                
            case 'message':
                if (value.length < 10) {
                    this.showError(name, 'Сообщение должно содержать минимум 10 символов');
                    return false;
                }
                break;
        }
        
        this.clearError(input);
        return true;
    }
    
    showError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const errorElement = field.parentElement.querySelector('.error-message');
        
        field.style.borderColor = '#ff4444';
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    clearError(input) {
        const errorElement = input.parentElement.querySelector('.error-message');
        
        input.style.borderColor = 'rgba(224, 224, 224, 0.2)';
        errorElement.style.display = 'none';
    }
    
    submitForm(data) {
        // Simulate form submission
        const submitBtn = this.form.querySelector('.contact__submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        // Here you would normally send the data to your server
        // For now, we'll just simulate a successful submission
        setTimeout(() => {
            alert('Сообщение отправлено! Я свяжусь с вами в ближайшее время.');
            this.form.reset();
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
        
        // Example of how you might send data to a PHP script:
        /*
        fetch('send_email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Сообщение отправлено!');
                this.form.reset();
            } else {
                alert('Ошибка при отправке сообщения.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ошибка при отправке сообщения.');
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
        */
    }
}

// Pricing Buttons
class PricingButtons {
    constructor() {
        this.buttons = document.querySelectorAll('.pricing__btn');
        this.init();
    }
    
    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Get the service type from the card title
                const card = button.closest('.pricing__card');
                const serviceTitle = card.querySelector('h3').textContent;
                
                // Scroll to contact section and pre-fill the message
                const contactSection = document.getElementById('contact');
                const messageField = document.getElementById('message');
                
                if (contactSection && messageField) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                    
                    setTimeout(() => {
                        messageField.value = `Здравствуйте! Меня интересует услуга: ${serviceTitle}. `;
                        messageField.focus();
                    }, 1000);
                }
            });
        });
    }
}

// Parallax Effect
class ParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('.background-animation');
        this.init();
    }
    
    init() {
        if (window.innerWidth <= 768) return; // Disable on mobile for performance
        
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            
            this.elements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const speed = 0.5;
                
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const yPos = -(scrollY - element.offsetTop) * speed;
                    element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                }
            });
        });
    }
}

// Glitch Text Effects Manager
class GlitchTextManager {
    constructor() {
        this.glitchElements = document.querySelectorAll('.glitch-text[data-text]');
        this.init();
    }
    
    init() {
        // Initialize glitch effects
        this.glitchElements.forEach(element => {
            // Ensure proper positioning
            element.style.position = 'relative';
            element.style.display = 'inline-block';
            
            // Add random animation delays for variety
            const randomDelay = Math.random() * 2;
            element.style.animationDelay = randomDelay + 's';
        });
    }
}

// VANTA.js Background Effects
class VantaBackgrounds {
    constructor() {
        this.effects = {};
        this.init();
    }
    
    init() {
        // Wait for VANTA libraries to load
        this.waitForVanta(() => {
            this.initHeroBackground();
            this.initPortfolioBackground();
            this.initContactBackground();
        });
    }
    
    waitForVanta(callback) {
        if (typeof VANTA !== 'undefined' && VANTA.FOG) {
            callback();
        } else {
            setTimeout(() => this.waitForVanta(callback), 100);
        }
    }
    


    
    initHeroBackground() {
        const heroBg = document.getElementById('hero-vanta-bg');
        if (heroBg && VANTA.FOG) {
            try {
                // Ensure the background element is properly positioned
                heroBg.style.position = 'absolute';
                heroBg.style.top = '0';
                heroBg.style.left = '0';
                heroBg.style.width = '100%';
                heroBg.style.height = '100%';
                heroBg.style.zIndex = '-1';
                heroBg.style.pointerEvents = 'none';
                
                this.effects.hero = VANTA.FOG({
                    el: heroBg,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    highlightColor: 0x2f2f2f,
                    midtoneColor: 0x290a4d,
                    lowlightColor: 0x140d37,
                    baseColor: 0x0
                });
            } catch (error) {
                console.log('VANTA FOG effect could not be initialized for Hero:', error);
            }
        }
    }
    
    initPortfolioBackground() {
        const portfolioBg = document.getElementById('portfolio-vanta-bg');
        if (portfolioBg && VANTA.FOG) {
            try {
                // Ensure the background element is properly positioned
                portfolioBg.style.position = 'absolute';
                portfolioBg.style.top = '0';
                portfolioBg.style.left = '0';
                portfolioBg.style.width = '100%';
                portfolioBg.style.height = '100%';
                portfolioBg.style.zIndex = '-1';
                portfolioBg.style.pointerEvents = 'none';
                
                this.effects.portfolio = VANTA.FOG({
                    el: portfolioBg,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    highlightColor: 0x786666,
                    midtoneColor: 0x45157d,
                    lowlightColor: 0x211270,
                    baseColor: 0x0
                });
            } catch (error) {
                console.log('VANTA FOG effect could not be initialized for Portfolio:', error);
            }
        }
    }
    
    initContactBackground() {
        const contactBg = document.getElementById('contact-vanta-bg');
        if (contactBg && VANTA.FOG) {
            try {
                // Ensure the background element is properly positioned
                contactBg.style.position = 'absolute';
                contactBg.style.top = '0';
                contactBg.style.left = '0';
                contactBg.style.width = '100%';
                contactBg.style.height = '100%';
                contactBg.style.zIndex = '-1';
                contactBg.style.pointerEvents = 'none';
                
                this.effects.contact = VANTA.FOG({
                    el: contactBg,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    highlightColor: 0x2f2f2f,
                    midtoneColor: 0x290a4d,
                    lowlightColor: 0x140d37,
                    baseColor: 0x0
                });
            } catch (error) {
                console.log('VANTA FOG effect could not be initialized for Contact:', error);
            }
        }
    }
    
    destroy() {
        Object.values(this.effects).forEach(effect => {
            if (effect && typeof effect.destroy === 'function') {
                effect.destroy();
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new CustomCursor();
    new InteractiveText();
    new ParallaxCards();
    new SmoothScroll();
    new HeaderEffects();
    new ScrollAnimations();
    new EnhancedScrollObserver();
    new BeforeAfterSlider();
    new VideoPreview();
    new FormValidation();
    new PricingButtons();
    new ParallaxEffect();
    new GlitchTextManager();
    
    // Initialize VANTA backgrounds
    new VantaBackgrounds();
    
    // Add loading animation complete class
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Handle window resize
window.addEventListener('resize', throttle(() => {
    // Reinitialize interactive text on resize
    const interactiveText = new InteractiveText();
    
    // Recalculate parallax elements if needed
    const cards = document.querySelectorAll('.card, .video-preview');
    cards.forEach(card => {
        // Reset transforms on resize to avoid layout issues
        card.style.transform = 'scale3d(1, 1, 1)';
        const media = card.querySelector('img, video');
        if (media) {
            media.style.transform = '';
        }
    });
}, 250));

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced scroll animation observer with stagger support
class EnhancedScrollObserver {
    constructor() {
        this.observedElements = new Set();
        this.init();
    }
    
    init() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.observedElements.has(entry.target)) {
                    this.animateElement(entry.target);
                    this.observedElements.add(entry.target);
                }
            });
        }, options);
        
        // Observe all animation elements
        const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up, .animate-on-scroll');
        elements.forEach(element => {
            observer.observe(element);
        });
    }
    
    animateElement(element) {
        // Add stagger delay if specified
        let delay = 0;
        if (element.classList.contains('stagger-1')) delay = 100;
        else if (element.classList.contains('stagger-2')) delay = 200;
        else if (element.classList.contains('stagger-3')) delay = 300;
        else if (element.classList.contains('stagger-4')) delay = 400;
        
        setTimeout(() => {
            element.classList.add('animated');
        }, delay);
    }
}

// Example PHP script content for contact form (send_email.php):
/*
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $name = filter_var($input['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
    $phone = filter_var($input['phone'], FILTER_SANITIZE_STRING);
    $message = filter_var($input['message'], FILTER_SANITIZE_STRING);
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email']);
        exit;
    }
    
    // Your email settings
    $to = 'your-email@example.com';
    $subject = 'New Contact Form Submission from ' . $name;
    
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n\n";
    $email_content .= "Message:\n$message\n";
    
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    if (mail($to, $subject, $email_content, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to send email']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
*/