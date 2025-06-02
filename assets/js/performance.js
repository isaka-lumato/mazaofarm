// Performance optimization script
(function() {
    'use strict';

    // Function to handle image loading
    function handleImageLoading() {
        // Lazy load images with Intersection Observer if supported
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        if (img.dataset.srcset) {
                            img.srcset = img.dataset.srcset;
                        }
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '200px 0px',
                threshold: 0.01
            });

            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        }


        // Handle background images
        const bgImages = document.querySelectorAll('[style*="background-image"]');
        bgImages.forEach(el => {
            const bgImage = el.style.backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (bgImage && bgImage[1]) {
                const img = new Image();
                img.src = bgImage[1];
                img.onload = function() {
                    el.classList.add('loaded');
                };
            }
        });
    }


    // Function to optimize WebFont loading
    function optimizeFonts() {
        // Load WebFonts with FontFaceObserver
        if ('fonts' in document) {
            const link = document.createElement('link');
            link.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap';
            link.rel = 'stylesheet';
            document.head.appendChild(link);

            // Load other non-critical fonts after page load
            window.addEventListener('load', function() {
                const fontLink = document.createElement('link');
                fontLink.href = 'https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap';
                fontLink.rel = 'stylesheet';
                document.head.appendChild(fontLink);
            });
        }
    }


    // Function to optimize animations
    function optimizeAnimations() {
        // Add loaded class to body when DOM is ready
        document.addEventListener('DOMContentLoaded', function() {
            document.body.classList.add('loaded');
        });

        // Initialize AOS (Animate On Scroll) if needed
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                mirror: false
            });
        }
    }


    // Initialize all optimizations
    function init() {
        handleImageLoading();
        optimizeFonts();
        optimizeAnimations();

        // Remove no-js class if it exists
        document.documentElement.classList.remove('no-js');
    }


    // Start optimizations when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Add loaded class to body when all assets are loaded
    window.addEventListener('load', function() {
        document.body.classList.add('fully-loaded');
        
        // Remove preloader
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.display = 'none';
        }
    });

})();
