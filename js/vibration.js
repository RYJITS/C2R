// Version 2.0 - Sans bouton de test
// Fonction simple de vibration
function doVibrate() {
    // Pattern : vibrer 200ms, pause 100ms, vibrer 200ms
    navigator.vibrate([200, 100, 200]);
}

// Test si la vibration est supportée
if ('vibrate' in navigator) {
    console.log('La vibration est supportée');
} else {
    console.log('La vibration n\'est PAS supportée');
}

// Ajouter la vibration aux éléments cliquables
document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner tous les éléments cliquables
    const elements = document.querySelectorAll('.sidebar-icons li, .logo, button, .close-sidebar, .dot');
    
    elements.forEach(element => {
        ['touchstart', 'click'].forEach(eventType => {
            element.addEventListener(eventType, function(e) {
                e.preventDefault();
                doVibrate();
            });
        });
    });
});
