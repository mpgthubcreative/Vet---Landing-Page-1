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

// Card interaction for mobile - toggle active state on click
cards.forEach(card => {
    card.addEventListener('click', function(e) {
        // Only apply toggle behavior on mobile
        if (window.innerWidth < 768) {
            // Don't toggle if clicking the Book Now button directly
            if (e.target.classList.contains('card-book-button')) {
                return;
            }
            
            e.preventDefault();
            
            // Toggle active class
            const isActive = this.classList.contains('active');
            
            // Remove active from all cards
            cards.forEach(c => c.classList.remove('active'));
            
            // Add active to clicked card if it wasn't active
            if (!isActive) {
                this.classList.add('active');
            }
        }
    });
});

// Close active card when clicking outside on mobile
document.addEventListener('click', function(e) {
    if (window.innerWidth < 768) {
        const isClickInsideCard = e.target.closest('.card');
        if (!isClickInsideCard) {
            cards.forEach(card => card.classList.remove('active'));
        }
    }
});

// Sticky Mobile CTA - Show/Hide based on Hero Section
const stickyCTA = document.querySelector('.sticky-mobile-cta');
const heroSection = document.querySelector('.hero-section');

if (stickyCTA && heroSection) {
    function toggleStickyCTA() {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        
        // Hide when in hero section, show when scrolled past
        if (heroBottom > 0) {
            stickyCTA.classList.add('hide');
            stickyCTA.classList.remove('show');
        } else {
            stickyCTA.classList.remove('hide');
            stickyCTA.classList.add('show');
        }
    }
    
    window.addEventListener('scroll', toggleStickyCTA);
    window.addEventListener('load', toggleStickyCTA);
    toggleStickyCTA();
}

// Service Card Mobile Touch/Click Interaction
cards.forEach(card => {
    // For mobile - toggle on click/touch
    card.addEventListener('click', function(e) {
        // Only toggle if not clicking the button
        if (!e.target.closest('.card-overlay-button')) {
            // Check if screen is mobile (less than 768px)
            if (window.innerWidth < 768) {
                // Close all other cards
                cards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('active');
                    }
                });
                // Toggle current card
                this.classList.toggle('active');
            }
        }
    });
});

// Close overlay when clicking outside on mobile
document.addEventListener('click', function(e) {
    if (window.innerWidth < 768) {
        if (!e.target.closest('.card')) {
            cards.forEach(card => {
                card.classList.remove('active');
            });
        }
    }
});
