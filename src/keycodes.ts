import keycodes_basic from './keycodes/keycodes_basic.js';
import keycodes_modifiers from './keycodes/keycodes_modifiers.js';
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
	keys: {
		standard: {},
		language: {}
	},
	modifiers: {
		standard: {}
	}
};

function addKey(defs: any, group: string, key: KeyDefinition) {
	if (!(group in defs)) {
		defs[group] = [];
	}
	defs[group].push(key);
}

Object.entries(keycodes_basic).forEach(([code, { group, key, label, aliases }]) =>
	addKey(keyDefinitions.keys.standard, group, { key, label, aliases, sendKey: undefined })
);
Object.entries(keycodes_us).forEach(([sendKey, { key, label, aliases }]) =>
	addKey(keyDefinitions.keys.language, 'US', { key, label, aliases, sendKey })
);
Object.entries(keycodes_norwegian).forEach(([sendKey, { key, label }]) =>
	addKey(keyDefinitions.keys.language, 'NO', { key, label, aliases: [], sendKey })
);

Object.entries(keycodes_modifiers).map(([key, { keys, aliases }]) =>
	addKey(keyDefinitions.modifiers.standard, 'mod-tap', {
		key,
		keys,
		label: `Hold ${keys.map((key) => key.label).join(', ')} and press`
	})
);

let knownKeys: { [_: string]: { [_: string]: KeyCode } } = Object.fromEntries(
	Object.entries(keyDefinitions).map(([type, categories]) => [
		type,
		Object.fromEntries(
			Object.values(categories)
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
		)
	])
);

export { keyDefinitions, knownKeys };
export type { KeyCode };
