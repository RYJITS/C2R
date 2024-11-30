document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments
    const icons = document.querySelectorAll('.sidebar-icons li');
    const sidebarRight = document.querySelector('.sidebar-right');
    const sections = document.querySelectorAll('.section');
    
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
                
                // Ouvrir la barre latérale
                sidebarRight.classList.add('open');
                
                // Activer la section correspondante
                activateSection(sectionId);
            });
        });
    });
});
