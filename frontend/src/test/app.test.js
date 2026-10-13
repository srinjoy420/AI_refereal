import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';

const frontendDirectory = fileURLToPath(new URL('../..', import.meta.url));
const { VITE_API_URL } = loadEnv('development', frontendDirectory, 'VITE_');

assert.ok(VITE_API_URL, 'VITE_API_URL must be set in frontend/.env');
console.log(`VITE_API_URL loaded: ${VITE_API_URL}`);
