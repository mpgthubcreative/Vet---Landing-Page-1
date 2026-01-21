// Services Carousel Navigation
const servicesCarousel = document.querySelector('.card-box');
const servicesPrevBtn = document.querySelector('.service-section .carousel-arrow.prev');
const servicesNextBtn = document.querySelector('.service-section .carousel-arrow.next');
const cards = document.querySelectorAll('.card');
let currentCardIndex = 0;

function scrollToCard(index) {
    if (!servicesCarousel || !cards[index]) return;
    
    const card = cards[index];
    const cardLeft = card.offsetLeft;
    const cardWidth = card.offsetWidth;
    const containerWidth = servicesCarousel.clientWidth;
    
    // Center the card in the viewport
    const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);
    
    servicesCarousel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
}

function updateServicesArrows() {
    if (!servicesPrevBtn || !servicesNextBtn || !servicesCarousel) return;
    
    const scrollLeft = servicesCarousel.scrollLeft;
    const maxScroll = servicesCarousel.scrollWidth - servicesCarousel.clientWidth;
    
    // Show only prev button when at the end
    if (scrollLeft >= maxScroll - 5) {
        servicesPrevBtn.style.display = 'flex';
        servicesNextBtn.style.display = 'none';
    }
    // Show only next button when at the beginning
    else if (scrollLeft <= 5) {
        servicesPrevBtn.style.display = 'none';
        servicesNextBtn.style.display = 'flex';
    }
    // Show both in the middle
    else {
        servicesPrevBtn.style.display = 'flex';
        servicesNextBtn.style.display = 'flex';
    }
}

if (servicesPrevBtn && servicesCarousel) {
    servicesPrevBtn.addEventListener('click', () => {
        currentCardIndex = Math.max(0, currentCardIndex - 1);
        scrollToCard(currentCardIndex);
        setTimeout(updateServicesArrows, 300);
    });
}

if (servicesNextBtn && servicesCarousel) {
    servicesNextBtn.addEventListener('click', () => {
        currentCardIndex = Math.min(cards.length - 1, currentCardIndex + 1);
        scrollToCard(currentCardIndex);
        setTimeout(updateServicesArrows, 300);
    });
}

// Update arrows on scroll
if (servicesCarousel) {
    servicesCarousel.addEventListener('scroll', updateServicesArrows);
    // Initialize arrow states on page load
    window.addEventListener('load', updateServicesArrows);
    updateServicesArrows();
}

// Testimonials Carousel Navigation
const testimonialsCarousel = document.querySelector('.testimonial-carousel');
const testimonialsPrevBtn = document.querySelector('.section-testimonial .testimonial-arrow.prev');
const testimonialsNextBtn = document.querySelector('.section-testimonial .testimonial-arrow.next');
const testimonialCards = document.querySelectorAll('.testimonial-card');
let currentTestimonialIndex = 0;

function scrollToTestimonial(index) {
    if (!testimonialsCarousel || !testimonialCards[index]) return;
    
    const card = testimonialCards[index];
    const cardLeft = card.offsetLeft;
    const cardWidth = card.offsetWidth;
    const containerWidth = testimonialsCarousel.clientWidth;
    
    const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);
    
    testimonialsCarousel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
}

function updateTestimonialsArrows() {
    if (!testimonialsPrevBtn || !testimonialsNextBtn || !testimonialsCarousel) return;
    
    const scrollLeft = testimonialsCarousel.scrollLeft;
    const maxScroll = testimonialsCarousel.scrollWidth - testimonialsCarousel.clientWidth;
    
    if (scrollLeft >= maxScroll - 5) {
        testimonialsPrevBtn.style.display = 'flex';
        testimonialsNextBtn.style.display = 'none';
    } else if (scrollLeft <= 5) {
        testimonialsPrevBtn.style.display = 'none';
        testimonialsNextBtn.style.display = 'flex';
    } else {
        testimonialsPrevBtn.style.display = 'flex';
        testimonialsNextBtn.style.display = 'flex';
    }
}

if (testimonialsPrevBtn && testimonialsCarousel) {
    testimonialsPrevBtn.addEventListener('click', () => {
        currentTestimonialIndex = Math.max(0, currentTestimonialIndex - 1);
        scrollToTestimonial(currentTestimonialIndex);
        setTimeout(updateTestimonialsArrows, 300);
    });
}

if (testimonialsNextBtn && testimonialsCarousel) {
    testimonialsNextBtn.addEventListener('click', () => {
        currentTestimonialIndex = Math.min(testimonialCards.length - 1, currentTestimonialIndex + 1);
        scrollToTestimonial(currentTestimonialIndex);
        setTimeout(updateTestimonialsArrows, 300);
    });
}

// Click on testimonial cards to center them
testimonialCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        currentTestimonialIndex = index;
        scrollToTestimonial(index);
        setTimeout(updateTestimonialsArrows, 300);
    });
});

// Update arrows on scroll
if (testimonialsCarousel) {
    testimonialsCarousel.addEventListener('scroll', updateTestimonialsArrows);
    window.addEventListener('load', updateTestimonialsArrows);
    updateTestimonialsArrows();
}

// Sticky Mobile CTA - Show/Hide based on Hero Section
const stickyCTA = document.querySelector('.sticky-mobile-cta');
const heroSection = document.querySelector('.hero-section');

if (stickyCTA && heroSection) {
    function toggleStickyCTA() {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        
        // Hide when in hero section, show when scrolled past
        if (heroBottom > 0) {
            stickyCTA.style.display = 'none';
        } else {
            stickyCTA.style.display = 'block';
        }
    }
    
    window.addEventListener('scroll', toggleStickyCTA);
    window.addEventListener('load', toggleStickyCTA);
    toggleStickyCTA();
}
