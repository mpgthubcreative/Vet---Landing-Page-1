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

// Auto-activate card on scroll for mobile
function updateActiveCard() {
    if (window.innerWidth < 768 && servicesCarousel) {
        const containerCenter = servicesCarousel.scrollLeft + (servicesCarousel.clientWidth / 2);
        
        let closestCard = null;
        let closestDistance = Infinity;
        
        cards.forEach(card => {
            const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
            const distance = Math.abs(containerCenter - cardCenter);
            
            if (distance < closestDistance) {
                closestDistance = distance;
                closestCard = card;
            }
        });
        
        // Remove active from all cards
        cards.forEach(c => c.classList.remove('active'));
        
        // Add active to the centered card
        if (closestCard) {
            closestCard.classList.add('active');
        }
    }
}

// Listen to scroll events on the carousel
if (servicesCarousel) {
    servicesCarousel.addEventListener('scroll', updateActiveCard);
    // Initialize on load
    window.addEventListener('load', updateActiveCard);
    updateActiveCard();
}

// Card click interaction for mobile - allow clicking to manually activate
cards.forEach(card => {
    card.addEventListener('click', function(e) {
        // Only apply on mobile
        if (window.innerWidth < 768) {
            // Don't toggle if clicking the Book Now button directly
            if (e.target.classList.contains('card-book-button')) {
                return;
            }
            
            e.preventDefault();
            
            // Remove active from all cards
            cards.forEach(c => c.classList.remove('active'));
            
            // Add active to clicked card
            this.classList.add('active');
            
            // Scroll to center this card
            const cardLeft = this.offsetLeft;
            const cardWidth = this.offsetWidth;
            const containerWidth = servicesCarousel.clientWidth;
            const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);
            
            servicesCarousel.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    });
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
