document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.getElementById('intro-overlay');
    const mainContent = document.getElementById('main-content');
    const heroElements = document.querySelectorAll('.animate-on-load');
    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    
    // Sound effects
    const shingSound = document.getElementById('shing-sound');
    const slashSound = document.getElementById('slash-sound');

    // --- Katana Intro Logic ---
    function runIntro() {
        // Prevent body scrolling during intro
        document.body.classList.add('intro-active');

        // Play the shing sound as the katana slides in
        setTimeout(() => {
            shingSound.play();
        }, 200);

        // Play the slash sound at the exact moment of the slash
        setTimeout(() => {
            slashSound.play();
        }, 1300);

        // 1. Add class to start the SVG animations
        document.body.classList.add('intro-animate');

        // 2. After animations, fade out the overlay
        setTimeout(() => {
            introOverlay.style.opacity = '0';
            introOverlay.style.pointerEvents = 'none';
        }, 3500); // Increased time for the new animation sequence

        // 3. After overlay fades, show the main content
        setTimeout(() => {
            mainContent.style.opacity = '1';
            document.body.classList.remove('intro-active');
            
            // Trigger hero content animation
            heroElements.forEach(el => {
                el.classList.add('is-visible');
            });
        }, 4000); // Delayed to sync with overlay fade-out
    }

    // Start the intro once the window is loaded
    window.addEventListener('load', runIntro);


    // --- Parallax Effect for Hero Background (Unchanged) ---
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        if (hero) { // Check if hero element exists
            hero.style.backgroundPositionY = scrollPosition * 0.7 + 'px';
        }
    });


    // --- Intersection Observer for Scroll Animations (Unchanged) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    scrollElements.forEach(element => {
        observer.observe(element);
    });
});