document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments
    const icons = document.querySelectorAll('.sidebar-icons li');
    const sidebarRight = document.querySelector('.sidebar-right');
    const sections = document.querySelectorAll('.section');
    let activeIcon = null;

    // Fonction pour activer une section
    function activateSection(sectionId) {
        // Masquer toutes les sections
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Afficher la section sélectionnée
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.classList.add('active');
        }
    }
    
    // Masquer toutes les sections au démarrage
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Fonction pour réinitialiser la couleur de toutes les icônes
    function resetIconColors() {
        icons.forEach(icon => {
            const iconElement = icon.querySelector('i');
            iconElement.style.color = '#fff';
            iconElement.classList.remove('icon-pulse');
            iconElement.classList.remove('icon-bounce');
            iconElement.classList.remove('icon-wave');
            iconElement.classList.remove('icon-ripple');
            iconElement.classList.remove('icon-scale');
            iconElement.classList.remove('icon-elastic');
            iconElement.classList.remove('icon-bubble');
            iconElement.classList.remove('icon-elegant');
        });
    }

    // Gestionnaire d'événements pour chaque icône
    icons.forEach(icon => {
        // Gérer à la fois les clics et les événements tactiles
        ['click', 'touchstart'].forEach(eventType => {
            icon.addEventListener(eventType, function(e) {
                // Empêcher le double événement sur les appareils tactiles
                if (eventType === 'touchstart') {
                    e.preventDefault();
                }

                // Retirer la classe active de toutes les icônes
                icons.forEach(i => i.classList.remove('active'));
                
                // Ajouter la classe active à l'icône cliquée
                this.classList.add('active');
                
                // Récupérer l'ID de la section
                const sectionId = this.getAttribute('data-section');
                
                // Si la barre latérale est déjà ouverte avec cette section
                if (sidebarRight.classList.contains('open') && activeIcon === this) {
                    // Fermer la barre latérale
                    sidebarRight.classList.remove('open');
                    activeIcon = null;
                    // Masquer toutes les sections
                    sections.forEach(section => {
                        section.style.display = 'none';
                    });
                    // Réinitialiser toutes les icônes en blanc
                    resetIconColors();
                } else {
                    // Ouvrir la barre latérale avec la nouvelle section
                    sidebarRight.classList.add('open');
                    sections.forEach(section => {
                        section.style.display = 'none';
                    });
                    if (sectionId) {
                        const targetSection = document.getElementById(sectionId);
                        if (targetSection) {
                            targetSection.style.display = 'block';
                        }
                    }
                    // Réinitialiser d'abord toutes les icônes en blanc
                    resetIconColors();
                    // Colorer l'icône active en rouge et ajouter l'effet élégant
                    const iconElement = this.querySelector('i');
                    iconElement.style.color = '#ff1f1f';
                    iconElement.classList.add('icon-elegant');
                    activeIcon = this;
                }
            });
        });
    });

    // Écouter la fermeture de la barre latérale (si fermée par le X)
    sidebarRight.addEventListener('transitionend', function(e) {
        if (!this.classList.contains('open')) {
            resetIconColors();
        }
    });
});
