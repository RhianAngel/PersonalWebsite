/* ================= NAVBAR (shared by every page) =================
   Edit the links HERE once and every page updates.
   Works when you open the files directly (no server needed). */

const NAV_LINKS = [
	{ label: 'HOME',      href: 'pagehome.html' },
	{ label: 'ABOUT ME',  href: 'pageabout.html' },
	{ label: 'PORTFOLIO', href: 'portfolio.html' },
	{ label: 'GALLERY',   href: 'gallery.html' },
	{ label: 'CONTACT',   href: 'contact.html' }
];

document.addEventListener('DOMContentLoaded', () => {

	// which page are we on?
	const here = location.pathname.split('/').pop() || 'index.html';

	const items = NAV_LINKS.map(l => {
		const current = (l.href === here) ? ' class="current" aria-current="page"' : '';
		return `<li><a href="${l.href}"${current}>${l.label}</a></li>`;
	}).join('');

	document.body.insertAdjacentHTML('afterbegin', `
		<nav class="navbar">
			<a href="perwebhome.html" class="logo"><img src="logo.png" alt="Rhian logo"></a>

			<button type="button" class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false" aria-controls="navLinks">
				<span></span><span></span><span></span>
			</button>

			<ul class="nav-links" id="navLinks">${items}</ul>
		</nav>
	`);

	const hamburger = document.getElementById('hamburger');
	const navLinks  = document.getElementById('navLinks');

	function setMenu(open){
		hamburger.classList.toggle('active', open);
		navLinks.classList.toggle('active', open);
		hamburger.setAttribute('aria-expanded', open);
	}

	hamburger.addEventListener('click', (e) => {
		e.stopPropagation();
		setMenu(!navLinks.classList.contains('active'));
	});

	// close after tapping a link
	navLinks.querySelectorAll('a').forEach(link => {
		link.addEventListener('click', () => setMenu(false));
	});

	// close when tapping outside the menu or pressing Escape
	document.addEventListener('click', (e) => {
		if (!e.target.closest('.navbar')) setMenu(false);
	});
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') setMenu(false);
	});

	// reset when the window grows past the phone size
	window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
		if (e.matches) setMenu(false);
	});
});
