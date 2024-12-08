import { knownKeys, knownModifiers } from '../keycodes';

type KeyCombo = {
	upper: Label[][];
	lower: Label[][] | undefined;
	parsed: PageServerData;
};
type Label = TextLabel | IconLabel;
type TextLabel = {
	text: string;
	type: string;
};
type IconLabel = {
	icon: string;
	text?: string;
};
type Parsed = {
	raw: string;
	value: string;
	params: any[];
};

function rawkey(raw: string): Label[][] {
	return [
		[
			{
				text: raw,
				type: 'raw'
			}
		]
	];
}

function key(raw: string): Label[][] {
	if (!(raw in knownKeys.keys)) {
		return rawkey(raw);
	}

	let key = knownKeys.keys[raw].fullKey ?? raw;
	if (key in icons.keys) {
		return [[{ icon: icons.keys[key] }]];
	}

	let text = knownKeys.keys[raw].label.replace(' (dead)', '');
	if (key in abbreviations) {
		text = abbreviations[key];
	}
	return [[{ text, type: 'text' }]];
}

function keymod(raw: string): Label[][] | undefined {
	if (raw in knownKeys.modifiers) {
		return [
			knownKeys.modifiers[raw].keys.map(({ key }) => ({
				icon: icons.modifiers[key]
			}))
		];
	}

	return undefined;
}

function mod(raw: string): Label[][] {
	return [
		raw
			.split('|')
			.map((mod) => {
				if (mod in knownModifiers) {
					return [
						knownModifiers[mod].keys.map(({ key }) => ({
							icon: icons.modifiers[key]
						}))
					];
				}
				return rawkey(mod);
			})
			.flat()
			.flat()
	];
}

// Bluetooth
// RGB
// QMK (bootloader)
// Mouse
// lighting
// ctrl + insert, alt + lshift

function parse(raw: string): Parsed {
	raw = raw.replaceAll(' ', '');

	let value = raw;
	let params = [];
	let paramStart = 0;
	let depth = -1;
	for (let i = 0; i < raw.length; i++) {
		if (raw[i] === '(' && depth === -1) {
			value = raw.slice(paramStart, i);
			paramStart = i + 1;
		}

		if ((raw[i] === ',' || raw[i] === ')') && depth === 0) {
			params.push(parse(raw.slice(paramStart, i)));
			paramStart = i + 1;
		}

		if (raw[i] == '(') {
			depth++;
		}
		if (raw[i] == ')') {
			depth--;
		}
	}
	if (depth != -1) {
		return { raw, value: raw, params: [] };
	}
	return { raw, value, params };
}

function keyCombo(raw: string): KeyCombo {
	let { value, params } = parse(raw);

	let upper = key(value);
	let lower = undefined;

	if (params.length) {
		upper = key(params[params.length - 1].value);
		lower = [[{ text: value, type: 'raw' }]];

		if (value.endsWith('_T') && params.length == 1) {
			lower = keymod(value) ?? rawkey(value);
		} else if (value == 'MT' && params.length == 2) {
			lower = mod(params[0].value);
		} else if (value == 'LM' && params.length == 2) {
			upper = [...mod(params[1].value), [{ icon: 'LUCIDE_LAYERS_2_OPEN', text: params[0].value }]];
			lower = [[{ text: 'LM', type: 'raw' }]];
		} else if (value == 'LT' && params.length == 2) {
			lower = [[{ icon: 'LUCIDE_LAYERS_2' }], [{ text: params[0].value, type: 'text' }]];
		} else if (['MO', 'TG', 'TO', 'TT', 'DF', 'OSL'].includes(value) && params.length == 1) {
			upper = [[{ icon: 'LUCIDE_LAYERS_2' }], [{ text: params[0].value, type: 'text' }]];
		} else if (value == 'OSM' && params.length == 1) {
			upper = mod(params[0].value);
		} else if (value in knownKeys.modifiers && params.length == 1) {
			upper = [...(keymod(value) ?? rawkey(value)), ...upper];
			lower = undefined;
		} else {
			upper = key(params.map(({ raw }) => raw).join(','));
		}
	}
	return { upper, lower, parsed: { value, params, raw } };
}

