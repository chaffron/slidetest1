/*
TODO: slide #targets with link and history management
TODO: JavaScript event triggering
*/

// slide map
const
	root = document.documentElement,
	win = {},
	slide = new Map(
		[ ...Array.from( document.getElementsByClassName('slide') )]
			.map(e => [e, null])
	);


// debounced window resize handler
let resizeDebounce;
window.addEventListener('resize', () => {
	clearTimeout(resizeDebounce);
	resizeDebounce = setTimeout(init, 300);
}, { passive: true });

// scroll event
window.addEventListener('scroll', scrollHandler, { passive: true });

// initialize
init();



// initialize
function init() {

	getDimensions();
	setTimeout(scrollHandler, 100);

}


// handle scrolling
function scrollHandler() {

	win.top = root.scrollTop;
	win.bottom = win.top + win.height;
	win.direction = Math.sign(win.top - win.topLast);

	slide.forEach((bound, s) => {

		if (!bound) return;

		// slide in view?
		const
			sl = s.classList,
			inProg = Math.max(0, Math.min(win.bottom, bound.bottom) - bound.top) / bound.height,
			inView = Math.max(0, Math.min(win.bottom, bound.bottom) - Math.max(win.top, bound.top)) / Math.min(win.height, bound.height),
			isVisible = inView > 0;

		// apply CSS custom properties
		s.style.setProperty('--inprog', inProg);
		s.style.setProperty('--inview', inView);
		root.style.setProperty('--progress', win.top / win.scrollHeight);

		// visibility change
		if (isVisible !== bound.isVisible) {

			if (isVisible) {
				sl.remove('iv0');
				sl.add('iv1');
			}
			else {
				sl.add('iv0');
				sl.remove('iv1');
			}

			bound.isVisible = isVisible;

		}

		// Apply .iv classes (In View)
		for (let iv = 0.1; iv <= 1; iv = iv + 0.1) {
			const c = 'iv' + Math.floor(iv * 100);
			if (inView >= iv) sl.add(c);
			else sl.remove(c);
		}

		// Apply .ip classes (In Progress)
		for (let ip = 0.1; ip <= 1; ip = ip + 0.1) {
			const c = 'ip' + Math.floor(ip * 100);
			if (inProg >= ip) sl.add(c);
			else sl.remove(c);
		}


	});

	win.topLast = win.top;

}


// fetch slide dimensions
function getDimensions() {

	win.top = root.scrollTop;
	win.topLast = win.top;
	win.direction = 0;
	win.height = root.clientHeight;
	win.bottom = win.top + win.height;
	win.scrollHeight = root.scrollHeight - win.height;

	const observer = new IntersectionObserver(entries => {

		// get bound information
		for (const entry of entries) {

			const bound = entry.boundingClientRect;

			slide.set(entry.target, {
				height: bound.height,
				top: win.top + bound.top,
				bottom: win.top + bound.bottom
			});

		}

		observer.disconnect();

	});

	slide.forEach((v, s) => {
		observer.observe(s);
	});

}
