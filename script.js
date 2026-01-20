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
