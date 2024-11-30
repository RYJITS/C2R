document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments
    const sidebarRight = document.querySelector('.sidebar-right');
    const closeButton = document.querySelector('.close-sidebar');
    
    // Gestionnaire de clic pour le bouton de fermeture
    closeButton.addEventListener('click', function() {
        sidebarRight.classList.remove('open');
        
        // Retirer la classe active de toutes les icônes
        document.querySelectorAll('.sidebar-icons li').forEach(icon => {
            icon.classList.remove('active');
        });
    });
    
    // Fermer la barre latérale avec la touche Échap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebarRight.classList.contains('open')) {
            closeButton.click();
        }
    });
});
