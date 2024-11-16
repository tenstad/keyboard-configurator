import keycodes_basic from './keycodes/keycodes_basic.js';
import keycodes_norwegian from './keycodes/keycodes_norwegian.js';
import keycodes_us from './keycodes/keycodes_us.js';

type KeyCode = {
	key: string; // Keycode such as 'KC_ENT' or 'NO_A'
	label: string; // Label such as 'A' or 'Spacebar'
	sendKey: string | undefined; // Actual keycode to send for custom language key
	fullKey: string | undefined; // Full name of key, as key may be an alias
};

let keys: { [_: string]: KeyCode } = Object.fromEntries(
	[
		...Object.entries(keycodes_norwegian).map(([sendKey, { key, label }]) => ({
			key,
			label,
			sendKey
		})),
		...Object.entries(keycodes_us).map(([sendKey, { key, label }]) => ({
			key,
			label,
			sendKey
		})),
		...Object.entries(keycodes_basic)
			.map(([code, { label, ...k }]) =>
				[...(k.aliases ?? []), k.key].map((key) => ({ key, label, fullKey: k.key }))
			)
			.flat()
	].map((k) => [k.key, k])
);

export default keys;
export type { KeyCode };
