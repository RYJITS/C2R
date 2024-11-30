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
    
    // Créer le bouton de test
    const testButton = document.createElement('button');
    testButton.innerHTML = 'Tester Vibration';
    testButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 10px 20px;
        background: red;
        color: white;
        border: none;
        border-radius: 5px;
        z-index: 9999;
    `;
    
    // Ajouter le gestionnaire d'événements au bouton
    testButton.addEventListener('touchstart', function(e) {
        e.preventDefault();
        doVibrate();
        console.log('Tentative de vibration...');
    });
    
    // Ajouter le bouton à la page
    document.body.appendChild(testButton);
});