function splitLabel(label: string): string[] {
	return label
		.replace('(', '(<word-break>')
		.replace(')', ')<word-break>')
		.replace('_', '_<word-break>')
		.replace('+', '+<word-break>')
		.split('<word-break>')
		.map((str) => {
			let chunks = [];
			while (str.length > 0) {
				if (str.length < 7) {
					chunks.push(str);
					break;
				} else {
					chunks.push(str.substring(0, 7));
					str = str.substring(7);
				}
			}
			return chunks;
		})
		.flat();
}

const abbreviations = {
	KC_NO: ' ',
	KC_DELETE: 'Del',
	KC_PAGE_UP: 'PgUp',
	KC_PAGE_DOWN: 'PgDn',
	KC_LEFT_GUI: 'L GUI',
	KC_RIGHT_GUI: 'R GUI',
	KC_LEFT_SHIFT: 'L Shift',
	KC_RIGHT_SHIFT: 'R Shift',
	KC_RIGHT_ALT: 'R Alt',
	KC_LEFT_ALT: 'L Alt',
	KC_LEFT_CTRL: 'L Ctrl',
	KC_RIGHT_CTRL: 'R Ctrl',
	KC_PRINT_SCREEN: 'PrtScr',
	KC_SCROLL_LOCK: 'ScrLk'
};

const icons = {
	keys: {
		KC_LEFT: 'LUCIDE_ARROW_LEFT',
		KC_RIGHT: 'LUCIDE_ARROW_RIGHT',
		KC_UP: 'LUCIDE_ARROW_UP',
		KC_DOWN: 'LUCIDE_ARROW_DOWN',
		KC_BACKSPACE: 'LUCIDE_DELETE',
		KC_ENTER: 'LUCIDE_CORNER_DOWN_LEFT',
		KC_SPACE: 'LUCIDE_SPACE',
		KC_CAPS_LOCK: 'LUCIDE_ARROW_BIG_UP_DASH',
		KC_TAB: 'LUCIDE_ARROW_LEFT_RIGHT_TO_LINE',
		KC_BRIGHTNESS_UP: 'LUCIDE_SUN',
		KC_BRIGHTNESS_DOWN: 'LUCIDE_SUN_DIM',
		KC_AUDIO_VOL_UP: 'LUCIDE_VOLUME_2',
		KC_KB_VOLUME_UP: 'LUCIDE_VOLUME_2',
		KC_AUDIO_VOL_DOWN: 'LUCIDE_VOLUME_1',
		KC_KB_VOLUME_DOWN: 'LUCIDE_VOLUME_1',
		KC_AUDIO_MUTE: 'LUCIDE_VOLUME_OFF',
		KC_SYSTEM_POWER: 'LUCIDE_POWER_OFF',
		KC_MEDIA_PREV_TRACK: 'LUCIDE_SKIP_BACK',
		KC_MEDIA_NEXT_TRACK: 'LUCIDE_SKIP_FORWARD',
		KC_MEDIA_REWIND: 'LUCIDE_REWIND',
		KC_MEDIA_FAST_FORWARD: 'LUCIDE_FAST_FORWARD',
		KC_MEDIA_PLAY_PAUSE: 'LUCIDE_PLAY',
		KC_APPLICATION: 'LUCIDE_SQUARE_MENU'
	},
	modifiers: {
		KC_LEFT_GUI: 'LUCIDE_DIAMOND',
		KC_RIGHT_GUI: 'LUCIDE_DIAMOND',
		KC_LEFT_SHIFT: 'LUCIDE_ARROW_BIG_UP',
		KC_RIGHT_SHIFT: 'LUCIDE_ARROW_BIG_UP',
		KC_RIGHT_ALT: 'LUCIDE_ALT',
		KC_LEFT_ALT: 'LUCIDE_ALT',
		KC_LEFT_CTRL: 'LUCIDE_CHEVRON_UP',
		KC_RIGHT_CTRL: 'LUCIDE_CHEVRON_UP'
	}
};

export { keyCombo as displayLabel, splitLabel };
export type { KeyCombo, Label };
