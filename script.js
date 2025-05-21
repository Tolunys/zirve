// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Slider functionality
const slides = document.querySelectorAll('.slide');
const dots = document.querySelector('.slider-dots');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentSlide = 0;

// Create dots
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dots.appendChild(dot);
});

const dotElements = document.querySelectorAll('.dot');

function resetAnimations(slide) {
    const title = slide.querySelector('h2');
    const text = slide.querySelector('p');
    
    // Remove animation classes
    title.classList.remove('animate__animated', 'animate__fadeInDown');
    text.classList.remove('animate__animated', 'animate__fadeInUp', 'animate__delay-1s');
    
    // Force reflow
    void title.offsetWidth;
    void text.offsetWidth;
    
    // Add animation classes back
    title.classList.add('animate__animated', 'animate__fadeInDown');
    text.classList.add('animate__animated', 'animate__fadeInUp', 'animate__delay-1s');
}

function updateSlider() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        dotElements[index].classList.remove('active');
    });
    slides[currentSlide].classList.add('active');
    dotElements[currentSlide].classList.add('active');
    
    // Reset and trigger animations for the active slide
    resetAnimations(slides[currentSlide]);
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
}

// Add event listeners
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Auto slide
let slideInterval = setInterval(nextSlide, 5000);

// Pause auto slide on hover
const sliderContainer = document.querySelector('.slider-container');
sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
sliderContainer.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    } else {
        navbar.style.backgroundColor = 'white';
        navbar.style.boxShadow = 'none';
    }
}); 