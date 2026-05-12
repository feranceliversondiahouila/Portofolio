/* =====================================================
   pages.js — Scripts des pages secondaires
   (Administrer, Connecter, AC1-x, etc.)

   Contient :
   - toggleAccordion()  : ouvre/ferme les accordéons
   - Sauvegarde scroll  : mémorise la position avant navigation
   - Restauration       : revient exactement là où on était
   ===================================================== */


/* ─────────────────────────────────────────────────────
   1. ACCORDÉONS
   ───────────────────────────────────────────────────── */

function toggleAccordion(item) {
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.accordion-item').forEach(function(i) {
        i.classList.remove('active');
    });
    if (!isActive) {
        item.classList.add('active');
    }
}


/* ─────────────────────────────────────────────────────
   2. SAUVEGARDE DU SCROLL — pages secondaires
      (Administrer, Connecter, Sécuriser, etc.)
      Appelée quand on clique sur "Voir les détails"
   ───────────────────────────────────────────────────── */

function scrollKey() {
    return 'scroll:' + window.location.pathname;
}

function setupDetailLinks() {
    document.querySelectorAll('.dev a').forEach(function(link) {
        link.addEventListener('click', function() {
            sessionStorage.setItem(scrollKey(), window.scrollY);

            var items = document.querySelectorAll('.accordion-item');
            var openIndex = -1;
            items.forEach(function(item, idx) {
                if (item.classList.contains('active')) openIndex = idx;
            });
            sessionStorage.setItem(scrollKey() + ':accordion', openIndex);
        });
    });
}


/* ─────────────────────────────────────────────────────
   3. RESTAURATION DU SCROLL — pages secondaires
      Appelée au chargement de la page après retour
   ───────────────────────────────────────────────────── */

function restoreScrollAndAccordion() {
    var key = scrollKey();
    var savedY = sessionStorage.getItem(key);
    var savedAccIdx = sessionStorage.getItem(key + ':accordion');

    if (savedY === null) return;

    if (savedAccIdx !== null && parseInt(savedAccIdx) >= 0) {
        var items = document.querySelectorAll('.accordion-item');
        var targetItem = items[parseInt(savedAccIdx)];
        if (targetItem) {
            targetItem.classList.add('active');
        }
    }

    setTimeout(function() {
        window.scrollTo({ top: parseInt(savedY), behavior: 'instant' });
    }, 50);

    sessionStorage.removeItem(key);
    sessionStorage.removeItem(key + ':accordion');
}


/* ─────────────────────────────────────────────────────
   4. SCROLL INDEX — sauvegarde avant départ, restauration au retour
   ───────────────────────────────────────────────────── */

function saveIndexScroll() {
    sessionStorage.setItem('scroll:index', window.scrollY);
}

function restoreIndexScroll() {
    var saved = sessionStorage.getItem('scroll:index');
    if (saved === null) return;
    setTimeout(function() {
        window.scrollTo({ top: parseInt(saved), behavior: 'instant' });
    }, 50);
    sessionStorage.removeItem('scroll:index');
}


/* ─────────────────────────────────────────────────────
   5. INIT
   ───────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', function() {
    restoreScrollAndAccordion();
    setupDetailLinks();
});

/* Désactive la restauration de scroll native du navigateur
   pour qu'on ait le contrôle total via sessionStorage */
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
