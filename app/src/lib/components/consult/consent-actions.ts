import { consent } from '#lib/privacy/consent.svelte.ts';

const DISMISS_KEY = 'ruta-libre:banner-dismissed';

function focusMain(): void {
	const main = document.getElementById('main');
	if (!main) return;
	if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1');
	main.style.outline = 'none';
	main.focus({ preventScroll: true });
}

export function acceptConsent(): void {
	consent.accept();
	document.documentElement.dataset.consent = 'yes';
	focusMain();
}

export function revokeConsent(): void {
	consent.revoke();
	delete document.documentElement.dataset.consent;
}

export function dismissBanner(): void {
	try {
		sessionStorage.setItem(DISMISS_KEY, 'yes');
	} catch {}
	document.documentElement.dataset.bannerDismissed = 'yes';
	focusMain();
}
