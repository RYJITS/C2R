document.addEventListener('DOMContentLoaded', function() {
    const openingAnimation = document.querySelector('.opening-animation');
    
    // Animation de fondu après un court délai
    setTimeout(() => {
        if (openingAnimation) {
            openingAnimation.classList.add('fade-out');
            
            // Supprime l'élément après l'animation
            setTimeout(() => {
                openingAnimation.remove();
            }, 2000);
        }
    }, 500);
});
