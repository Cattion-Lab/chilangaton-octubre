export const MAX_MESSAGES = 12;
export const MAX_CHARS = 1000;

export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
	role: ChatRole;
	content: string;
}
