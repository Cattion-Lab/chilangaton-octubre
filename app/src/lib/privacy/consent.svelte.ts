const STORAGE_KEY = 'ruta-libre:consent';

function readStored(): boolean {
	try {
		return sessionStorage.getItem(STORAGE_KEY) === 'yes';
	} catch {
		return false;
	}
}

class Consent {
	accepted = $state(false);
	loaded = $state(false);

	load(): void {
		this.accepted = readStored();
		this.loaded = true;
	}

	accept(): void {
		this.accepted = true;
		try {
			sessionStorage.setItem(STORAGE_KEY, 'yes');
		} catch {}
	}

	revoke(): void {
		this.accepted = false;
		try {
			sessionStorage.removeItem(STORAGE_KEY);
		} catch {}
	}
}

export const consent = new Consent();
