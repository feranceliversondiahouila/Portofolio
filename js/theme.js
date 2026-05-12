/* =====================================================
   theme.js — Gestion du thème clair / sombre
   Partagé par TOUTES les pages du portfolio.

   PROBLÈME RÉSOLU :
   Quand theme.js est chargé en bas de page (avant </body>),
   document.body existe déjà → on peut ajouter .dark directement.
   Quand il est chargé dans <head>, body n'existe pas encore →
   on utilise DOMContentLoaded.
   Dans les deux cas, ce script gère les deux situations.
   ===================================================== */


/* ── 1. Application immédiate du thème ──────────────
   On essaie d'abord directement (si body existe),
   sinon on attend DOMContentLoaded.                  */
function applyTheme() {
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
    /* Met à jour l'icône du bouton */
    var btn = document.getElementById('themeBtn');
    if (btn) btn.textContent = (savedTheme === 'dark') ? '☀️' : '🌙';
}

/* Si body est déjà disponible (script en bas de page) */
if (document.body) {
    applyTheme();
} else {
    /* Si script dans <head>, attendre que body existe */
    document.addEventListener('DOMContentLoaded', applyTheme);
}


/* ── 2. Bascule au clic ─────────────────────────────
   Appelée par onclick="toggleTheme()" sur le bouton  */
function toggleTheme() {
    var isDark = document.body.classList.toggle('dark');
    var btn    = document.getElementById('themeBtn');
    if (btn) btn.textContent = isDark ? '☀️' : '🌙';
    /* Sauvegarde → synchronise toutes les pages */
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
