console.log("Mlabs website loaded");

function enroll(){
alert("Enrollment system coming soon.");
}

// Smooth scrolling for navigation links (only for anchor links on the same page)
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
        // For links to other pages, allow normal navigation
    });
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add interactive hover effect to features
document.querySelectorAll('.feature').forEach(feature => {
    feature.addEventListener('mouseenter', () => {
        feature.style.transform = 'scale(1.05)';
        feature.style.transition = 'transform 0.3s';
    });
    feature.addEventListener('mouseleave', () => {
        feature.style.transform = 'scale(1)';
    });
});

// Scroll to top button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Founder image carousel with swipe support
const founderCarousel = document.getElementById('founderCarousel');
if (founderCarousel) {
    const track = founderCarousel.querySelector('.carousel-track');
    const slides = Array.from(track.querySelectorAll('.carousel-slide'));
    const prevBtn = founderCarousel.querySelector('.carousel-btn.prev');
    const nextBtn = founderCarousel.querySelector('.carousel-btn.next');
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    const updateCarousel = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        const showControls = slides.length > 1;
        prevBtn.style.display = showControls ? 'flex' : 'none';
        nextBtn.style.display = showControls ? 'flex' : 'none';
    };

    const showSlide = (index) => {
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }
        currentIndex = index;
        updateCarousel();
    };

    prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].clientX;
    });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
            showSlide(diff > 0 ? currentIndex + 1 : currentIndex - 1);
        }
    });

    updateCarousel();
}