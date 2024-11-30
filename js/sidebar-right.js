document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments
    const sidebarRight = document.querySelector('.sidebar-right');
    const closeButton = document.querySelector('.close-btn');
    const logoContainer = document.querySelector('.logo-container');
    const logoText = document.querySelector('.logo');
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    // Fonction pour gérer la rotation du logo sur mobile
    function handleLogoRotation() {
        if (isMobile && logoContainer.classList.contains('moved')) {
            if (sidebarRight.classList.contains('open')) {
                logoContainer.style.top = '50px';
                logoContainer.style.left = '3px';
                logoContainer.style.width = '55px';
                logoContainer.style.display = 'flex';
                logoContainer.style.justifyContent = 'center';
                logoContainer.style.alignItems = 'center';
                logoText.style.transform = 'rotate(-90deg)';
                logoText.style.transition = 'transform 0.5s ease';
                logoText.style.marginLeft = '2px';
            } else {
                logoContainer.style.top = '35px';
                logoContainer.style.left = '20px';
                logoContainer.style.width = 'auto';
                logoContainer.style.display = '';
                logoContainer.style.justifyContent = '';
                logoContainer.style.alignItems = '';
                logoText.style.transform = 'rotate(0deg)';
                logoText.style.marginLeft = '';
            }
        }
    }

    // Gestionnaire d'événements pour le bouton de fermeture
    ['click', 'touchstart'].forEach(eventType => {
        closeButton.addEventListener(eventType, function(e) {
            e.preventDefault();
            sidebarRight.classList.remove('open');
            
            // Retirer la classe active de toutes les icônes
            document.querySelectorAll('.sidebar-icons li').forEach(icon => {
                icon.classList.remove('active');
            });

            // Gérer la rotation du logo
            handleLogoRotation();
        });
    });
    
    // Gestionnaire pour l'ouverture de la barre latérale
    document.querySelectorAll('.sidebar-icons li').forEach(icon => {
        icon.addEventListener('click', function() {
            if (isMobile) {
                // Ajouter un petit délai pour laisser la barre latérale s'ouvrir
                setTimeout(() => {
                    if (sidebarRight.classList.contains('open')) {
                        handleLogoRotation();
                    }
                }, 50);
            }
        });
    });
    
    // Observer les changements de classe sur la barre latérale
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                handleLogoRotation();
            }
        });
    });
    
    observer.observe(sidebarRight, {
        attributes: true,
        attributeFilter: ['class']
    });
    
    // Fermer la barre latérale avec la touche Échap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebarRight.classList.contains('open')) {
            closeButton.click();
        }
    });

    // Empêcher la propagation des clics dans la barre latérale
    sidebarRight.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Gérer les changements de taille d'écran
    window.addEventListener('resize', function() {
        const newIsMobile = window.matchMedia('(max-width: 768px)').matches;
        if (newIsMobile !== isMobile) {
            location.reload();
        }
    });

    // Gestionnaire de formulaire
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animation du bouton
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.style.width = '50px';
            submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
            
            // Récupération des données du formulaire
            const formData = {
                name: this.querySelector('#name').value,
                email: this.querySelector('#email').value,
                message: this.querySelector('#message').value
            };
            
            // Ici vous pouvez ajouter votre logique d'envoi de formulaire
            // Par exemple, envoi à un serveur ou à une API
            
            // Simulation d'envoi (à remplacer par votre logique d'envoi réelle)
            setTimeout(() => {
                submitBtn.style.backgroundColor = '#4CAF50';
                submitBtn.innerHTML = '<i class="fas fa-check"></i>';
                
                // Réinitialisation du formulaire après 2 secondes
                setTimeout(() => {
                    submitBtn.style.width = '100%';
                    submitBtn.style.backgroundColor = '#ff1f1f';
                    submitBtn.innerHTML = 'Envoyer';
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }
});
