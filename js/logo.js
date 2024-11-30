document.addEventListener('DOMContentLoaded', () => {
    const logoContainer = document.querySelector('.logo-container');
    const logo = document.querySelector('.logo');
    const background = document.querySelector('.logo-background');
    let isLogoMoved = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let animationFrame;
    let time = 0;
    let isHovering = false;
    let textHoverEffect = false;
    let textHoverAngle = 0;
    let isTouching = false;
    let touchTimeout = null;

    // Fonction pour initialiser tous les événements après l'animation
    function initializeEvents() {
        // Événements tactiles pour le background
        background.addEventListener('touchstart', handleTouch, { passive: false });
        background.addEventListener('touchmove', handleTouch, { passive: false });
        background.addEventListener('touchend', handleTouchEnd);
        background.addEventListener('touchcancel', handleTouchEnd);

        // Événements souris pour le background
        background.addEventListener('mousemove', (e) => handleInteraction(e.clientX, e.clientY));
        background.addEventListener('mouseleave', handleTouchEnd);

        // Événements pour le logo
        logo.addEventListener('click', toggleLogo);
        logo.addEventListener('touchend', toggleLogo, { passive: false });
        
        logo.addEventListener('mousemove', (e) => {
            if (!isLogoMoved) {
                isHovering = true;
                textHoverEffect = true;
                handleInteraction(e.clientX, e.clientY);
            }
        });

        logo.addEventListener('mouseenter', () => {
            if (!isLogoMoved) {
                isHovering = true;
                textHoverEffect = true;
                const rect = logo.getBoundingClientRect();
                handleInteraction(rect.left + rect.width / 2, rect.top + rect.height / 2);
            }
        });

        logo.addEventListener('mouseleave', () => {
            textHoverEffect = false;
            if (!background.matches(':hover')) {
                isHovering = false;
                lastMouseX = null;
                lastMouseY = null;
            }
        });
    }

    // Fonction pour gérer les événements tactiles et souris
    function handleInteraction(x, y) {
        if (isLogoMoved) return;
        lastMouseX = x;
        lastMouseY = y;

        if (!animationFrame) {
            animationFrame = requestAnimationFrame(updateDots);
        }
    }

    // Gestion des événements tactiles
    function handleTouch(e) {
        e.preventDefault();
        const touch = e.touches[0];
        if (touch) {
            isTouching = true;
            handleInteraction(touch.clientX, touch.clientY);

            // Vérifier si le touch est sur le logo
            const logoRect = logo.getBoundingClientRect();
            if (touch.clientX >= logoRect.left && 
                touch.clientX <= logoRect.right && 
                touch.clientY >= logoRect.top && 
                touch.clientY <= logoRect.bottom) {
                textHoverEffect = true;
            } else {
                textHoverEffect = false;
            }

            // Clear existing timeout
            if (touchTimeout) {
                clearTimeout(touchTimeout);
            }
        }
    }

    function handleTouchEnd(e) {
        // Mettre un petit délai avant de réinitialiser pour une meilleure expérience
        touchTimeout = setTimeout(() => {
            isTouching = false;
            textHoverEffect = false;
            lastMouseX = null;
            lastMouseY = null;
        }, 100);

        // Si c'était un tap sur le logo, gérer le clic
        if (e.target === logo || e.target.closest('.logo')) {
            toggleLogo(e);
        }
    }

    // Création des points en cercle parfait
    function createDots() {
        const numberOfCircles = 10;
        const dotsPerCircle = 40;
        const maxRadius = 150;
        
        for (let circle = 0; circle < numberOfCircles; circle++) {
            const radius = (maxRadius / numberOfCircles) * (circle + 1);
            
            for (let i = 0; i < dotsPerCircle; i++) {
                const angle = (i / dotsPerCircle) * 2 * Math.PI;
                const dot = document.createElement('div');
                dot.className = 'dot';
                
                const x = Math.cos(angle) * radius + maxRadius;
                const y = Math.sin(angle) * radius + maxRadius;
                
                dot.style.left = x + 'px';
                dot.style.top = y + 'px';
                dot.dataset.radius = radius;
                dot.dataset.angle = angle;
                dot.dataset.baseX = x;
                dot.dataset.baseY = y;
                
                background.appendChild(dot);
            }
        }
    }

    function updateDots() {
        time += 0.05;
        textHoverAngle += 0.03;
        
        const rect = background.getBoundingClientRect();
        const mouseX = lastMouseX - rect.left;
        const mouseY = lastMouseY - rect.top;
        let activeDotsCount = 0;
        
        const dots = background.querySelectorAll('.dot');
        dots.forEach(dot => {
            const baseX = parseFloat(dot.dataset.baseX);
            const baseY = parseFloat(dot.dataset.baseY);
            const radius = parseFloat(dot.dataset.radius);
            const angle = parseFloat(dot.dataset.angle);
            
            let x = baseX;
            let y = baseY;
            
            if ((textHoverEffect || isTouching) && (mouseX && mouseY)) {
                const touchCenterX = isTouching ? mouseX : 150;
                const touchCenterY = isTouching ? mouseY : 150;
                
                const distanceFromCenter = Math.sqrt(
                    Math.pow(baseX - touchCenterX, 2) + 
                    Math.pow(baseY - touchCenterY, 2)
                );
                
                const waveOffset = Math.sin(distanceFromCenter / 20 - textHoverAngle) * 15;
                const rotationAngle = textHoverAngle + angle;
                
                x += Math.cos(rotationAngle) * waveOffset;
                y += Math.sin(rotationAngle) * waveOffset;
                
                const scale = 1 + Math.sin(distanceFromCenter / 20 - textHoverAngle) * 0.5;
                dot.style.transform = `translate(${x - baseX}px, ${y - baseY}px) scale(${scale})`;
                dot.classList.add('active');
                dot.classList.remove('hover');
                activeDotsCount++;
            } else if (mouseX && mouseY) {
                const distance = Math.sqrt(
                    Math.pow(mouseX - baseX, 2) + 
                    Math.pow(mouseY - baseY, 2)
                );
                
                const waveDistance = 120;
                if (distance < waveDistance) {
                    activeDotsCount++;
                    const waveScale = Math.sin((distance / waveDistance) * Math.PI + time) * 1.5;
                    const mouseScale = (1 - distance / waveDistance) * 3;
                    const finalScale = waveScale * mouseScale;
                    
                    const angleToMouse = Math.atan2(mouseY - baseY, mouseX - baseX);
                    const pushStrength = (1 - distance / waveDistance) * 20;
                    x += Math.cos(angleToMouse) * pushStrength;
                    y += Math.sin(angleToMouse) * pushStrength;
                    
                    const rotationRadius = 5;
                    x += Math.cos(time + angle) * rotationRadius;
                    y += Math.sin(time + angle) * rotationRadius;
                    
                    dot.classList.add('active');
                    dot.classList.remove('hover');
                    dot.style.transform = `translate(${x - baseX}px, ${y - baseY}px) scale(${1 + finalScale})`;
                } else {
                    dot.classList.remove('active');
                    if (isHovering || textHoverEffect) {
                        dot.classList.add('hover');
                    } else {
                        dot.classList.remove('hover');
                    }
                    const idleScale = Math.sin(time + radius / 20) * 0.3 + 1;
                    const idleX = Math.cos(time + angle) * 2;
                    const idleY = Math.sin(time + angle) * 2;
                    dot.style.transform = `translate(${idleX}px, ${idleY}px) scale(${idleScale})`;
                }
            } else {
                dot.classList.remove('active');
                dot.classList.remove('hover');
                const idleScale = Math.sin(time + radius / 20) * 0.3 + 1;
                const idleX = Math.cos(time + angle) * 2;
                const idleY = Math.sin(time + angle) * 2;
                dot.style.transform = `translate(${idleX}px, ${idleY}px) scale(${idleScale})`;
            }
        });

        if (activeDotsCount > dots.length * 0.1) {
            if (!isHovering) {
                isHovering = true;
            }
        } else {
            if (isHovering) {
                isHovering = false;
            }
        }

        animationFrame = requestAnimationFrame(updateDots);
    }

    // Gestion du clic et du tap sur le logo
    function toggleLogo(e) {
        e.preventDefault();
        if (!isLogoMoved) {
            logoContainer.classList.add('moved');
            document.body.classList.add('content-visible');
            isLogoMoved = true;
            textHoverEffect = false;
            
            // Arrêter l'animation
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
                animationFrame = null;
            }

            // Redémarrer l'animation après 100ms
            setTimeout(() => {
                lastMouseX = null;
                lastMouseY = null;
                animationFrame = requestAnimationFrame(updateDots);
            }, 100);
        } else {
            // Réinitialiser toutes les propriétés de style inline
            logoContainer.style.top = '';
            logoContainer.style.left = '';
            logoContainer.style.width = '';
            logoContainer.style.display = '';
            logoContainer.style.justifyContent = '';
            logoContainer.style.alignItems = '';
            
            // Réinitialiser les propriétés du texte
            logo.style.transform = '';
            logo.style.transition = '';
            logo.style.marginLeft = '';
            
            // Retirer les classes
            logoContainer.classList.remove('moved');
            document.body.classList.remove('content-visible');
            isLogoMoved = false;
            
            if (!animationFrame) {
                animationFrame = requestAnimationFrame(updateDots);
            }
        }
    }

    // Initialisation
    createDots();
    initializeEvents();
    requestAnimationFrame(updateDots);
});
