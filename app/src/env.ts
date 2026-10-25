import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	ANTHROPIC_API_KEY: { schema: (value) => value || undefined },
	CHAT_MODEL: { schema: (value) => value || undefined },
	GOOGLE_ROUTES_KEY: {},
	PUBLIC_GOOGLE_MAPS_KEY: { public: true },
	PUBLIC_GOOGLE_MAP_ID: { public: true },
	SUPABASE_URL: { schema: (value) => value || undefined },
	SUPABASE_PUBLISHABLE_KEY: { schema: (value) => value || undefined }
});
