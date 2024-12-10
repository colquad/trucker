import { writable } from 'svelte/store';

// Create a readable store with an initial value
export const _errorMessage = writable<string>('');

