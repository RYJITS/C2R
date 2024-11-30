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
    
    // Gestionnaire de clic pour chaque icône
    icons.forEach(icon => {
        icon.addEventListener('click', function() {
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
