import keycodes_basic from './keycodes/keycodes_basic.js';
import keycodes_norwegian from './keycodes/keycodes_norwegian.js';
import keycodes_us from './keycodes/keycodes_us.js';

type KeyCode = {
	key: string; // Keycode such as 'KC_ENT' or 'NO_A'
	label: string; // Label such as 'A' or 'Spacebar'
	fullKey: string | undefined; // Full name of key, as key may be an alias
	sendKey: string | undefined; // Actual keycode to send for custom language key
};

type KeyDefinition = {
	key: string; // Keycode such as 'KC_ENT' or 'NO_A'
	label: string; // Label such as 'A' or 'Spacebar'
	aliases: string[]; // Aliases of key
	sendKey: string | undefined; // Actual keycode to send for custom language key
};

let keyDefinitions: {
	[_: string]: { [category: string]: { [group: string]: KeyDefinition[] } };
} = {
	press: {
		standard: {},
		language: {}
	},
	modifier: {}
};

function addKey(category: string, group: string, key: KeyDefinition) {
	if (!(category in keyDefinitions.press)) {
		keyDefinitions.press[category] = {};
	}
	if (!(group in keyDefinitions.press[category])) {
		keyDefinitions.press[category][group] = [];
	}
	keyDefinitions.press[category][group].push(key);
}

Object.entries(keycodes_basic).forEach(([code, { group, key, label, aliases }]) =>
	addKey('standard', group, { key, label, aliases, sendKey: undefined })
);
Object.entries(keycodes_us).forEach(([sendKey, { key, label, aliases }]) =>
	addKey('language', 'US', { key, label, aliases, sendKey })
);
Object.entries(keycodes_norwegian).forEach(([sendKey, { key, label }]) =>
	addKey('language', 'NO', { key, label, aliases: [], sendKey })
);

let knownKeys: { [_: string]: KeyCode } = Object.fromEntries(
	Object.values(keyDefinitions.press)
		.map((category) =>
			Object.values(category).map((keys) =>
				keys.map(({ aliases, key: fullKey, ...k }) =>
					[...(aliases ?? []), fullKey].map((key) => [key, { ...k, key, fullKey }])
				)
			)
		)
		.flat()
		.flat()
		.flat()
);

export { keyDefinitions, knownKeys };
export type { KeyCode };
