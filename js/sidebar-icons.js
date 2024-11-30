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
                    activeIcon = this;
                }
            });
        });
    });
});
