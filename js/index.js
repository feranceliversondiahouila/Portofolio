/* =====================================================
   index.js — JavaScript de la page d'accueil
   Gère : menu burger, lien actif au scroll, typewriter
   Le thème est géré par theme.js (fichier séparé)
   ===================================================== */


/* ─────────────────────────────────────────────────────
   MENU BURGER (mobile)
   ───────────────────────────────────────────────────── */
const burger = document.querySelector('.burger');
const nav    = document.querySelector('.nav-links');

/* Ouvre le menu mobile */
function openMenu() {
    nav.classList.add('open');
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
}

/* Ferme le menu mobile */
function closeMenu() {
    nav.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
}

/* Bascule ouverture/fermeture */
function toggleMenu() {
    if (nav.classList.contains('open')) closeMenu();
    else openMenu();
}

burger.addEventListener('click', toggleMenu);

/* Ferme le menu au clic sur un lien */
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

/* Ferme le menu si clic à l'extérieur */
document.addEventListener('click', (e) => {
    const inside = nav.contains(e.target) || burger.contains(e.target);
    if (!inside && nav.classList.contains('open')) closeMenu();
});

/* Réinitialise au redimensionnement desktop */
window.addEventListener('resize', () => {
    if (window.innerWidth > 820) closeMenu();
});


/* ─────────────────────────────────────────────────────
   LIEN ACTIF AU SCROLL
   Met en surbrillance le lien correspondant à la section visible
   ───────────────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function activateLink() {
    const fromTop = window.scrollY + 150;
    sections.forEach(section => {
        const id     = section.id;
        const link   = document.querySelector('.nav-links a[href="#' + id + '"]');
        if (!link) return;
        const top    = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (fromTop >= top && fromTop < bottom) {
            navLinks.forEach(a => a.style.opacity = '0.7');
            link.style.opacity = '1';
        }
    });
}

window.addEventListener('scroll', activateLink);
activateLink(); /* Appel initial au chargement */


/* ─────────────────────────────────────────────────────
   TYPEWRITER
   Alterne les mots STAGE / ALTERNANCE / APPRENTISSAGE
   avec une animation d'écriture/effacement
   ───────────────────────────────────────────────────── */
const mots = [
    { mot: "STAGE",         article: ""  },
    { mot: "ALTERNANCE",    article: "E" },
    { mot: "APPRENTISSAGE", article: ""  },
];

const el        = document.getElementById("typewriter");
const articleEl = document.getElementById("article");
let motIndex  = 0;
let charIndex = 0;
let effacement = false;

function typewriter() {
    const { mot, article } = mots[motIndex];

    if (!effacement) {
        /* Phase d'écriture : ajoute une lettre à la fois */
        el.textContent        = mot.substring(0, charIndex + 1);
        articleEl.textContent = charIndex >= 0 ? article : "";
        charIndex++;

        if (charIndex === mot.length) {
            /* Mot complet : pause avant d'effacer */
            effacement = true;
            setTimeout(typewriter, 2500);
            return;
        }
        setTimeout(typewriter, 100);

    } else {
        /* Phase d'effacement : retire une lettre à la fois */
        charIndex--;
        el.textContent = mot.substring(0, charIndex);

        if (charIndex === 0) {
            /* Mot effacé : passe au mot suivant */
            effacement            = false;
            motIndex              = (motIndex + 1) % mots.length;
            articleEl.textContent = "";
            setTimeout(typewriter, 400);
            return;
        }
        setTimeout(typewriter, 60);
    }
}

/* Lancement de l'animation */
typewriter();
