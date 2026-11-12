
/* ============================================
   PORTAFOLIO — JAVASCRIPT ACCESIBLE
   WCAG 2.2
   ============================================ */

// Indicar que JavaScript está disponible
document.documentElement.classList.add('js');

// Detectar preferencia de movimiento reducido
const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
);


// ============================================
// 1. PANELES DESPLEGABLES
// ============================================

const triggers = document.querySelectorAll(
    'button[aria-controls]'
);

triggers.forEach((trigger) => {

    const panelId = trigger.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);

    if (!panel) return;

    // Estado inicial
    trigger.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
    panel.setAttribute('inert', '');

    trigger.addEventListener('click', () => {

        const isOpen =
            trigger.getAttribute('aria-expanded') === 'true';

        const shouldOpen = !isOpen;

        // Actualizar estado del botón
        trigger.setAttribute(
            'aria-expanded',
            String(shouldOpen)
        );

        // Actualizar estado del panel
        panel.setAttribute(
            'aria-hidden',
            String(!shouldOpen)
        );

        // Evitar que elementos de paneles cerrados
        // reciban el foco del teclado
        if (shouldOpen) {
            panel.removeAttribute('inert');
        } else {
            panel.setAttribute('inert', '');
        }

        // Cambiar nombre accesible del botón
        const originalLabel = trigger.dataset.openLabel;

        if (!originalLabel) {
            trigger.dataset.openLabel =
                trigger.getAttribute('aria-label') ||
                trigger.textContent.trim();
        }

        trigger.setAttribute(
            'aria-label',
            shouldOpen
                ? 'Cerrar ' + trigger.dataset.openLabel
                : trigger.dataset.openLabel
        );

        // Desplazamiento respetando movimiento reducido
        if (shouldOpen) {

            panel.scrollIntoView({
                behavior: reducedMotion.matches
                    ? 'auto'
                    : 'smooth',

                block: 'nearest'
            });

        }

    });

});


// ============================================
// 2. ANIMACIONES DE APARICIÓN
// ============================================

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add('is-visible');

                    observerInstance.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {

        observer.observe(element);

    });

} else {

    // Compatibilidad con navegadores antiguos
    revealElements.forEach((element) => {

        element.classList.add('is-visible');

    });

}


// ============================================
// 3. MOVIMIENTO REDUCIDO
// ============================================

function updateMotionPreference() {

    if (reducedMotion.matches) {

        revealElements.forEach((element) => {

            element.classList.add('is-visible');

        });

    }

}

updateMotionPreference();

reducedMotion.addEventListener?.(
    'change',
    updateMotionPreference
);


// ============================================
// 4. VALIDACIÓN DE IMÁGENES
// ============================================

document.querySelectorAll('.portfolio-image').forEach(
    (image) => {

        image.addEventListener('error', () => {

            image.classList.add('image-error');

            console.warn(
                'No se pudo cargar la imagen:',
                image.getAttribute('src')
            );

        });

    }
);
